import cl from "./Navbar.module.scss";
import logo from "@/assets/images/Logo.svg";

const LINKS = [
  { title: "Users", href: "#users" },
  { title: "Sign up", href: "#sign-up" },
];

function Navbar() {
  return (
    <nav>
      <div className={cl.container}>
        <img
          src={logo}
          width="104"
          height="26"
          className={cl.logo}
          alt="TEST TASK"
        />
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
