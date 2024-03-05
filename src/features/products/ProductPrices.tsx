import { formatCurrency } from '@/utils/helper'

const ProductPrices = ({
  price,
  discount,
}: {
  price: number | undefined
  discount: number | undefined
}) => {
  const thereIsDiscount = discount !== 0

  return (
    <div className="flex gap-3 font-semibold">
      <span
        className={`${
          thereIsDiscount && 'text-priceWithDiscount line-through'
        }`}
      >
        {formatCurrency(price || 1)}
      </span>

      <span className="text-red-600">
        {thereIsDiscount
          ? formatCurrency((price || 1) - (discount || 1))
          : null}
      </span>
    </div>
  )
}

export default ProductPrices
