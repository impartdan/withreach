import {
  $applyNodeReplacement,
  $createParagraphNode,
  ElementNode,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalEditor,
  type LexicalNode,
  type NodeKey,
  type RangeSelection,
  type SerializedElementNode,
  type Spread,
} from 'lexical'

export type TypographyStyle =
  | 'type-display-xxl'
  | 'type-display-xl'
  | 'type-display-lg'
  | 'type-display-md'
  | 'type-display-sm'
  | 'type-display-xs'
  | 'type-display-xxs'
  | 'type-body-lg'
  | 'type-body'
  | 'type-button-lg'
  | 'type-button'
  | 'type-navigation'

/**
 * Inline style previews for the editor so users can see the visual
 * characteristics of each typography class while editing.
 * These mirror the base (mobile) values from tailwind.typography.mjs.
 */
const TYPOGRAPHY_PREVIEW_STYLES: Record<TypographyStyle, Record<string, string>> = {
  'type-display-xxl': {
    fontSize: '80px',
    lineHeight: '0.9',
    letterSpacing: '-0.03em',
    fontFamily: 'Season Mix, sans-serif',
    fontWeight: 'normal',
  },
  'type-display-xl': {
    fontSize: '72px',
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
    fontWeight: '400',
    fontFamily: 'Season Mix, sans-serif',
  },
  'type-display-lg': {
    fontSize: '40px',
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
    fontFamily: 'Season Mix, sans-serif',
    fontWeight: 'normal',
  },
  'type-display-md': {
    fontSize: '32px',
    lineHeight: '1.1',
    fontFamily: 'Season Sans, sans-serif',
    fontWeight: 'normal',
  },
  'type-display-sm': {
    fontSize: '28px',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    fontFamily: 'Season Mix, sans-serif',
    fontWeight: 'normal',
  },
  'type-display-xs': {
    fontSize: '20px',
    lineHeight: '1.3',
    fontWeight: '500',
    fontFamily: 'Season Sans, sans-serif',
  },
  'type-display-xxs': {
    fontSize: '18px',
    lineHeight: '1.3',
    fontWeight: '500',
    fontFamily: 'Season Sans, sans-serif',
  },
  'type-body-lg': {
    fontSize: '20px',
    lineHeight: '1.4',
    fontWeight: '500',
    fontFamily: 'Season Sans, sans-serif',
  },
  'type-body': {
    fontSize: '16px',
    lineHeight: '1.3',
    fontWeight: '500',
    fontFamily: 'Season Sans, sans-serif',
  },
  'type-button-lg': {
    fontSize: '18px',
    lineHeight: '1.3',
    fontWeight: '600',
    fontFamily: 'Season Sans, sans-serif',
  },
  'type-button': {
    fontSize: '16px',
    lineHeight: '1.3',
    fontWeight: '600',
    fontFamily: 'Season Sans, sans-serif',
  },
  'type-navigation': {
    fontSize: '16px',
    lineHeight: '1.3',
    fontWeight: '500',
    fontFamily: 'Season Sans, sans-serif',
  },
}

function applyPreviewStyles(element: HTMLElement, typographyStyle: TypographyStyle): void {
  const styles = TYPOGRAPHY_PREVIEW_STYLES[typographyStyle]
  if (styles) {
    Object.assign(element.style, styles)
  }
}

export type SerializedTypographyStyleNode = Spread<
  {
    type: 'typographyStyle'
    typographyStyle: TypographyStyle
  },
  SerializedElementNode
>

export class TypographyStyleNode extends ElementNode {
  __typographyStyle: TypographyStyle

  constructor(typographyStyle: TypographyStyle, key?: NodeKey) {
    super(key)
    this.__typographyStyle = typographyStyle
  }

  static getType(): string {
    return 'typographyStyle'
  }

  static clone(node: TypographyStyleNode): TypographyStyleNode {
    return new TypographyStyleNode(node.__typographyStyle, node.__key)
  }

  getTypographyStyle(): TypographyStyle {
    return this.getLatest().__typographyStyle
  }

  setTypographyStyle(typographyStyle: TypographyStyle): void {
    const self = this.getWritable()
    self.__typographyStyle = typographyStyle
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const element = document.createElement('p')
    element.className = this.__typographyStyle
    applyPreviewStyles(element, this.__typographyStyle)
    return element
  }

  updateDOM(prevNode: TypographyStyleNode, dom: HTMLElement): boolean {
    if (prevNode.__typographyStyle !== this.__typographyStyle) {
      dom.className = this.__typographyStyle
      // Reset previous inline styles and apply new ones
      dom.removeAttribute('style')
      applyPreviewStyles(dom, this.__typographyStyle)
      return false // We handled the update ourselves
    }
    return false
  }

  exportDOM(_editor: LexicalEditor): DOMExportOutput {
    const element = document.createElement('p')
    element.className = this.__typographyStyle

    if (this.getFormat()) {
      element.style.textAlign = this.getFormatType()
    }
    if (this.getIndent() > 0) {
      element.style.paddingInlineStart = `${this.getIndent() * 40}px`
    }

    return { element }
  }

  static importJSON(serializedNode: SerializedTypographyStyleNode): TypographyStyleNode {
    const node = $createTypographyStyleNode(serializedNode.typographyStyle)
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  exportJSON(): SerializedTypographyStyleNode {
    return {
      ...super.exportJSON(),
      type: 'typographyStyle',
      typographyStyle: this.__typographyStyle,
      version: 1,
    }
  }

  // When pressing Enter at the end of a typography node, create a regular paragraph
  insertNewAfter(selection: RangeSelection, restoreSelection?: boolean): ElementNode {
    const anchorOffset = selection ? selection.anchor.offset : 0
    const lastDesc = this.getLastDescendant()
    const isAtEnd =
      !lastDesc ||
      (selection &&
        selection.anchor.key === lastDesc.getKey() &&
        anchorOffset === lastDesc.getTextContentSize())

    if (isAtEnd) {
      const newElement = $createParagraphNode()
      const direction = this.getDirection()
      newElement.setDirection(direction)
      this.insertAfter(newElement, restoreSelection)
      return newElement
    }

    // Splitting in the middle - keep the typography style
    const newElement = $createTypographyStyleNode(this.__typographyStyle)
    const direction = this.getDirection()
    newElement.setDirection(direction)
    this.insertAfter(newElement, restoreSelection)
    return newElement
  }

  collapseAtStart(): true {
    const newElement = $createParagraphNode()
    const children = this.getChildren()
    children.forEach((child) => newElement.append(child))
    this.replace(newElement)
    return true
  }
}

export function $createTypographyStyleNode(
  typographyStyle: TypographyStyle,
): TypographyStyleNode {
  return $applyNodeReplacement(new TypographyStyleNode(typographyStyle))
}

export function $isTypographyStyleNode(
  node: LexicalNode | null | undefined,
): node is TypographyStyleNode {
  return node instanceof TypographyStyleNode
}
