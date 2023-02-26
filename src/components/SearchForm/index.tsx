import React, { useState, FunctionComponent, useEffect } from "react";
import { useFetchImages } from "../../hooks/useFetchImages";
import "./SearchForm.css";

interface SearchFromProps {
  setResponseHandler: Function;
  setPageHandler: Function;
  urlQuery?: string | null;
  page?: number;
}

export const SearchForm: FunctionComponent<SearchFromProps> = ({
  setResponseHandler,
  setPageHandler,
  urlQuery,
  page,
}) => {
  const [query, setQuery] = useState("");
  const [tempQuery, setTempQuery] = useState("");

  const { isLoading, error, response } = useFetchImages(query, page);

  useEffect(() => {
    setResponseHandler(response);
  }, [response, setResponseHandler]);

  useEffect(() => {
    if (urlQuery) sanitizeQuery(urlQuery);
  }, [urlQuery]);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setTempQuery(value);
  }

  function sanitizeQuery(query: string) {
    const sanitizedQuery = encodeURIComponent(query);

    console.log(sanitizeQuery);
    setQuery(sanitizedQuery);
  }

  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();
    sanitizeQuery(tempQuery);
    setPageHandler(null);
  }

  return (
    <div className="SearchForm">
      <div className="SearchForm--formWrapper">
        <form onSubmit={handleOnSubmit} className="SearchForm--form">
          <input
            type="text"
            onChange={handleOnChange}
            className="SearchForm--textInput"
          />
          <input
            type="submit"
            name="Search"
            value="Search"
            disabled={isLoading}
            className="SearchForm--button"
          />
        </form>
      </div>
      <div className="SearchForm--message">
        {isLoading ? <span>Loading</span> : null}
        {error ? <span>{error}</span> : null}
      </div>
    </div>
  );
};
