import React, { useEffect, useState } from "react";
import { get, addQueryParams } from "../../api/fetchProxy";
import Albums from "../../components/Albums";
import { History } from "history";
import { Result } from "../../utils/wrappings";
import { SPOTIFY_BASE_URL } from "../../constants/config";

interface AlbumContainer {
  history: History;
}
const AlbumsContainer = ({ history }: AlbumContainer) => {
  const [albums, setAlbums] = useState<SpotifyApi.AlbumObjectFull[]>([]);
  const [nextQuery, setNextQuery] = useState<string>();
  const [previousQuery, setPreviousQuery] = useState<string>();

  type PagingSavedAlbum = SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject>;
  const fetchNextAlbums = (query: string) => {
    get({ url: query }).then((response: Result<PagingSavedAlbum, string>) => {
      if (response.isOk()) {
        const paging = response.ok();
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
    fetchNextAlbums(
      SPOTIFY_BASE_URL + "/me/albums" + addQueryParams(queryParams)
    );
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
