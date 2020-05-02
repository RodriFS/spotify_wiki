import React from "react";
import AlbumImage from "./AlbumImage";
import ArtistLink from "./ArtistLink";
import { DataView } from "primereact/dataview";
import { Panel } from "primereact/panel";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

type Albums = {
  albums: SpotifyApi.AlbumObjectFull[];
  getPreviousAlbums?: () => void;
  getNextAlbums?: () => void;
  goToAlbum: (href: string) => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
};
const Albums = ({
  albums,
  getPreviousAlbums,
  getNextAlbums,
  hasNext,
  hasPrevious,
  goToAlbum,
}: Albums) => {
  const albumTemplate = (album: SpotifyApi.AlbumObjectFull) => {
    const { images, name, artists, href, id } = album;
    const header = (
      <button style={{ height: 35 }} onClick={() => goToAlbum(href)}>
        {name}
      </button>
    );
    return (
      <div key={id} className="p-col-12 p-md-3 square">
        <Panel header={header} style={{ padding: "0.5em" }}>
          <div>
            <AlbumImage images={images} onClick={() => goToAlbum(href)} />
          </div>
          <div>
            <ArtistLink artists={artists} />
          </div>
        </Panel>
      </div>
    );
  };

  const Paginator = () => (
    <Toolbar>
      <div className="buttonBar">
        <Button
          icon="pi pi-caret-left"
          className="p-button-success"
          onClick={getPreviousAlbums}
          disabled={!hasPrevious}
        />
        <Button
          icon="pi pi-caret-right"
          className="p-button-success"
          onClick={getNextAlbums}
          disabled={!hasNext}
        />
      </div>
    </Toolbar>
  );

  return (
    <div className="albumPage">
      <Paginator />
      <DataView value={albums} itemTemplate={albumTemplate} layout="grid" />
      <Paginator />
    </div>
  );
};

export default Albums;
