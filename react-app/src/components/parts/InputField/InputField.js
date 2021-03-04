const InputField = ({ name, type, placeholder, value, onChange }) => {
  return (
    <div className="flex justify-center p-2">
      <input
        className="w-3/4 p-2 mb-1 border rounded"
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
