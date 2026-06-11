import { Link } from "react-router-dom";
import footer_bag_logo from "@assets/bag_logo.svg";
import { FOOTER_LINKS } from "@/constants/footerLinks";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center py-10 px-4 space-y-5.5">

      <div className="flex justify-center w-full">
        <img src={footer_bag_logo} alt="Benefits Access Center" className="h-8 md:h-10 w-auto" />
      </div>
      
      <nav aria-label="Footer navigation">
        <div className="flex flex-col items-center justify-center gap-4 text-center py-4">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-[10px] text-muted uppercase hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      
      <div className="text-[10px] text-muted mt-4">
        © BENEFITS ACCESS CENTER, 2025
      </div>
    </footer>
  );
};

export default Footer;