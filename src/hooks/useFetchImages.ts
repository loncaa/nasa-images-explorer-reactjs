import { useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { NasaImagesResponse } from "../lib/NasaImagesApi";

import * as ImageService from "../services/ImagesService";

export const useFetchImages = (searchQuery: string, page?: number) => {
  const navigate = useNavigate();

  const [response, setResponse] = useState<NasaImagesResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const sendQuery = useCallback(async () => {
    setResponse(undefined);
    setIsLoading(true);

    await ImageService.fetchImages(searchQuery, page)
      .then((response) => {
        setResponse(response);
        setIsLoading(false);
        let searchQueries = `?q=${searchQuery}`;
        if (page) searchQueries = searchQueries + `&page=${page}`;

        navigate({
          search: searchQueries,
        });
      })
      .catch((message) => {
        setError(message);
        setIsLoading(false);
      });
  }, [searchQuery, page, navigate]);

  useEffect(() => {
    if (!searchQuery) return;

    sendQuery();
  }, [searchQuery, page, navigate, sendQuery]);

  return { isLoading, error, response };
};
