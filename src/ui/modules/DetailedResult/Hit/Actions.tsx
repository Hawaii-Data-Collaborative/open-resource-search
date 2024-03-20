import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../elements/Button'
import Flex from '../../../elements/Flex'
import { sessionStorage } from '../../../../services'
import { link } from '../../../../utils'

export default function Actions({ setShare }) {
  const history = useHistory()
  const [buttonType, setButtonType] = useState<'BACK' | 'HOME' | null>(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const prevPath = sessionStorage.get('prevPath')
    const currentPath = sessionStorage.get('currentPath')

    if (prevPath != null && prevPath.length > 0 && prevPath !== currentPath) {
      setButtonType('BACK')
      setShowButton(true)
    } else {
      setButtonType('HOME')
      setShowButton(true)
    }
  }, [])

  function goBack() {
    history.goBack()
  }

  function goHome() {
    history.push(link('/'))
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" marginBottom="16px">
      {showButton && buttonType === 'BACK' && (
        <Button onClick={goBack} noPrint color="primary">
          Go Back
        </Button>
      )}

      {showButton && buttonType === 'HOME' && (
        <Button onClick={goHome} noPrint color="primary">
          Back to Search
        </Button>
      )}

      <Button noPrint color="primary" onClick={() => setShare(true)}>
        Print &amp; Share
      </Button>
    </Flex>
  )
}
