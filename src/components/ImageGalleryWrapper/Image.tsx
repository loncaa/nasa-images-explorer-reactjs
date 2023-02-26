import { FunctionComponent } from "react";

interface ImageProps {
  href: string;
  title: string;
}

export const Image: FunctionComponent<ImageProps> = ({ href, title }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <img className={`Image`} src={href} alt={title} />
    </a>
  );
};
