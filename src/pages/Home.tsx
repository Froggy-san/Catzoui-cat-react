import CarouselComp from '@/components/shared/CarouselComp'
import CarouselCat from '@/components/shared/CarouselCat'
import Operations from '@/components/shared/Operations'
import Title from '@/components/shared/Title'
import ProductsList from '@/features/products/ProductsList'
import ProductDetails from '@/features/products/ProductDetails'
import GoToTheTop from '@/components/shared/GoToTheTop'
import { useInView } from 'react-intersection-observer'
const Home = () => {
  const { ref, inView } = useInView()

  // console.log(inView, "Is it in View ??!?!@!?@");

  // const [title, setTitle] = useState("Variety");

  // function handleTitleChange(title: string) {
  //   setTitle(title);
  // }

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const products: Product[] = await getProducts();
  //       console.log(products); // Now you can safely access product properties
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       // Handle errors gracefully
  //     }
  //   };

  //   fetchProducts();
  // }, []);
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
