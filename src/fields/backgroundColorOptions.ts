export const BACKGROUND_COLOR_OPTIONS = [
  { label: 'Off White', value: 'brand-off-white' },
  { label: 'Linen', value: 'brand-linen' },
  { label: 'Black', value: 'brand-black' },
  { label: 'White', value: 'brand-white' },
  { label: 'Olive', value: 'brand-olive' },
  { label: 'Gray', value: 'brand-gray' },
  { label: 'Purple', value: 'brand-purple' },
  { label: 'Peach', value: 'brand-peach' },
  { label: 'Green', value: 'brand-green' },
  { label: 'Blue', value: 'brand-blue' },
  { label: 'Blue Light', value: 'brand-blue-light' },
] as const

export const BACKGROUND_COLOR_SWATCHES: Record<string, string> = {
  'brand-off-white': '#FAF7F5',
  'brand-linen': '#EEECE6',
  'brand-black': '#1E1A15',
  'brand-white': '#FFFFFF',
  'brand-olive': '#999177',
  'brand-gray': '#6B7280',
  'brand-purple': '#D4C9ED',
  'brand-peach': '#FACBA1',
  'brand-green': '#DAF2BF',
  'brand-blue': '#C2CFE5',
  'brand-blue-light': '#E5EEFD',
}
