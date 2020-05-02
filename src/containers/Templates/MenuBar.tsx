import React from "react";
import { History } from "history";

export interface MenuBarItem {
  renderer?: () => JSX.Element;
  label?: string;
  icon?: string;
  to?: string;
  isBreak?: boolean;
}

interface MenuBar {
  model: MenuBarItem[];
  history: History;
}
const MenuBar = ({ model, history }: MenuBar) => {
  return (
    <div className="menu-bar-template">
      {model.map((menuBarItem: MenuBarItem, index) => {
        const { renderer, to, label, icon, isBreak } = menuBarItem;
        if (renderer) {
          return renderer();
        } else if (isBreak) {
          return (
            <div key={"menuItem" + index} className="menu-bar-break"></div>
          );
        } else {
          let command = () => {};
          if (to) {
            command = () => {
              history.push(to);
            };
          }
          const underlinedClass =
            to === history.location.pathname ? "underlined" : "";
          return (
            <div className="menu-bar-item" key={"menuItem" + index}>
              {icon && <i className={icon} />}
              <button className={underlinedClass} onClick={command}>
                {label || ""}
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MenuBar;
