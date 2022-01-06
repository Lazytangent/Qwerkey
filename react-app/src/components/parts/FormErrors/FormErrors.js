import { useState, useEffect } from 'react';

const FormErrors = ({ errors }) => {
  const [formattedErrors, setFormattedErrors] = useState([]);

  useEffect(() => {
    const result = errors.map((error) => {
      const arr = error.split(':')[0].trim();
      return arr[0].toUpperCase() + arr.slice(1);
    });
    setFormattedErrors(result);
  }, [errors]);

  return (
    <>
      {errors.length > 0 && (
        <div className="flex flex-col items-center text-red-600">
          <h5>The following fields are required:</h5>
          {formattedErrors.join(', ')}
        </div>
      )}
    </>
  );
};

export default FormErrors;
