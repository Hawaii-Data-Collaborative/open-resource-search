import Header from 'src/components/modules/Header/Header'
import Footer from 'src/components/modules/Footer/Footer'
import Box from 'src/components/elements/Box/Box'
import { AuthContextProvider } from 'src/components/providers/AuthContextProvider'

type Props = {
  children: React.ReactNode
}

const Default = ({ children }: Props) => (
  <AuthContextProvider>
    <Box maxWidth={1400} margin="0 auto">
      <Header />
      <Box role="main">{children}</Box>
      <Footer />
    </Box>
  </AuthContextProvider>
)

export default Default
