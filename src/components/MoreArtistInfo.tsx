import React, { useState, useEffect } from "react";
import { get } from "../api/fetchProxy";
import { Carousel } from "primereact/carousel";
import { Panel } from "primereact/panel";
import { Discogs } from "../typings/discogs";
import { Result } from "../utils/wrappings";
import { DISCOGS_BASE_URL, DISCOGS_TOKEN } from "../constants/config";

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
        Authorization: "Discogs token=" + DISCOGS_TOKEN,
      },
    }).then((response: Result<ArtistQuery, string>) => {
      if (response.isOk()) {
        const artists = response.ok();
        setArtists(artists.results);
      }
    });
  }, [name]);

  const moreArtistsInfoTemplate = (artist: Discogs.ArtistObjectFull) => {
    return (
      <a
        key={artist.id}
        href={DISCOGS_BASE_URL + artist.uri}
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
