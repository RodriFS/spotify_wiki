import React from "react";
import { useHistory } from "react-router-dom";

interface ArtistLink {
  artists: SpotifyApi.ArtistObjectSimplified[];
}
const ArtistLink = ({ artists }: ArtistLink) => {
  const history = useHistory();
  const onClickHandler = (endpoint: string) => {
    history.push({
      pathname: "/artist",
      state: { endpoint },
    });
  };
  return (
    <div>
      {artists.map((artist: SpotifyApi.ArtistObjectSimplified) => (
        <button key={artist.id} onClick={() => onClickHandler(artist.href)}>
          {artist.name}
        </button>
      ))}
    </div>
  );
};

export default ArtistLink;
