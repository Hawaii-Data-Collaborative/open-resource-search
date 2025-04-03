import './Categories.scss'

import Button from '@mui/material/Button'
import Text from '../../../elements/Text'
import Box from '../../../elements/Box'
import { link } from '../../../../utils'
import { t } from '../../../../labels'

export default function Categories({ hit }) {
  if (!hit?.categories?.length) {
    return <div className="Categories" />
  }

  return (
    <Box marginTop="32px" className="Categories">
      <Text variant="h2" color="primary">
        {t('Categories')}
      </Text>
      <div className="chips">
        {hit.categories.map(c => (
          <Button key={c.value} href={link(`/search?terms=${c.label}&taxonomies=${c.value}`)}>
            {c.label}
          </Button>
        ))}
      </div>
    </Box>
  )
}
