import { IoClose } from "react-icons/io5";

const CloseButton = ({
  className,
  iconSize = 20,
  onClick,
}: {
  iconSize?: number;
  className: string;
  onClick: () => void;
}) => {
  return (
    <button className={className} onClick={onClick}>
      {" "}
      <IoClose size={iconSize} />
    </button>
  );
};

export default CloseButton;
