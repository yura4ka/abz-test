import Form from "./Form";
import Hero from "./Hero";
import cl from "./Home.module.scss";
import Users from "./Users";

function Home() {
  return (
    <main>
      <Hero />
      <div className={cl.wrapper}>
        <Users id="users" className={cl.section} />
        <Form id="sign-up" className={cl.section} />
      </div>
    </main>
  );
}

export default Home;
