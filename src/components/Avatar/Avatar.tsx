import { useEffect, useState } from "react";
import cl from "./Avatar.module.scss";
import fallback from "@/assets/images/photo-cover.svg";

type Props = {
  src: string;
  size?: number;
};

const Avatar = ({ src, size = 70 }: Props) => {
  const [url, setUrl] = useState(src);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setUrl(src);
  }, [src]);

  const handleError = () => {
    if (isError) return;
    setUrl(fallback);
    setIsError(true);
  };

  return (
    <img
      width={size}
      className={cl.avatar}
      src={url}
      loading="lazy"
      onError={handleError}
    />
  );
};
export default Avatar;
