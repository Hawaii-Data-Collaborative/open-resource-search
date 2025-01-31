import './FavoriteButton.scss'

import { FavoriteBorder, FavoriteOutlined } from '@mui/icons-material'
import Button from '../../elements/Button'
import { useAppContext, useAuthContext, useFavsContext } from '../../../hooks'

export default function FavoriteButton({ hit }) {
  const { setAppState } = useAppContext()
  const { user } = useAuthContext()
  const { spidMap, addFavorite, deleteFavorite } = useFavsContext()

  const isFav = hit ? spidMap[hit.id] : false

  const onClick = () => {
    if (user) {
      if (isFav) {
        deleteFavorite(hit.id)
      } else {
        addFavorite(hit.id)
      }
    } else {
      setAppState({ modal: 'LOGIN_PROMPT' })
    }
  }

  if (!hit) {
    return null
  }

  return (
    <Button
      className="FavoriteButton"
      noPrint
      noShadows
      aria-label="Remove from Favorites"
      style={{
        background: 'none',
        color: '#666',
        fontSize: 15,
        lineHeight: 1.4,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Open Sans,sans-serif',
        cursor: 'pointer',
        padding: 0,
        fontWeight: 300
        // width: 40,
        // height: 40
      }}
      onClick={onClick}
    >
      {user && isFav ? (
        <FavoriteOutlined className="fav" style={{ color: '#DA291C', width: 25, height: 25 }} />
      ) : (
        <FavoriteBorder className="unfav" style={{ width: 25, height: 25 }} />
      )}
    </Button>
  )
}
