/**
 * Format a date to a string
 * @param date Date to format
 * @param format Format to use (default: 'MM/DD/YYYY')
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, format: string = 'MM/DD/YYYY'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) {
    return 'Invalid date';
  }
  
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  
  let formattedDate = format;
  formattedDate = formattedDate.replace('DD', day);
  formattedDate = formattedDate.replace('MM', month);
  formattedDate = formattedDate.replace('YYYY', year.toString());
  
  return formattedDate;
};

/**
 * Get a relative time string (e.g., "2 hours ago", "Yesterday", "2 days ago")
 * @param date Date to get relative time for
 * @returns Relative time string
 */
export const getRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) {
    return 'Invalid date';
  }
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'Yesterday';
  }
  
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) {
    return '1 week ago';
  }
  
  if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths === 1) {
    return '1 month ago';
  }
  
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};

/**
 * Format a time string (e.g., "09:30 AM")
 * @param date Date to format
 * @param use24Hour Whether to use 24-hour format
 * @returns Formatted time string
 */
export const formatTime = (date: Date | string, use24Hour: boolean = false): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) {
    return 'Invalid time';
  }
  
  if (use24Hour) {
    return d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  } else {
    return d.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' });
  }
};

/**
 * Check if a date is today
 * @param date Date to check
 * @returns Whether the date is today
 */
export const isToday = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if a date is tomorrow
 * @param date Date to check
 * @returns Whether the date is tomorrow
 */
export const isTomorrow = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return (
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
  );
};
