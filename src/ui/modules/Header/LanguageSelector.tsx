import { useState } from 'react'
import { Menu, MenuItem, IconButton, Box } from '@mui/material'
import { HawaiianFlag } from './HawaiianFlag'

const languages = [
  { code: 'haw', name: 'ʻŌlelo Hawaiʻi', flag: <HawaiianFlag /> },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'tl', name: 'Filipino', flag: '🇵🇭' }
]

function changeLanguage(language: string) {
  localStorage.setItem('lang', language)
  window.location.reload()
}

export function LanguageSelector() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(localStorage.getItem('lang') ?? 'en')
  const selectedLanguage = languages.find(language => language.code === selectedLanguageCode)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageSelect = (language: (typeof languages)[0]) => {
    setSelectedLanguageCode(language.code)
    handleClose()
    changeLanguage(language.code)
  }

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="large"
        aria-label="select language"
        aria-controls="language-menu"
        aria-haspopup="true"
        sx={{ width: '35px', height: '35px' }}
      >
        <span style={{ fontSize: '1.1rem' }}>{selectedLanguage.flag}</span>
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {languages.map(language => (
          <MenuItem
            key={language.code}
            selected={language.code === selectedLanguage.code}
            onClick={() => handleLanguageSelect(language)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span style={{ fontSize: '1.1rem' }}>{language.flag}</span>
              <span>{language.name}</span>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
