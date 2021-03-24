const Score = ({ ratings }) => {
  return (
    <div className="w-10 p-2 text-center">
      {Object.values(ratings).reduce((acc, { rating }) => acc + rating, 0)}
    </div>
  );
};

export default Score;
