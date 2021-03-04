const SubmitFormButton = ({ label }) => {
  return (
    <div className="flex justify-center p-2">
      <button type="submit" className="p-2 border rounded hover:border-green">{label}</button>
    </div>
  );
};

export default SubmitFormButton;
