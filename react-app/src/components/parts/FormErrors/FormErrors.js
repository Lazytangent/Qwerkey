const FormErrors = ({ errors }) => {
  return (
    <div>
      {errors.map((error) => (
        <div>{error}</div>
      ))}
    </div>
  );
};

export default FormErrors;
