import { PAGINATION_QUERY } from '../components/Pagination'

const paginationField = () => {
  // the entire flow is Read > Merge > Read
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args

      const data = cache.readQuery({
        query: PAGINATION_QUERY,
      })
      const count = data?._allProductsMeta?.count
      const page = skip / first + 1
      const pages = Math.ceil(count / first)

      const items = existing.slice(skip, skip + first).filter((x) => x)

      //this applies for the last page
      if (items.length && items.length !== first && page === pages) {
        return items
      }

      if (items.length !== first) {
        //No product items in cache so return false and ask apollo client to fetch from the network(keystone db)
        return false
      }

      if (items.length) {
        // console.log(
        //   `There are ${items.length} items available in the InMemoryCache`
        // )
        return items
      }

      return false //incase both of the above returns fail, fallback to false
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args
      // console.log(`Merging incoming items from the network ${incoming.length}`)
      const merged = existing ? existing.slice(0) : []
      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip]
      }

      return merged
    },
  }
}

export default paginationField
4
