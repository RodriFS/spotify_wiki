import React, { useEffect, useState } from "react";
import { get } from "../../api/fetchProxy";
import Artist from "../../components/Artist";
import Albums from "../../components/Albums";
import MoreArtistInfo from "../../components/MoreArtistInfo";
import { History, Location } from "history";
import { ErrorResponse, isErrorResponse } from "../../typings/request";

interface ArtistContainer {
  history: History;
  location: Location<{ endpoint: string }>;
}
const ArtistContainer = ({ history, location }: ArtistContainer) => {
  const [artist, setArtist] = useState<SpotifyApi.ArtistObjectFull>();
  const [albums, setAlbums] = useState<SpotifyApi.AlbumObjectFull[]>([]);

  useEffect(() => {
    if (!location.state) {
      return;
    }
    get({ url: location.state.endpoint }).then(
      (artist: SpotifyApi.ArtistObjectFull | ErrorResponse) => {
        if (!isErrorResponse(artist)) {
          setArtist(artist);
        }
      }
    );
    type PagingSavedAlbum = SpotifyApi.PagingObject<SpotifyApi.AlbumObjectFull>;
    get({ url: location.state.endpoint + "/albums" }).then(
      (paging: PagingSavedAlbum | ErrorResponse) => {
        if (!isErrorResponse(paging)) {
          setAlbums(paging.items);
        }
      }
    );
  }, [location.state]);

  const goToAlbum = (endpoint: string) => {
    history.push({
      pathname: "/album",
      state: { endpoint },
    });
  };

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <div>
      <Artist artist={artist} />
      <MoreArtistInfo name={artist.name} />
      <Albums albums={albums} goToAlbum={goToAlbum} />
    </div>
  );
};

export default ArtistContainer;
