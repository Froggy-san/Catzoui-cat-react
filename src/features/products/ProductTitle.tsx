const ProductTitle = ({ title }: { title: string | undefined }) => {
  return (
    <h1 className="text-2xl tracking-wider mt-3 font-semibold">
      {title ? title.toLocaleUpperCase() : null}
    </h1>
  );
};

export default ProductTitle;
