import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Button.module.scss";

const cx = classNames.bind(style);
function Button({
  submit,
  linkAuthor,
  btnHeader,
  second,
  btnGenres,
  primary,
  children,
  onClick,
  to,
  href,
  leftIcon,
  unFollow,
}) {
  let Com = "button";
  const Classes = cx("wrapper", {
    primary,
    second,
    btnHeader,
    btnGenres,
    linkAuthor,
    unFollow,
  });
  const props = {
    onClick,
  };
  if (submit) {
    props.type = submit
  }
  if (to) {
    props.to = to;
    Com = Link;
  } else if (href) {
    props.href = href;
    Com = "a";
  }
  return (
    <Com className={Classes} {...props}>
      {leftIcon && <span className={cx("leftIcon")}>{leftIcon}</span>}
      {children}
    </Com>
  );
}

export default Button;
