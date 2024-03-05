import { Button } from '@/components/ui/button'

const Size = ({
  chosenSize,
  chosenColor,
  handleChangeColor,
  handleChange,
  prodcutSizes,
  productColors,
  className,
}: {
  className?: string
  prodcutSizes: string | null
  productColors: string | null
  chosenSize: string | null
  chosenColor: string | null | undefined
  handleChangeColor: (value: string) => void
  handleChange: (value: string) => void
}) => {
  const sizes =
    prodcutSizes &&
    prodcutSizes
      .replace(/ /g, '')
      .split(',')
      .filter((el) => el !== '')

  const colors =
    productColors &&
    productColors
      .replace(/ /g, '')
      .split(',')
      .filter((el) => el !== '')

  return (
    <div className={`space-y-4 ${className}`}>
      {colors && colors.length && (
        <div className="flex flex-col gap-7 font-semibold ">
          <h3 className="text-lg">Colors</h3>

          <div
            className={`flex flex-wrap gap-3 px-2 ${
              colors.length > 1 ? 'py-3' : 'py-2'
            } w-fit rounded-full bg-oldCatBg`}
          >
            {colors.map((color) => (
              <Button
                key={color}
                size="sm"
                onClick={() => {
                  // if (color === chosenColor) handleChangeColor(""); else
                  handleChangeColor(color)
                }}
                style={{ backgroundColor: color }}
                //   disabled={color === chosenSize}
                className={`${
                  color === chosenColor &&
                  ` border-s-950 border text-secondary-foreground opacity-65  ring-2 ring-slate-300 ring-offset-1 hover:bg-secondary/80`
                }   h-5 w-5 rounded-full p-0 opacity-85 hover:ring-2 `}
              ></Button>
            ))}
          </div>
        </div>
      )}
      {sizes && sizes.length && (
        <div className="flex flex-col gap-7 font-semibold">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">Size</h3>
            <span className=" underline">what is my size?</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => {
              console.log(size, 'size here !! ????? ASAD')
              console.log(chosenSize, 'size here !! ????? ASAD')
              return (
                <Button
                  key={size}
                  size="sm"
                  onClick={() => {
                    // if (size === chosenSize) handleChange("");else
                    handleChange(size)
                  }}
                  //   disabled={size === chosenSize}
                  className={` gap-1 rounded-xl pb-1 text-lg   font-light tracking-wide ${
                    size === chosenSize &&
                    'border border-secondary-foreground bg-secondary text-secondary-foreground hover:bg-secondary/80 '
                  }  disabled:border disabled:border-slate-950 disabled:bg-secondary disabled:font-semibold disabled:text-secondary-foreground disabled:hover:bg-secondary/80    `}
                >
                  {size}
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Size
