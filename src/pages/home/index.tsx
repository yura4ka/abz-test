import Hero from "./Hero";
import cl from "./Home.module.scss";
import Users from "./Users";

function Home() {
  return (
    <main>
      <Hero />
      <div className={cl.wrapper}>
        <Users />
      </div>
    </main>
  );
}

export default Home;
