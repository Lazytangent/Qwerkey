const SubmitFormButton = ({ label }) => {
  return (
    <div className="flex justify-center p-2">
      <button type="submit" className="duration-300 p-2 border rounded hover:border-green focus:bg-green">{label}</button>
    </div>
  );
};

export default SubmitFormButton;
