import Text from '../../elements/Text'
import Category from './Category/Category'
import { CategoriesContainer, Container } from './Categories.styles'
import { useCategoriesQuery } from '../../../hooks'
import { t } from '../../../labels'

export default function Categories() {
  const categories = useCategoriesQuery()

  return (
    <Container>
      <CategoriesContainer>
        <Text variant="h2" color="primary" paragraph>
          {t('Search Service by Category')}
        </Text>
      </CategoriesContainer>

      <CategoriesContainer>
        {categories.map(d => {
          return <Category key={d.name} data={d} />
        })}
      </CategoriesContainer>
    </Container>
  )
}
