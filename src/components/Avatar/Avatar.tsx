import cl from "./Avatar.module.scss";

type Props = {
  src: string;
};

const Avatar = ({ src }: Props) => {
  return <img className={cl.avatar} src={src} loading="lazy" />;
};
export default Avatar;
