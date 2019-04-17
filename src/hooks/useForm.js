import { useState, useEffect } from "react";
import { hasValues } from "../lib";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setHasErrors(Object.keys(errors).length > 0);
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  useEffect(() => {
    if (Object.keys(values).length > 0) {
      const hasValue = hasValues(values);
      setIsDirty(hasValue);
    }
  }, [values]);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = event => {
    if (!event.persist) {
      return;
    }
    event.persist();
    setValues(vals => ({
      ...vals,
      [event.target.name]: event.target.value
    }));
  };

  const updateValue = (key, value) => {
    setValues(vals => ({ ...vals, [key]: value }));
  };

  const resetForm = () => {
    setValues(() => ({}));
    setIsDirty(false);
  };

  return {
    handleChange,
    updateValue,
    handleSubmit,
    values,
    errors,
    hasErrors,
    isDirty,
    resetForm
  };
};

export default useForm;
