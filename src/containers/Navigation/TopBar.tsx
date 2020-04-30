import React from "react";
import { Menubar } from "primereact/menubar";
import { History } from "history";

interface TopBar {
  history: History;
}
const TopBar = ({ history }: TopBar) => {
  const onClickHander = () => {
    history.push("/mylibrary");
  };
  const items = [
    {
      label: "My Library",
      icon: "pi pi-fw pi-home",
      command: onClickHander,
    },
  ];
  return <Menubar model={items} />;
};

export default TopBar;
