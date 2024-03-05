const Empty = ({
  message,
  icon,
}: {
  message: string
  icon?: () => JSX.Element
}) => {
  return (
    <div className="g flex h-full     items-center justify-center gap-5 text-xl">
      {message} {icon?.()}
    </div>
  )
}

export default Empty
