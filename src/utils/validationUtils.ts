/**
 * Validate an email address
 * @param email Email to validate
 * @returns Whether the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a password
 * @param password Password to validate
 * @param minLength Minimum length (default: 8)
 * @param requireSpecialChar Whether to require a special character (default: true)
 * @param requireNumber Whether to require a number (default: true)
 * @param requireUppercase Whether to require an uppercase letter (default: true)
 * @returns Whether the password is valid
 */
export const isValidPassword = (
  password: string,
  minLength: number = 8,
  requireSpecialChar: boolean = true,
  requireNumber: boolean = true,
  requireUppercase: boolean = true
): boolean => {
  if (password.length < minLength) return false;
  
  if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  
  if (requireNumber && !/\d/.test(password)) return false;
  
  if (requireUppercase && !/[A-Z]/.test(password)) return false;
  
  return true;
};

/**
 * Validate a phone number
 * @param phoneNumber Phone number to validate
 * @returns Whether the phone number is valid
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Check if it's a valid length (10 digits for US, or 11 digits starting with 1)
  return cleaned.length === 10 || (cleaned.length === 11 && cleaned[0] === '1');
};

/**
 * Validate a URL
 * @param url URL to validate
 * @returns Whether the URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validate a credit card number using Luhn algorithm
 * @param cardNumber Credit card number to validate
 * @returns Whether the credit card number is valid
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  // Remove all non-numeric characters
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 13 || cleaned.length > 19) return false;
  
  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};
