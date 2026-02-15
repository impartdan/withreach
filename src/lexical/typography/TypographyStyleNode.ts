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
    return element
  }

  updateDOM(prevNode: TypographyStyleNode): boolean {
    return prevNode.__typographyStyle !== this.__typographyStyle
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
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
