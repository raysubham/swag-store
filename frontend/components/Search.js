import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown'
import { resetIdCounter, useCombobox } from 'downshift'
import { gql, useLazyQuery } from '@apollo/client'
import debounce from 'lodash.debounce'
import router from 'next/router'

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

const Search = () => {
  const [findItems, { data, error, loading }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  )

  const items = data?.allProducts || []

  const findItemsWithSlightDelay = debounce(findItems, 200)

  resetIdCounter()
  const {
    inputValue,
    highlightedIndex,
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
  } = useCombobox({
    items: items,
    onInputValueChange() {
      console.log('inpuy chanegd')
      findItemsWithSlightDelay({
        variables: {
          searchTerm: inputValue,
        },
      })
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem.id}`,
      })
    },
    itemToString: (item) => item?.name || '',
  })

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          style={{ textAlign: 'center' }}
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for your favorite Wardrobe!',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}>
              <img
                width='50'
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry! No Products found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  )
}

export default Search
