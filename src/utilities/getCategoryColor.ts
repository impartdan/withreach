// Category badge color mapping
export const getCategoryColor = (categoryTitle: string) => {
  const normalizedTitle = categoryTitle.toLowerCase()

  if (normalizedTitle.includes('ecommerce')) {
    return 'bg-green-100 text-green-800'
  } else if (normalizedTitle.includes('billing') || normalizedTitle.includes('subscription')) {
    return 'bg-purple-100 text-purple-800'
  } else if (normalizedTitle.includes('payment')) {
    return 'bg-orange-100 text-orange-800'
  }

  return 'bg-gray-100 text-gray-800'
}
