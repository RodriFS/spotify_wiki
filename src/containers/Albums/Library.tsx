import React, { useEffect, useState } from "react";
import { get, BASE_URL, addQueryParams } from "../../api/fetchProxy";
import Albums from "../../components/Albums";
import { History } from "history";
import { ErrorResponse, isErrorResponse } from "../../typings/request";

interface AlbumContainer {
  history: History;
}
const AlbumsContainer = ({ history }: AlbumContainer) => {
  const [albums, setAlbums] = useState<SpotifyApi.AlbumObjectFull[]>([]);
  const [nextQuery, setNextQuery] = useState<string>();
  const [previousQuery, setPreviousQuery] = useState<string>();

  type PagingSavedAlbum = SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject>;
  const fetchNextAlbums = (query: string) => {
    get({ url: query }).then((paging: PagingSavedAlbum | ErrorResponse) => {
      if (!isErrorResponse(paging)) {
        setAlbums(paging.items.map((i) => i.album));
        setNextQuery(paging.next);
        setPreviousQuery(paging.previous);
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

  const goToAlbum = (endpoint: string) => {
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
