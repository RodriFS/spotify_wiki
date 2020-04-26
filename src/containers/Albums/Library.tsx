import React, { useEffect, useState } from "react";
import { get, BASE_URL, addQueryParams } from "../../api/fetchProxy";
import Albums from "../../components/Albums";

const AlbumsContainer = ({ history }: any) => {
  const [albums, setAlbums] = useState([]);
  const [nextQuery, setNextQuery] = useState();
  const [previousQuery, setPreviousQuery] = useState();

  const fetchNextAlbums = (query: string) => {
    get({ url: query }).then(({ items, next, previous, error }) => {
      if (!error) {
        setAlbums(items.map((i: any) => i.album));
        setNextQuery(next);
        setPreviousQuery(previous);
        window.scrollTo(0, 0);
      }
    });
  };
  useEffect(() => {
    const queryParams = {
      offset: "0",
      limit: "21",
    };
    fetchNextAlbums(BASE_URL + "/me/albums" + addQueryParams(queryParams));
  }, []);

  const getPreviousAlbums = async () => {
    if (previousQuery) {
      fetchNextAlbums(previousQuery!);
    }
  };

  const getNextAlbums = async () => {
    if (nextQuery) {
      fetchNextAlbums(nextQuery!);
    }
  };

  const goToAlbum = (endpoint: any) => {
    history.push({
      pathname: "/album",
      state: { endpoint },
    });
  };

  return (
    <div className="library">
      <Albums
        albums={albums}
        getPreviousAlbums={getPreviousAlbums}
        getNextAlbums={getNextAlbums}
        hasNext={!!nextQuery}
        hasPrevious={!!previousQuery}
        goToAlbum={goToAlbum}
      />
    </div>
  );
};

export default AlbumsContainer;
