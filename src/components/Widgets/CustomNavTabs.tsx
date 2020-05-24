import React from "react";
import classnames from "classnames";

export const CustomNavTabs: React.FC<React.HTMLAttributes<HTMLUListElement>> = (
  props
) => {
  return (
    <ul className={classnames("custom-nav-tabs", props.className)} {...props}>
      {props.children}
    </ul>
  );
};

export const NavTabItem: React.FC<React.HTMLAttributes<HTMLLIElement>> = (
  props
) => {
  return (
    <li className={classnames("nav-tab-item", props.className)} {...props}>
      {props.children}
    </li>
  );
};
