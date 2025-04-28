import { useState, useCallback } from 'react';
import { preserveNumericString } from '../utils/typeUtils';

interface FormErrors {
  [key: string]: string;
}

interface UseFormProps<T> {
  initialValues: T;
  validate?: (values: T) => FormErrors;
  onSubmit: (values: T) => void;
  fieldTypes?: Record<string, 'string' | 'number' | 'boolean' | 'auto'>;
}

/**
 * A hook for managing form state with type safety
 * @param initialValues Initial form values
 * @param validate Validation function
 * @param onSubmit Submit handler
 * @param fieldTypes Optional mapping of field names to their expected types
 *                   Use 'string' for fields that should always be strings (like phone numbers)
 *                   Use 'number' for fields that should be converted to numbers
 *                   Use 'boolean' for fields that should be converted to booleans
 *                   Use 'auto' or omit for automatic type inference
 * @returns Form state and handlers
 */
function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
  fieldTypes = {},
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = useCallback((name: keyof T, value: any) => {
    // Handle type conversion based on fieldTypes
    let processedValue = value;
    const fieldType = fieldTypes[name as string];

    if (fieldType === 'string' || (typeof value === 'number' && !fieldType)) {
      // Ensure numeric strings stay as strings
      processedValue = preserveNumericString(value);
    } else if (fieldType === 'number') {
      processedValue = Number(value);
    } else if (fieldType === 'boolean') {
      processedValue = Boolean(value);
    }

    setValues((prev) => ({ ...prev, [name]: processedValue }));

    // Clear error when field is changed
    if (errors[name as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as string];
        return newErrors;
      });
    }
  }, [errors, fieldTypes]);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate field on blur if validate function is provided
    if (validate) {
      const fieldErrors = validate(values);
      if (fieldErrors[name as string]) {
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as string] }));
      }
    }
  }, [validate, values]);

  const handleSubmit = useCallback(() => {
    if (validate) {
      const formErrors = validate(values);
      setErrors(formErrors);

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setTouched(allTouched);

      if (Object.keys(formErrors).length === 0) {
        setIsSubmitting(true);
        onSubmit(values);
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(true);
      onSubmit(values);
      setIsSubmitting(false);
    }
  }, [validate, values, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}

export default useForm;
