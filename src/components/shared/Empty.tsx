const Empty = ({
  message,
  icon,
}: {
  message: string;
  icon?: () => JSX.Element;
}) => {
  return (
    <div className="flex g items-center     h-full gap-5 justify-center text-xl">
      {message} {icon?.()}
    </div>
  );
};

export default Empty;
