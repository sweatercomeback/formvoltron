export const hasValues = values => {
  if (!values) return false;
  const justValues = Object.keys(values).map(e => values[e]);
  return justValues.reduce((hasValue, v) => {
    return (
      hasValue || (v !== null && v !== undefined && v.toString().length > 0)
    );
  }, false);
};
