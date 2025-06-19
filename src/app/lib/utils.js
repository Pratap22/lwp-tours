/**
 * Generate a URL-friendly slug from a string
 * @param {string} text - The text to convert to a slug
 * @returns {string} - The generated slug
 */
export function generateSlug(text) {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Validate if a slug is valid
 * @param {string} slug - The slug to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidSlug(slug) {
  if (!slug) return false;
  
  // Check if slug contains only lowercase letters, numbers, and hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - The currency symbol (default: '$')
 * @returns {string} - The formatted price
 */
export function formatPrice(price, currency = '$') {
  if (!price) return `${currency}0`;
  return `${currency}${Number(price).toLocaleString()}`;
} 