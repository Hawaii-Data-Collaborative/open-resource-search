import Flex from 'src/components/elements/Flex/Flex'
import Header from 'src/components/modules/Header/Header'
import { Providers } from 'src/components/providers'

type Props = {
  children: React.ReactNode
}

const Search = ({ children }: Props) => (
  <Providers>
    <Flex flexDirection="column" height="100vh" overflow="hidden">
      <Header />

      <Flex flex={1} position="relative" overflow="hidden" role="main">
        {children}
      </Flex>
    </Flex>
  </Providers>
)

export default Search
