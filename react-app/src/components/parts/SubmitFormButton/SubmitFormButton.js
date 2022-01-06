const SubmitFormButton = ({ label }) => {
  return (
    <div className="flex justify-center p-2">
      <button
        type="submit"
        className="p-2 border rounded focus:outline-none duration-300 hover:border-green focus:bg-green"
      >
        {label}
      </button>
    </div>
  );
};

export default SubmitFormButton;
