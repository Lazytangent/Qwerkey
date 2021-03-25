const Score = ({ ratings }) => {
  return (
    <div className="w-10 p-2 text-center">
      {ratings ? Object.values(ratings).reduce((acc, { rating }) => acc + rating, 0) : "0"}
    </div>
  );
};

export default Score;
