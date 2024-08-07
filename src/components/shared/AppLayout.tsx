import { Outlet } from 'react-router-dom'
import Header from './Header'
import Searching from './Searching'
import Footer from './Footer'

const AppLayout = () => {
  return (
    <div vaul-drawer-wrapper="" className=" bg-white">
      <Searching>
        <Header />
      </Searching>
      <Outlet />
      <Footer />
    </div>
  )
}

export default AppLayout
