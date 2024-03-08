import Box from '../../elements/Box'
import Link from '../../elements/Link'

export default function MoreInformation({ hit }) {
  if (!hit) return null

  return (
    <Box textAlign="center">
      <Link to={`/search/${hit?.id ?? ''}`} variant="normal" color="primary">
        More Information
      </Link>
    </Box>
  )
}
