import Skeleton from 'react-loading-skeleton'
import Text from '../../elements/Text'
import Link from '../../elements/Link'

export default function Heading({ hit }) {
  return (
    <Text variant="title" paragraph>
      <Link color="primary" to={`/search/${hit?.id ?? ''}`}>
        {!hit && <Skeleton />}
        {hit && hit.title}
      </Link>
    </Text>
  )
}
