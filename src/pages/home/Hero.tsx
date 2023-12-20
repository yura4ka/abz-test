import cl from "./Hero.module.scss";

const Hero = () => {
  return (
    <header className={cl.header}>
      <div className={cl.container}>
        <div className={cl.contentWrapper}>
          <h1>Test assignment for front-end developer</h1>
          <p>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <a href="#sign-up" className={cl.btn}>
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
