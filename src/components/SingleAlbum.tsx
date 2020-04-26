import React, { useEffect, useState } from "react";
import AlbumImage from "./AlbumImage";
import ArtistLink from "./ArtistLink";
import TrackList from "./TrackList";
import { get } from "../api/fetchProxy";
import { Panel } from "primereact/panel";

const SingleAlbum = ({ location }: any) => {
  const [album, setAlbum] = useState();

  useEffect(() => {
    if (!location.state) {
      return;
    }
    get({ url: location.state.endpoint }).then((album) => {
      if (!album.error) {
        setAlbum(album);
      }
    });
  }, [location.state]);

  if (!album) {
    return null;
  }

  const {
    name,
    images,
    album_type,
    release_date,
    artists,
    genres,
    label,
    tracks,
  } = album as any;
  return (
    <div className="singleAlbum">
      <Panel header={name}>
        <AlbumImage images={images} />
        <ArtistLink artists={artists} />
        <br></br>
        <div>
          <strong>Album type: </strong>
          {album_type}
        </div>
        <div>
          <strong>Release Date: </strong>
          {release_date}
        </div>

        <div>
          <strong>Genres: </strong>
          {genres.join(", ") || "-"}
        </div>
        <div>
          <strong>Label: </strong>
          {label}
        </div>
        <TrackList tracks={tracks.items} />
      </Panel>
    </div>
  );
};

export default SingleAlbum;
