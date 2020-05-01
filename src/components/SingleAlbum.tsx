import React, { useEffect, useState } from "react";
import AlbumImage from "./AlbumImage";
import ArtistLink from "./ArtistLink";
import TrackList from "./TrackList";
import { get } from "../api/fetchProxy";
import { Panel } from "primereact/panel";
import { Location } from "history";
import { Result } from "../utils/wrappings";

interface SingleAlbum {
  location: Location<{ endpoint: string }>;
}
const SingleAlbum = ({ location }: SingleAlbum) => {
  const [album, setAlbum] = useState<SpotifyApi.SingleAlbumResponse>();

  useEffect(() => {
    if (!location.state) {
      return;
    }
    get({ url: location.state.endpoint }).then(
      (response: Result<SpotifyApi.SingleAlbumResponse, string>) => {
        if (response.isOk()) {
          const album = response.ok();
          setAlbum(album);
        }
      }
    );
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
  } = album;
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
