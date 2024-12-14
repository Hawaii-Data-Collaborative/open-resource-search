import Box from '../../elements/Box'
import Text from '../../elements/Text'
import { THEME_CONSTANTS as theme } from '../../../constants'
import { getTextColorContrast } from '../../../utils'
import { IconButton } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useAppContext } from '../../../hooks'

export default function ResultCountBar({ results }) {
  const { showAdvancedFilters, setState } = useAppContext()

  const onClick = () => {
    setState({ showAdvancedFilters: !showAdvancedFilters })
  }

  return (
    <Box
      padding="2px 16px"
      backgroundColor={theme.PRIMARY_COLOR}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text variant="body2" style={{ color: getTextColorContrast(theme.PRIMARY_COLOR) }}>
        {results.isLoading && 'Loading results...'}
        {!results.isLoading && <>Results: {results.data.length}</>}
      </Text>
      <IconButton size="small" onClick={onClick}>
        <FilterListIcon sx={{ fill: '#fff' }} />
      </IconButton>
    </Box>
  )
}
