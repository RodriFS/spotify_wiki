import React from "react";

const AlbumImage = ({ images, onClick }: any) => {
  return (
    <img
      onClick={onClick}
      className="art"
      src={images[0].url}
      alt="album cover"
    />
  );
};

export default AlbumImage;
