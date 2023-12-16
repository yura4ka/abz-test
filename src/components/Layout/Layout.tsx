import { ReactElement } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import cl from "./Layout.module.scss";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={cl.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
