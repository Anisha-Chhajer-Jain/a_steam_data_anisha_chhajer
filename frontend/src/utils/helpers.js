/**
 * Format a price number as currency string
 * @param {number} price
 * @returns {string}
 */
export const formatPrice = (price) => {
  if (price === 0 || price === '0') return 'Free';
  return `$${parseFloat(price).toFixed(2)}`;
};

/**
 * Format a rating number to 1 decimal place
 * @param {number} rating
 * @returns {string}
 */
export const formatRating = (rating) => {
  return parseFloat(rating).toFixed(1);
};

/**
 * Truncate a string to maxLength characters
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (str, maxLength = 40) => {
  if (!str) return '';
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};

/**
 * Get comma-separated string from array
 * @param {string[]} arr
 * @returns {string}
 */
export const arrayToString = (arr) => {
  if (!arr || !Array.isArray(arr)) return '';
  return arr.join(', ');
};

/**
 * Capitalize first letter of a string
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Get initials from name
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

/**
 * Debounce a function
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Get stored preferences from localStorage
 * @returns {Object}
 */
export const getStoredPreferences = () => {
  try {
    const prefs = localStorage.getItem('userPreferences');
    return prefs ? JSON.parse(prefs) : {};
  } catch {
    return {};
  }
};

/**
 * Save preferences to localStorage
 * @param {Object} preferences
 */
export const savePreferences = (preferences) => {
  try {
    const existing = getStoredPreferences();
    localStorage.setItem('userPreferences', JSON.stringify({ ...existing, ...preferences }));
  } catch {
    // silently fail
  }
};
