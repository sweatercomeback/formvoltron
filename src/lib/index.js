export const hasValues = values => {
  if (!values) return false;
  return Object.values(values).reduce((hasValue, v) => {
    return (
      hasValue || (v !== null && v !== undefined && v.toString().length > 0)
    );
  }, false);
};
