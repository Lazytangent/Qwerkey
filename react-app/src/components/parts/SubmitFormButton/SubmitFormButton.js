const SubmitFormButton = ({ label }) => {
  return (
    <div className="flex justify-center p-2">
      <button type="submit" className="focus:outline-none p-2 border rounded duration-300 hover:border-green focus:bg-green">{label}</button>
    </div>
  );
};

export default SubmitFormButton;
