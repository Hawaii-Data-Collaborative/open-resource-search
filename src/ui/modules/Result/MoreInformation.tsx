import { link } from '../../../utils'
import Box from '../../elements/Box'
import Link from '../../elements/Link'
import { t } from '../../../labels'

export default function MoreInformation({ hit }) {
  if (!hit) return null

  return (
    <Box textAlign="center">
      <Link to={link(`/search/${hit?.id ?? ''}`)} variant="normal" color="primary">
        {t('More Information')}
      </Link>
    </Box>
  )
}
