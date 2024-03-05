import { Button } from "@/components/ui/button";

const Size = ({
  chosenSize,
  chosenColor,
  handleChangeColor,
  handleChange,
  prodcutSizes,
  productColors,
  className,
}: {
  className?: string;
  prodcutSizes: string | null;
  productColors: string | null;
  chosenSize: string | null;
  chosenColor: string | null | undefined;
  handleChangeColor: (value: string) => void;
  handleChange: (value: string) => void;
}) => {
  const sizes =
    prodcutSizes &&
    prodcutSizes
      .replace(/ /g, "")
      .split(",")
      .filter((el) => el !== "");

  const colors =
    productColors &&
    productColors
      .replace(/ /g, "")
      .split(",")
      .filter((el) => el !== "");

  return (
    <div className={`space-y-4 ${className}`}>
      {colors && colors.length && (
        <div className="flex flex-col font-semibold gap-7 ">
          <h3 className="text-lg">Colors</h3>

          <div
            className={`flex gap-3 px-2 flex-wrap ${
              colors.length > 1 ? "py-3" : "py-2"
            } rounded-full bg-oldCatBg w-fit`}
          >
            {colors.map((color) => (
              <Button
                key={color}
                size="sm"
                onClick={() => {
                  // if (color === chosenColor) handleChangeColor(""); else
                  handleChangeColor(color);
                }}
                style={{ backgroundColor: color }}
                //   disabled={color === chosenSize}
                className={`${
                  color === chosenColor &&
                  ` text-secondary-foreground hover:bg-secondary/80 border border-s-950  ring-2 ring-slate-300 ring-offset-1 opacity-65`
                }   p-0 w-5 h-5 rounded-full opacity-85 hover:ring-2 `}
              ></Button>
            ))}
          </div>
        </div>
      )}
      {sizes && sizes.length && (
        <div className="flex flex-col font-semibold gap-7">
          <div className="flex justify-between items-center">
            <h3 className="text-lg">Size</h3>
            <span className=" underline">what is my size?</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => {
              console.log(size, "size here !! ????? ASAD");
              console.log(chosenSize, "size here !! ????? ASAD");
              return (
                <Button
                  key={size}
                  size="sm"
                  onClick={() => {
                    // if (size === chosenSize) handleChange("");else
                    handleChange(size);
                  }}
                  //   disabled={size === chosenSize}
                  className={` tracking-wide gap-1 rounded-xl text-lg   font-light pb-1 ${
                    size === chosenSize &&
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary-foreground "
                  }  disabled:bg-secondary disabled:text-secondary-foreground disabled:hover:bg-secondary/80 disabled:border disabled:border-slate-950 disabled:font-semibold    `}
                >
                  {size}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Size;
