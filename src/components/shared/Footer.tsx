import { Facebook, Instagram, X } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/rentals", label: "Rentals" },
    { href: "/login", label: "Dashboard" },
    { href: "/about", label: "About Us" },
    { href: "/testimonial", label: "Testimonial" },
    { href: "/contact", label: "Contact Us" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook },
    { href: "#", icon: Instagram },
    { href: "#", icon: X },
  ];
  return (
    <footer className="bg-black text-white py-2 border-gray-200">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl text-white py-2 flex items-center">
              <img className=" max-h-36" width={200} src="/logo.webp"/>
              
            </h1>
          </div>
        </div>

        <hr />
        <ul className="flex justify-center space-x-6 text-sm text-white font-medium my-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-purple-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center text-white space-x-4">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <Link
              href={href}
              key={index}
              className="text-white hover:text-purple-600"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
