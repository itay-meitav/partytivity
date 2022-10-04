import React from "react";
import { useRecoilValue } from "recoil";
import { linkTransitionState } from "../Link";

function Template(props: React.PropsWithChildren) {
  const className = useRecoilValue(linkTransitionState);
  return <div className={className}>{props.children}</div>;
}

export default Template;
