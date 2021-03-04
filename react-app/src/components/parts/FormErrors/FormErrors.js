import { useState, useEffect } from "react";

const FormErrors = ({ errors }) => {
  const [formattedErrors, setFormattedErrors] = useState([]);

  useEffect(() => {
    const result = errors.map((error) => {
      const arr = error.split(":")[0].trim();
      return arr[0].toUpperCase() + arr.slice(1);
    });
    setFormattedErrors(result);
  }, [errors]);

  return (
    <>
      {errors.length > 0 && (
        <div>
          <h5>The following fields are required:</h5>
          {formattedErrors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default FormErrors;
