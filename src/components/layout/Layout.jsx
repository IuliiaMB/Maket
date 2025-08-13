import { Outlet } from 'react-router'
import Navi from '../header/Navi'
import Footer from '../footer/Footer'

const Layout = () => {
  return (
    <div>
      <Navi />

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}

export default Layout