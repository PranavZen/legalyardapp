/**
 * Utility functions for handling toast notifications
 */

/**
 * Creates a toast configuration object with the correct properties
 * @param title The title of the toast
 * @param description Optional description for the toast
 * @param placement Optional placement of the toast
 * @returns A properly formatted toast configuration object
 */
export const createToast = (
  title: string,
  description?: string,
  placement: "top" | "bottom" | "top-right" | "top-left" | "bottom-right" | "bottom-left" = "top"
) => {
  const toastConfig: {
    title: string;
    description?: string;
    placement?: "top" | "bottom" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
  } = {
    title,
    placement
  };

  if (description) {
    toastConfig.description = description;
  }

  return toastConfig;
};
