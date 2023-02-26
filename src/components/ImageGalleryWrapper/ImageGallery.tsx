import { FunctionComponent, MouseEventHandler } from "react";
import { NasaImagesItem } from "../../lib/NasaImagesApi";
import { Image } from "./Image";

import "./ImageGallery.css";

interface ImageGalleryProps {
  images: NasaImagesItem[];
  handleOnPrevClick?: MouseEventHandler<HTMLButtonElement>;
  handleOnNextClick?: MouseEventHandler<HTMLButtonElement>;
}

export const ImageGallery: FunctionComponent<ImageGalleryProps> = ({
  images,
  handleOnPrevClick,
  handleOnNextClick,
}) => {
  return (
    <>
      {images.map(({ data, links }, i) => {
        if (data[0]) {
          const { title, date_created } = data[0];
          return (
            <Image key={date_created + i} title={title} href={links[0].href} />
          );
        }

        return null;
      })}
      <div className="ImageGallery--pagination">
        <button
          key="prev"
          disabled={!handleOnPrevClick}
          onClick={handleOnPrevClick}
          className="ImageGallery--paginationButton"
        >
          &laquo; Previous
        </button>
        <button
          key="next"
          disabled={!handleOnNextClick}
          onClick={handleOnNextClick}
          className="ImageGallery--paginationButton"
        >
          Next &raquo;
        </button>
      </div>
    </>
  );
};
