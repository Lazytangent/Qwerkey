const InputField = ({ name, type, placeholder, value, onChange }) => {
  if (type === "textarea") {
    return (
      <div className="flex justify-center p-2">
        <textarea
          className="w-11/12 p-2 mb-1 border rounded outline-none md:w-3/4 focus:border-green dark:bg-gray-800 dark:text-gray-50"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows="5"
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center p-2">
      <input
        className="w-11/12 p-2 mb-1 border rounded outline-none focus:border-green md:w-3/4 dark:bg-gray-800 dark:text-gray-50"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
