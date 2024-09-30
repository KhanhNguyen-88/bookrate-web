import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Button from "../Button";

import style from "./UserComment.module.scss";
import AvatarWrapper from "../AvatarWrapper";

const cx = classNames.bind(style);
function UserComment() {
  return (
    <div className={cx("wrapper")}>
      <AvatarWrapper>
        <img
          src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/453331994_1942082019570479_8131514133023937204_n.jpg?stp=cp0_dst-jpg_s32x32&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGOJccTlzFofJYFRHc2jmhci56nH4phgKaLnqcfimGAprOVHrvPXiaEgCTcvAqS-e-FBgVS39OkC_YrNsQXNRmT&_nc_ohc=K2gtiOavB6EQ7kNvgEiXhbq&_nc_ht=scontent.fhan5-9.fna&oh=00_AYAgFpvwdooJkwgtiM42P7UrqbGW0PubGrq2p4xcZSnmzQ&oe=66FBC519"
          alt="avatar"
        ></img>
      </AvatarWrapper>
      <div className={cx("mainCom")}>
        <div className = {cx("wrapperContentCom")}>
          <div className={cx("contentCom")}>
              <h5>Nguyen Van Khanh</h5>
              <p>Good book!</p>
          </div>
          <Button to>
            <FontAwesomeIcon icon={faEllipsisH} />
          </Button>
        </div>
        <div className={cx("interact")}>
          <ul>
            <li>
              <Button to>2d</Button>
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
          <strong> 2 Likes</strong>
        </div>
      </div>
    </div>
  );
}

export default UserComment;
