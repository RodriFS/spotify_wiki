import React from "react";

interface AlbumImage {
  images: SpotifyApi.ImageObject[];
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}
const AlbumImage = ({ images, onClick }: AlbumImage) => {
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
