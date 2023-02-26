import { AxiosResponse, AxiosError } from "axios";
import { queryImages, NasaImagesResponse } from "../lib/NasaImagesApi";

function onSuccess(response: AxiosResponse): NasaImagesResponse {
  const { data } = response;
  return data;
}

function onError(error: AxiosError) {
  const { message } = error;
  return Promise.reject(message);
}

export async function fetchImages(
  query: string,
  page?: number
): Promise<NasaImagesResponse> {
  const sanitizedQueryString = query.toLowerCase().split(" ").join("%20");

  return await queryImages(sanitizedQueryString, page)
    .then(onSuccess)
    .catch(onError);
}
