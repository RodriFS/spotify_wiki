import React, { useEffect, useState } from "react";
import { get } from "../../api/fetchProxy";
import Artist from "../../components/Artist";
import Albums from "../../components/Albums";
import MoreArtistInfo from "../../components/MoreArtistInfo";

const ArtistContainer = ({ history, location }: any) => {
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (!location.state) {
      return;
    }
    get({ url: location.state.endpoint }).then(
      ({ name, genres, images, error }) => {
        if (!error) {
          setArtist({ name, genres, images } as any);
        }
      }
    );
    get({ url: location.state.endpoint + "/albums" }).then(
      ({ items, error }) => {
        if (!error) {
          setAlbums(items);
        }
      }
    );
  }, [location.state]);

  const goToAlbum = (endpoint: any) => {
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
