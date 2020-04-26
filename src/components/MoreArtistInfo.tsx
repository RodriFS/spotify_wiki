import React, { useState, useEffect } from "react";
import { get } from "../api/fetchProxy";
import { Carousel } from "primereact/carousel";
import { Panel } from "primereact/panel";

const token = "DlmhWUXwGmDjCoSWFYzBROvnlXraDOpvSQaKtYLu";
const DISCOGS_ARTIST_URL = "https://www.discogs.com";
const MoreArtistInfo = ({ name }: any) => {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    if (!name) {
      return;
    }
    get({
      url: "https://api.discogs.com/database/search?type=artist&q=" + name,
      headers: {
        Authorization: "Discogs token=" + token,
      },
    }).then((ob) => {
      if (!ob.error) {
        setArtists(ob.results);
      }
    });
  }, [name]);

  const moreArtistsInfoTemplate = (artist: any) => {
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
