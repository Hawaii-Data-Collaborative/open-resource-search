import Text from '../../../elements/Text'
import Link from '../../../elements/Link'
import Flex from '../../../elements/Flex'
import Box from '../../../elements/Box'
import { useAppDispatch, useAppSelector } from '../../../../redux/store'
import { setQuery } from '../../../../redux/slices/search'
import { link } from '../../../../utils'

export default function Category({ data }) {
  const dispatch = useAppDispatch()
  const location = useAppSelector(state => state.search.location)

  function clearQuery() {
    dispatch(setQuery(''))
  }

  return (
    <Flex flex="1 1 25%" marginBottom="32px" marginRight="32px">
      <Box>
        <img
          alt=""
          src={data.icon}
          width={36}
          height="auto"
          style={{
            marginRight: 16
          }}
        />
      </Box>
      <Box>
        <Text variant="h3" color="primary" marginBottom="8px">
          {data.name}
        </Text>
        <Flex flexDirection="column">
          {data.children.map(cat => {
            let href = link(`/search?${cat.params}`)

            if (location != null && location.length > 0) {
              href += `&location=${location}`
            }

            return (
              <Link onClick={clearQuery} key={cat.name} to={href} variant="normal" color="primary" marginBottom="4px">
                {cat.name}
              </Link>
            )
          })}
        </Flex>
      </Box>
    </Flex>
  )
}
