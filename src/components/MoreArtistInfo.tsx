import React, { useState, useEffect } from "react";
import { get } from "../api/fetchProxy";
import { Carousel } from "primereact/carousel";
import { Panel } from "primereact/panel";
import { Discogs } from "../typings/discogs";
import { isErrorResponse, ErrorResponse } from "../typings/request";

const token = "DlmhWUXwGmDjCoSWFYzBROvnlXraDOpvSQaKtYLu";
const DISCOGS_ARTIST_URL = "https://www.discogs.com";

interface MoreArtistInfo {
  name: string;
}
const MoreArtistInfo = ({ name }: MoreArtistInfo) => {
  const [artists, setArtists] = useState<Discogs.ArtistObjectFull[]>([]);
  useEffect(() => {
    if (!name) {
      return;
    }
    type ArtistQuery = Discogs.ArtistQueryResults<Discogs.ArtistObjectFull[]>;
    get({
      url: "https://api.discogs.com/database/search?type=artist&q=" + name,
      headers: {
        Authorization: "Discogs token=" + token,
      },
    }).then((artists: ArtistQuery | ErrorResponse) => {
      if (!isErrorResponse(artists)) {
        setArtists(artists.results);
      }
    });
  }, [name]);

  const moreArtistsInfoTemplate = (artist: Discogs.ArtistObjectFull) => {
    return (
      <a
        key={artist.id}
        href={DISCOGS_ARTIST_URL + artist.uri}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={artist.cover_image} alt={artist.title} />
        <div>{artist.title}</div>
      </a>
    );
  };
  return (
    <div className="moreInfo">
      <Panel header="Discogs">
        <Carousel
          value={artists}
          itemTemplate={moreArtistsInfoTemplate}
          numVisible={4}
        ></Carousel>
      </Panel>
    </div>
  );
};

export default MoreArtistInfo;
