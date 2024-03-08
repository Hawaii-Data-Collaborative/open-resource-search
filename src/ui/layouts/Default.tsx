import Header from '../modules/Header/Header'
import Footer from '../modules/Footer/Footer'
import Box from '../elements/Box'

type Props = {
  children: React.ReactNode
}

const Default = ({ children }: Props) => (
  <Box maxWidth={1400} margin="0 auto">
    <Header />
    <Box role="main">{children}</Box>
    <Footer />
  </Box>
)

export default Default
