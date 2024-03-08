import Flex from '../elements/Flex'
import Header from '../modules/Header/Header'

type Props = {
  children: React.ReactNode
}

const Search = ({ children }: Props) => (
  <Flex flexDirection="column" height="100vh" overflow="hidden">
    <Header />
    <Flex flex={1} position="relative" overflow="hidden" role="main">
      {children}
    </Flex>
  </Flex>
)

export default Search
