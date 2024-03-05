import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className="absolute left-1/2 translate-x-[-50%]">
      <div className="relative   text-center text-xl  font-light tracking-[.2rem] sm:text-2xl sm:tracking-[.25rem]">
        Catzoui
        <img
          src="https://tmmozdpzjvijerozmloy.supabase.co/storage/v1/object/public/category/logo-2.png"
          alt="image"
          className="absolute left-[-1.5rem] top-1 h-8 w-8 sm:top-2"
        />
      </div>
    </Link>
  )
}

export default Logo
