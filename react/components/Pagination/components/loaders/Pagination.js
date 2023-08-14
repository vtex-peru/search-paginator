import React, { Fragment,useEffect, useState } from "react";
// eslint-disable-next-line no-restricted-imports
import { path } from "ramda";
import { useSearchPage } from "vtex.search-page-context/SearchPageContext";
import { useCssHandles } from "vtex.css-handles";
import { useRuntime } from 'vtex.render-runtime'

const CSS_HANDLES = [
  "pagination",
  "paginationwrapper",
  "paginationinfo",
  "paginationinfowrapper",
  "paginationbutton",
  "paginationbuttonactive",
];
const usePaginator = (from, to, products, loading, maxItemsPerPage, page, recordsFiltered) => {
  const [totalNumberProducts,settotalNumberProducts] = useState(0)
  const [totalNumberOfPages,settotalNumberOfPages] = useState(0)
  const [pagesToShow,setpagesToShow] = useState([])
  useEffect(() => {
    if (!loading) {
      const totalProducts = recordsFiltered

      // total number of pages
      const totalPages=Math.ceil(totalProducts/maxItemsPerPage)

      // create an array with n elements based on the integer value of totalNumberOfPages
      const pages = [];
      for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1);
      }

      // create a new array with the pages that will be displayed based on the current page showing 3 after and 10 before
      const pagesToShows = pages.filter(
        (thePage) =>
          thePage >= page - 3 &&
          thePage <= page + 10 &&
          thePage <= totalPages
      )

      // insert '»" at the end if there is a next page
      if (page < totalPages) {
        pagesToShows.push("»");
      }

      // insert "«" at the beginning if there is a previous page
      if (page > 1) {
        pagesToShows.unshift("«");
      }

      // insert last page if it is not in the array
      if (pagesToShows[pagesToShows.length - 1] !== totalPages) {
        pagesToShows.push("Última");
      }

      // insert first page if it is not in the array
      if (pagesToShows[0] !== 1) {
        pagesToShows.unshift("Primera");
      }
      settotalNumberProducts(totalProducts)
      settotalNumberOfPages(totalPages)
      setpagesToShow(pagesToShows)
    }
  }, [to, products, loading, recordsFiltered])
  console.log("maxItemsPerPage", maxItemsPerPage)
  console.log("from",from)
  console.log("to",to)
  console.log("pagesToShow1",pagesToShow)
  console.log("products",products)
  return {
    pagesToShow,
    totalNumberProducts,
    totalNumberOfPages,
  }
}

export function getMapQueryString(searchQuery, hideMap) {
  if (
    hideMap ||
    !searchQuery ||
    !searchQuery.variables ||
    shouldNotIncludeMap(searchQuery.variables.map)
  ) {
    return ''
  }

  return `&map=${searchQuery.variables.map}`
}

const Pagination = props => {
  const {
    products,
    from,
    to,
    recordsFiltered,
    onFetchLess,
    onFetchPage,
    onFetchMore,
    loading,
    pages,
    showProductsCount,
    htmlElementForButton,
    currentPage,
    previousPage,
    nextPage,
    totalNumberProducts
  } = props
  const isAnchor = htmlElementForButton === 'a'
  const { searchQuery, maxItemsPerPage } = useSearchPage();
  const { query } = useRuntime()
  const hideMap = !query?.map
  const totalNumberOfPages = pages
  console.log("previousPage",previousPage)
  console.log("currentPage",currentPage)
  console.log("nextPage",nextPage)
  const {pagesToShow} = usePaginator(from, to, products, loading, maxItemsPerPage, currentPage, recordsFiltered)

  // CSS Handles
  const handles = useCssHandles(CSS_HANDLES);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  const handleFetchMoreClick = ev => {
    isAnchor && ev.preventDefault()
    onFetchMore()
    scrollToTop()
  }
  const handleFetchLessClick = ev => {
    isAnchor && ev.preventDefault()
    onFetchLess()
    scrollToTop()
  }
  const handleFetchPageClick = (ev) => {
    const goPage = ev.target.value == "Primera"
                  ? 1
                  : ev.target.value == "Última"
                  ? totalNumberOfPages
                  : parseInt(ev.target.value)
    isAnchor && ev.preventDefault()
    onFetchPage(goPage)
    scrollToTop()
  }

  // message saying how many products are being shown and how many there are
  const productsShowingMessage = `Mostrando ${
    currentPage * maxItemsPerPage - maxItemsPerPage + 1
  }-${
    currentPage * maxItemsPerPage > totalNumberProducts
      ? totalNumberProducts
      : currentPage * maxItemsPerPage
  } de ${totalNumberProducts} produtos`;

  console.log("pagesToShow",pagesToShow)
  return (
    <Fragment>
    <div
      className={`${handles.pagination} flex flex-wrap justify-center flex-column items-center mt7`}
    >
      {!showProductsCount && (
      <div className={`${handles.paginationinfowrapper} flex justify-center items-center`}>
        <div
          className={`${handles.paginationinfo} flex justify-center items-center ma2 flex-wrap bg-black-80 ph5 pv3 br4 f6 white`}
        >
          <svg
            className={`mr3 w1`}
            style={{ fill: "white" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
          </svg>

          {productsShowingMessage}
        </div>
      </div>
      )}
      <div
        id="total"
        className={`${handles.paginationwrapper} flex justify-center ma5 flex-wrap`}
      >
        {pagesToShow.map((thePage) =>
          currentPage == thePage ? (
            <>
              <span
                key={thePage}
                className={`${handles.paginationbuttonactive} inline-block bg-black-20 br2 pa4 ma2 black self-start`}
              >
                {thePage}
              </span>
            </>
          ) : thePage=="»" ? (
            <>
              <button
                onClick={ev => handleFetchMoreClick(ev)}
                href={
                  isAnchor &&
                  `?page=${page+1}${getMapQueryString(searchQuery, hideMap)}`
                }
                rel={isAnchor && 'next'}
                isLoading={loading}
                value={thePage}
                key={to}
                className={`${handles.paginationbutton} no-underline inline-block bg-black-10 br2 pa4 ma2 near-black self-start hover-bg-black-20`}
                title={`Ir para Siguiente Página"`}
                type="button"
              >
                {thePage}
              </button>
            </>
          ) : thePage=="«" ? (
            <>
              <button
                onClick={ev => handleFetchLessClick(ev)}
                href={
                  isAnchor &&
                  `?page=${page-1}${getMapQueryString(searchQuery, hideMap)}`
                }
                rel={isAnchor && 'previous'}
                isLoading={loading}
                value={thePage}
                key={to}
                className={`${handles.paginationbutton} no-underline inline-block bg-black-10 br2 pa4 ma2 near-black self-start hover-bg-black-20`}
                title={`Ir para "Página Anterior"`}
                type="button"
              >
                {thePage}
              </button>
            </>
          ) : thePage=="Última" ? (
            <>
              <button
                onClick={ev => handleFetchPageClick(ev)}
                href={
                  isAnchor &&
                  `?page=${totalNumberOfPages}${getMapQueryString(searchQuery, hideMap)}`
                }
                rel={isAnchor && 'lastpage'}
                isLoading={loading}
                value={thePage}
                key={to}
                className={`${handles.paginationbutton} no-underline inline-block bg-black-10 br2 pa4 ma2 near-black self-start hover-bg-black-20`}
                title={`Ir para Última Página`}
                type="button"
              >
                {thePage}
              </button>
            </>
          ) : thePage=="Primera" ? (
            <>
              <button
                onClick={(ev) => handleFetchPageClick(ev)}
                href={
                  isAnchor &&
                  `?page=${1}${getMapQueryString(searchQuery, hideMap)}`
                }
                rel={isAnchor && 'firstpage'}
                isLoading={loading}
                value={1}
                key={to}
                className={`${handles.paginationbutton} no-underline inline-block bg-black-10 br2 pa4 ma2 near-black self-start hover-bg-black-20`}
                title={`Ir para Primera Página`}
                type="button"
              >
                {thePage}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(ev) => handleFetchPageClick(ev)}
                href={
                  isAnchor &&
                  `?page=${thePage}${getMapQueryString(searchQuery, hideMap)}`
                }
                rel={isAnchor && 'choose'}
                isLoading={loading}
                value={thePage}
                key={thePage}
                className={`${handles.paginationbutton} no-underline inline-block bg-black-10 br2 pa4 ma2 near-black self-start hover-bg-black-20`}
                title={`Ir para Página ${thePage}`}
                type="button"
              >
                {thePage}
              </button>
            </>
          )
        )}
      </div>
    </div>
    </Fragment>
  );
};

export default Pagination;
