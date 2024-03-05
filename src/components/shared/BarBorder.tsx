const BarBorder = ({ className }: { className?: string }) => {
  return (
    <div
      id="bar-borders"
      className={`absolute left-0  top-11 flex w-full items-center justify-between px-3 ${className}`}
    >
      <div
        id="left-bar"
        className="before:contant-[''] relative flex h-[1px] w-[47%] items-center justify-between bg-secondary-foreground before:absolute before:right-[7px] before:top-1/2 before:h-[4px] before:w-[4px] before:-translate-y-[50%] before:rounded-full before:bg-secondary-foreground md:w-[49%]"
      >
        <span className="h-[3px] w-[3px] rounded-full bg-secondary-foreground"></span>

        <span className="h-[6px] w-[6px] rounded-full bg-secondary-foreground"></span>
      </div>

      <span className="h-[7px] w-[7px] rounded-full border border-secondary-foreground"></span>
      <div
        id="left-bar"
        className="before:contant-[''] relative flex h-[1px] w-[47%] items-center justify-between bg-secondary-foreground before:absolute before:left-[7px] before:top-1/2 before:h-[4px] before:w-[4px] before:-translate-y-[50%] before:rounded-full before:bg-secondary-foreground md:w-[49%]"
      >
        <span className="h-[5px] w-[5px] rounded-full bg-secondary-foreground"></span>
        <span className="h-[4px] w-[4px] rounded-full bg-secondary-foreground"></span>
      </div>
    </div>
  )
}

export default BarBorder
