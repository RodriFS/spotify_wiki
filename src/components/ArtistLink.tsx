import React from "react";
import { useHistory } from "react-router-dom";

const ArtistLink = ({ artists }: any) => {
  const history = useHistory();
  const onClickHandler = (endpoint: string) => {
    history.push({
      pathname: "/artist",
      state: { endpoint },
    });
  };
  return (
    <div>
      {artists.map((artist: any) => (
        <button key={artist.id} onClick={() => onClickHandler(artist.href)}>
          {artist.name}
        </button>
      ))}
    </div>
  );
};

export default ArtistLink;
