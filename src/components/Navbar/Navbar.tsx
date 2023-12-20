import cl from "./Navbar.module.scss";
import logo from "@/assets/images/Logo.svg";

const LINKS = [
  { title: "Users", href: "#" },
  { title: "Sign up", href: "#" },
];

function Navbar() {
  return (
    <nav>
      <div className={cl.container}>
        <img src={logo} className={cl.logo} />
        <ul className={cl.list}>
          {LINKS.map((link) => (
            <li key={link.title}>
              <a className={cl.link} href={link.href}>
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
