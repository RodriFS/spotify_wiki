import React from "react";
import { Panel } from "primereact/panel";

const Artist = ({ artist }: any) => {
  if (!artist) {
    return <div>404</div>;
  }

  const { name, genres, images } = artist;
  return (
    <Panel>
      <img src={images[0].url} alt={name} />
      <h1>{name}</h1>
      <div>Genres: {genres.join(", ") || "-"}</div>
      <br></br>
    </Panel>
  );
};

export default Artist;
