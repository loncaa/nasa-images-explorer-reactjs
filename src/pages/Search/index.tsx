import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { NasaImagesResponse } from "../../lib/NasaImagesApi";

import { SearchForm } from "../../components/SearchForm";
import { ImageGalleryWrapper } from "../../components/ImageGalleryWrapper";

import "./Search.css";

function Search() {
  const [searchParams] = useSearchParams();

  const [response, setResponse] = useState<NasaImagesResponse>();
  const [page, setPage] = useState<number>();

  const query = searchParams.get("q");
  const currentPage = searchParams.get("page");

  useEffect(() => {
    if (currentPage) {
      const page = Number.parseInt(currentPage);
      setPage(page);
    }
  }, [currentPage]);

  return (
    <div className="Search">
      <SearchForm
        urlQuery={query}
        page={page}
        setResponseHandler={setResponse}
        setPageHandler={setPage}
      />
      {response && (
        <ImageGalleryWrapper
          images={response.collection.items}
          setPageHandler={setPage}
          promptLinks={response.collection.links}
          currentPage={page}
        />
      )}
    </div>
  );
}

export default Search;
