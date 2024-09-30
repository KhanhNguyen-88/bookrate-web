import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Button from "../../../../components/Button";

import style from "./UserComment.module.scss";
import AvatarWrapper from "../../../../components/AvatarWrapper";

const cx = classNames.bind(style);
function UserComment({userFirstComment}) {
  return (
    <div className={cx("wrapper")}>
      <AvatarWrapper>
        <img
          src={userFirstComment.userAvatar}
          alt="avatar"
        ></img>
      </AvatarWrapper>
      <div className={cx("mainCom")}>
        <div className = {cx("wrapperContentCom")}>
          <div className={cx("contentCom")}>
              <h5>{userFirstComment.userName}</h5>
              <p>{userFirstComment.userComment}</p>
          </div>
          <Button to>
            <FontAwesomeIcon icon={faEllipsisH} />
          </Button>
        </div>
        <div className={cx("interact")}>
          <ul>
            <li>
              <Button to>{userFirstComment.commentPublished}</Button>
            </li>
            <li>
              <Button to>Like</Button>
            </li>
            <li>
              <Button to>Reply</Button>
            </li>
            <li>
              <Button to>Share</Button>
            </li>
          </ul>
          <strong>{userFirstComment.totalLikes} Likes</strong>
        </div>
      </div>
    </div>
  );
}

export default UserComment;
