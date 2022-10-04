import React from "react";
import {
  Link as RouterLink,
  LinkProps,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { atom, useRecoilState } from "recoil";

type TProps = {
  to: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: Function;
};

export const linkTransitionState = atom({
  key: "linkTransition",
  default: "",
});

const CustomLink = (props: React.PropsWithChildren<TProps>) => {
  const [linkTransition, setLinkTransition] =
    useRecoilState(linkTransitionState);
  const navigate = useNavigate();

  return (
    <a
      className={props.className}
      style={{ ...props.style, cursor: "pointer" } || { cursor: "pointer" }}
      onClick={(e) => {
        e.preventDefault();
        props.onClick && props.onClick();
        const pathname = window.location.pathname + window.location.search;
        const href = window.location.href;
        const isDiff = props.to != pathname && props.to != href;

        if (isDiff) {
          setLinkTransition("fade-out");
          setTimeout(() => {
            setLinkTransition("fade-in");
            navigate(props.to);
          }, 500);
        }
      }}
    >
      {props.children}
    </a>
  );
};

export default CustomLink;
