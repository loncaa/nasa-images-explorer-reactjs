import { FunctionComponent } from "react";
import { NasaImagesItem, NasaImagesPromptLinks } from "../../lib/NasaImagesApi";
import { ImageGallery } from "./ImageGallery";

import "./ImageGalleryWrapper.css";

interface ImageGalleryWrapperProps {
  images: NasaImagesItem[];
  setPageHandler: Function;
  promptLinks?: NasaImagesPromptLinks[];
  currentPage?: number;
}

export const ImageGalleryWrapper: FunctionComponent<
  ImageGalleryWrapperProps
> = ({ images, promptLinks, currentPage, setPageHandler }) => {
  const next = promptLinks?.find((pl) => pl.rel === "next");
  const previous = promptLinks?.find((pl) => pl.rel === "prev");

  function handleOnPrevClick() {
    if (currentPage && currentPage > 1) setPageHandler(currentPage - 1);
  }
  function handleOnNextClick() {
    if (!currentPage) currentPage = 1;
    setPageHandler(currentPage + 1);
  }

  return (
    <div className="ImageGalleryWrapper">
      {images.length === 0 ? (
        "Images not found"
      ) : (
        <ImageGallery
          images={images}
          handleOnNextClick={next ? handleOnNextClick : undefined}
          handleOnPrevClick={previous ? handleOnPrevClick : undefined}
        />
      )}
    </div>
  );
};
