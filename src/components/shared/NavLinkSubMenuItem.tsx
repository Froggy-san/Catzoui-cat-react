import { SCROLL_DURATION } from "@/utils/constants";
import { Link } from "react-scroll";

const NavLinkSubMenuItem = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) => {
  return (
    <Link onClick={onClick} to="c" smooth={true} duration={SCROLL_DURATION}>
      <li className="underline hover:translate-y-[-2px] transition-all duration-100 text-sm">
        {text}
      </li>
    </Link>
  );
};

export default NavLinkSubMenuItem;
