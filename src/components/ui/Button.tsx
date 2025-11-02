const Button = ({
  handleClick,
  btnTitle,
}: {
  handleClick: () => void;
  btnTitle: string;
}) => {
  return (
    <button
      onClick={handleClick}
      className="w-full py-[5px] bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors font-semibold text-md"
    >
      {btnTitle}
    </button>
  );
};

export default Button;
