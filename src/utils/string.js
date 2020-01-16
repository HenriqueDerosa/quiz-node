/**
 * Remove Accentuation
 * @param {string} text string to remove all accentuations
 * @return string without accentuation
 */
export const removeAccentuation = text =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
