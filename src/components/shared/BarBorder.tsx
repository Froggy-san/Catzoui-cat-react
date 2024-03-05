const BarBorder = ({ className }: { className?: string }) => {
  return (
    <div
      id="bar-borders"
      className={`flex px-3  absolute left-0 top-11 justify-between items-center w-full ${className}`}
    >
      <div
        id="left-bar"
        className="w-[47%] md:w-[49%] h-[1px] bg-secondary-foreground relative flex justify-between items-center before:contant-[''] before:w-[4px] before:h-[4px] before:absolute before:top-1/2 before:-translate-y-[50%] before:right-[7px] before:bg-secondary-foreground before:rounded-full"
      >
        <span className="w-[3px] h-[3px] rounded-full bg-secondary-foreground"></span>

        <span className="w-[6px] h-[6px] rounded-full bg-secondary-foreground"></span>
      </div>

      <span className="w-[8px] h-[8px] rounded-full border border-secondary-foreground"></span>
      <div
        id="left-bar"
        className="w-[47%] md:w-[49%] h-[1px] bg-secondary-foreground relative flex justify-between items-center before:contant-[''] before:w-[4px] before:h-[4px] before:absolute before:top-1/2 before:-translate-y-[50%] before:left-[7px] before:bg-secondary-foreground before:rounded-full"
      >
        <span className="w-[6px] h-[6px] rounded-full bg-secondary-foreground"></span>
        <span className="w-[3px] h-[3px] rounded-full bg-secondary-foreground"></span>
      </div>
    </div>
  );
};

export default BarBorder;
