import axios, { AxiosResponse } from "axios";
const baseApiUrl = "https://images-api.nasa.gov";

export interface NasaImagesItem {
  data: {
    date_created: string;
    description: string;
    title: string;
  }[];
  links: {
    href: string;
    rel: "preview" | unknown;
    render: string;
  }[];
}

export interface NasaImagesPromptLinks {
  href: string;
  rel: "next" | "prev";
  prompt: "Next" | "Previous";
}

export interface NasaImagesResponse {
  collection: {
    href: string;
    items: NasaImagesItem[];
    links: NasaImagesPromptLinks[];
  };
}

export async function queryImages(
  query: string,
  page?: number
): Promise<AxiosResponse<NasaImagesResponse>> {
  let requestUrl = `${baseApiUrl}/search?q=${query}&media_type=image`;

  if (page) {
    requestUrl = requestUrl + `&page=${page}`;
  }

  return await axios.get(requestUrl);
}
