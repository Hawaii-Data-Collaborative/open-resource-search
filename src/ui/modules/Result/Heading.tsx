import Skeleton from 'react-loading-skeleton'
import Text from '../../elements/Text'
import Link from '../../elements/Link'
import { link } from '../../../utils'

export default function Heading({ hit }) {
  return (
    <Text variant="title" paragraph>
      <Link color="primary" to={link(`/search/${hit?.id ?? ''}`)}>
        {!hit && <Skeleton />}
        {hit && hit.title}
      </Link>
    </Text>
  )
}
