import { formatPhoneNumber } from "@/utils/format";
import Avatar from "../Avatar/Avatar";
import Tooltip from "../Tooltip/Tooltip";
import cl from "./Card.module.scss";
import { User } from "@/api/users";

type Props = {
  user: User;
};

const Card = ({ user }: Props) => {
  const phone = formatPhoneNumber(user.phone);

  return (
    <div className={cl.card}>
      <Avatar src={user.photo} />
      <Tooltip content={user.name}>
        <p>{user.name}</p>
      </Tooltip>
      <div className={cl.secondary}>
        <Tooltip content={user.position}>
          <p>{user.position}</p>
        </Tooltip>
        <Tooltip content={user.email}>
          <p>{user.email}</p>
        </Tooltip>
        <Tooltip content={phone}>
          <p>{phone}</p>
        </Tooltip>
      </div>
    </div>
  );
};

export default Card;
