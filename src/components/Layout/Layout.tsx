import { ReactElement } from "react";
import Navbar from "../Navbar/Navbar";
import cl from "./Layout.module.scss";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={cl.layout}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
