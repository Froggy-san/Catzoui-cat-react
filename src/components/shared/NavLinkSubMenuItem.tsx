import { SCROLL_DURATION } from '@/utils/constants'
import { Link } from 'react-scroll'

const NavLinkSubMenuItem = ({
  text,
  onClick,
}: {
  text: string
  onClick?: () => void
}) => {
  return (
    <Link onClick={onClick} to="c" smooth={true} duration={SCROLL_DURATION}>
      <li className="text-sm underline transition-all duration-100 hover:translate-y-[-2px]">
        {text}
      </li>
    </Link>
  )
}

export default NavLinkSubMenuItem
