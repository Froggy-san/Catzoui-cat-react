const ProductTitle = ({ title }: { title: string | undefined }) => {
  return (
    <h1 className="mt-3 text-2xl font-semibold tracking-wider">
      {title ? title.toLocaleUpperCase() : null}
    </h1>
  )
}

export default ProductTitle
