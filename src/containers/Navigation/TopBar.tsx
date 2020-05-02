import React from "react";
import Menubar, { MenuBarItem } from "../Templates/MenuBar";
import { History } from "history";

interface TopBar {
  history: History;
}
const TopBar = ({ history }: TopBar) => {
  const items: MenuBarItem[] = [
    {
      renderer: () => (
        <div key="logo" className="title-logo">
          Spotify + Wiki
        </div>
      ),
    },
    {
      isBreak: true,
    },
    {
      label: "My Library",
      icon: "pi pi-fw pi-home",
      to: "/mylibrary",
    },
    {
      isBreak: true,
    },
    {
      renderer: () => (
        <div key="search-bar" className="search-bar">
          <span>Search: </span>
          <input placeholder="Type here to find an album or artist"></input>
        </div>
      ),
    },
  ];
  return (
    <div className="top-bar-page">
      <Menubar history={history} model={items} />
    </div>
  );
};

export default TopBar;
