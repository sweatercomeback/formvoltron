import { useState, useEffect } from "react";
console.log("here3 ");

const useForm = (callback, validate) => {
  console.log("or here3");
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  useEffect(() => {
    if (Object.keys(values).length > 0) {
      const hasValues = Object.values(values).reduce((hasValue, v) => {
        return hasValue || (v && v.length > 0);
      }, false);
      setIsDirty(hasValues);
    }
  }, [values]);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const updateValue = (key, value) => {
    setValues(values => ({ ...values, [key]: value }));
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
    isDirty,
    resetForm
  };
};

export default useForm;
