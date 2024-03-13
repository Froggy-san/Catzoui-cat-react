import CarouselComp from '@/components/shared/CarouselComp'
import CarouselCat from '@/components/shared/CarouselCat'
import Operations from '@/components/shared/Operations'
import Title from '@/components/shared/Title'
import ProductsList from '@/features/products/ProductsList'
import ProductDetails from '@/features/products/ProductDetails'
import GoToTheTop from '@/components/shared/GoToTheTop'
import { useInView } from 'react-intersection-observer'
import ProductFormButton from '@/components/shared/ProductFormButton'

const Home = () => {
  const { ref, inView } = useInView()

  return (
    <div>
      <CarouselComp ref={ref} />
      <CarouselCat />
      <div className="container mb-12 mt-40 space-y-12 ">
        <Title className="text-5xl font-semibold text-secondary-foreground md:text-7xl" />

        <Operations />
      </div>

      <ProductsList />

      <ProductDetails />

      <GoToTheTop hidden={inView} />
      <ProductFormButton />
      {/* <Skeleton>
        <div className="flex">
          <div className="flex flex-col gap-3">
            <div className=" w-[350px] h-[500px] rounded-lg bg-oldCatBg"></div>
            <div className="w-[80%] h-5 bg-oldCatBg"></div>
          </div>
        </div>
      </Skeleton> */}
    </div>
  )
}

export default Home
