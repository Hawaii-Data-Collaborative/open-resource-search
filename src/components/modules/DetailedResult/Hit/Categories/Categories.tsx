import Button from '@mui/material/Button'
import Text from 'src/components/elements/Text/Text'
import Box from 'src/components/elements/Box/Box'

export default function Categories({ hit }) {
  if (!hit?.categories?.length) {
    return <div className="Categories" />
  }

  return (
    <Box marginTop="32px" className="Categories">
      <Text variant="h2" color="primary">
        Categories
      </Text>
      <div className="chips">
        {hit.categories.map(c => (
          <Button key={c.value} href={`/search?terms=${c.label}&taxonomies=${c.value}`}>
            {c.label}
          </Button>
        ))}
      </div>
    </Box>
  )
}
