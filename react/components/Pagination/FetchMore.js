import React from 'react'
// eslint-disable-next-line no-restricted-imports
import { path } from 'ramda'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'

import Pagination from './components/loaders/Pagination'
import LoadingSpinner from './components/loaders/LoadingSpinner'
import { PAGINATION_TYPE } from './constants/paginationType'
import { useFetchMore } from './hooks/useFetchMore'
import styles from './searchResult.css'

const FetchMore = ({ htmlElementForButton = 'button' }) => {
  const { pagination,searchQuery, maxItemsPerPage, page } = useSearchPage()
  const products = path(['data', 'productSearch', 'products'], searchQuery)
  const totalNumberProducts = path(['data', 'productSearch', 'recordsFiltered'], searchQuery)
  const recordsFiltered = path(['data', 'productSearch', 'recordsFiltered'],  searchQuery)
  const fetchMore = path(['fetchMore'], searchQuery)

  const queryData = {
    query: path(['variables', 'query'], searchQuery),
    map: path(['variables', 'map'], searchQuery),
    orderBy: path(['variables', 'orderBy'], searchQuery),
    priceRange: path(['variables', 'selectedFacets'], searchQuery)?.find(
      facet => facet.key === 'priceRange'
    )?.value,
  }

  const {
    handleFetchMorePrevious,
    handleFetchChoosePage,
    handleFetchMoreNext,
    loading,
    from,
    to,
    previousPage,
    currentPage,
    nextPage,
    totalPages,
  } = useFetchMore({
    page,
    recordsFiltered,
    maxItemsPerPage,
    fetchMore,
    products,
    queryData,
    totalNumberProducts
  })

  //const isShowMore = pagination === PAGINATION_TYPE.SHOW_MORE
  const isShowMore = PAGINATION_TYPE.PAGINATION

  if(isShowMore=="pagination"){
    return (
      <div>
        <Pagination
          products={products}
          from={from}
          to={to}
          recordsFiltered={recordsFiltered}
          onFetchLess={handleFetchMorePrevious}
          onFetchPage={handleFetchChoosePage}
          onFetchMore={handleFetchMoreNext}
          loading={loading}
          pages={totalPages}
          showProductsCount={false}
          htmlElementForButton={htmlElementForButton}
          currentPage={currentPage}
          previousPage={previousPage}
          nextPage={nextPage}
          totalNumberProducts={totalNumberProducts}
        />
      </div>
    )
  }

  return <LoadingSpinner loading={loading} />
}

FetchMore.propTypes = {
  /* html element to render for fetch more button */
  htmlElementForButton: PropTypes.string,
}

FetchMore.schema = {
  title: 'admin/editor.search-result.fetch-more',
}

export default FetchMore
