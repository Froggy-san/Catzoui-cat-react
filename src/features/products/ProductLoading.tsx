import { Skeleton } from '@/components/ui/skeleton'
import React, { forwardRef } from 'react'

const ProductLoading = forwardRef(function ProductLoading(
  { className }: { className?: string },
  ref?: React.Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className={`flex h-fit flex-col space-y-3 ${className}`}>
      <Skeleton className="h-[360px]  rounded-xl bg-oldCatBg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80%] bg-oldCatBg" />
        <Skeleton className="h-4 w-[75%] bg-oldCatBg" />
      </div>
    </div>
  )
})

export default ProductLoading
