import './Search.scss'

import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import parse from 'autosuggest-highlight/parse'
import { TextField, Select, InputLabel, Grid, Typography, InputAdornment, IconButton, FormControl } from '@mui/material'
import { SearchOutlined, LocationOnOutlined, LocationSearchingOutlined, MyLocationOutlined } from '@mui/icons-material'
import Flex from '../../elements/Flex'
import Button from '../../elements/Button'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { setQuery, setLocation, setDistance, setTaxonomies } from '../../../redux/slices/search'
import { useCachedLocations } from '../../../hooks'
import { StyledAutocomplete } from './Search.styled'
import { getAppConfigValue } from '../../../utils'
import { useSuggestionsQuery } from '../../../hooks'
import { getParentElements } from '../../../utils'

type Props = {
  variant?: 'outlined' | 'standard' | 'filled'
}

function Search({ variant = 'outlined' }: Props) {
  const history = useHistory()
  const query = useAppSelector(state => state.search.query)
  const locationQuery = useAppSelector(state => state.search.location)
  const dispatch = useAppDispatch()
  const [findingLocation, setFindingLocation] = useState(false)
  const taxonomies = useAppSelector(state => state.search.taxonomies)
  const geoSuggestions = useCachedLocations(locationQuery)
  const radius = useAppSelector(state => state.search.radius)
  const suggestions = useSuggestionsQuery()
  const newHits = suggestions

  const onChange = (e, v) => {
    // console.log('[onChange] v=%o e=%o', v, e);
    let text: string, group: string, code: string
    if (!v) {
      text = ''
    } else if (typeof v === 'string') {
      text = v
    } else if (typeof v === 'object') {
      text = v.text
      group = v.group
      code = v.code
    }

    dispatch(setQuery(text))
    if (group === 'Services') {
      dispatch(setTaxonomies(code))
    } else {
      dispatch(setTaxonomies(''))
    }
  }

  function onInputChange(e, v) {
    // console.log('[onInputChange] v=%o e=%o', v, e);
    if (
      e?.type === 'click' &&
      !getParentElements(e.target).some(el => el.classList.contains('MuiAutocomplete-endAdornment'))
    ) {
      // console.log('[onInputChange] defer to onChange');
      return
    }
    // For some reason on enter will send an empty value even if there is an existing value.
    if (e != null && e.key !== 'Enter') {
      dispatch(setQuery(v))
      dispatch(setTaxonomies(''))
    } else if (e != null && e.key === 'Enter' && v?.length > 0) {
      dispatch(setQuery(v))
      dispatch(setTaxonomies(''))
    }
  }

  function updateGeoQuery(e, v) {
    if (e != null) {
      dispatch(setLocation(v))
    }
  }

  function setRadius(e) {
    dispatch(setDistance(e.target.value))
  }

  function convertGeoLocation(position) {
    const lat = position.coords.latitude
    const lng = position.coords.longitude

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false&key=${getAppConfigValue(
        'services.map.google.apiKey'
      )}`,
      {
        method: 'POST'
      }
    )
      .then(res => res.json())
      .then(res => {
        setFindingLocation(false)

        if (res?.results[0]?.formatted_address) {
          dispatch(setLocation(res.results[0].formatted_address))
        }
      })
      .catch(err => {
        console.log(err)
        setFindingLocation(false)
      })
  }

  function getGeoLocation() {
    function error() {
      console.log('Unable to retrieve your location')
    }

    setFindingLocation(true)

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(convertGeoLocation, error)
    }
  }

  function submitSearch(e) {
    e.preventDefault()

    const queryParams: any = {}
    if (query.length > 0) {
      queryParams.terms = query
    }
    if (taxonomies.length > 0) {
      queryParams.taxonomies = taxonomies
    }
    if (locationQuery.length > 0) {
      queryParams.location = locationQuery
    }
    if (radius.length > 0 && radius !== '0') {
      queryParams.radius = radius
    }

    history.push({
      pathname: '/search',
      search: new URLSearchParams(queryParams).toString()
    })
  }

  return (
    <form className="Search" onSubmit={submitSearch}>
      <Flex mb="8px" flexDirection={['column', 'row']}>
        <Flex flex={2} marginRight={[0, '4px']} marginLeft={[0, '4px']} marginBottom={['8px', 0]}>
          <StyledAutocomplete
            id="search-query-field"
            options={newHits}
            freeSolo
            fullWidth
            inputValue={query}
            onInputChange={onInputChange}
            onChange={onChange}
            filterOptions={options => options}
            getOptionLabel={(o: any) => o.title || o.text || o.group || o}
            groupBy={(o: any) => o.group}
            renderInput={params => (
              <TextField {...params} label={getAppConfigValue('search.label')} variant={variant} value={query} />
            )}
          />
        </Flex>
      </Flex>

      <Flex flexDirection={['column', 'row']}>
        <Flex flex={1.7} marginRight={[0, '4px']} marginLeft={[0, '4px']} marginBottom={['8px', '4px']}>
          <StyledAutocomplete
            id="geo-location-field"
            options={geoSuggestions}
            fullWidth
            freeSolo
            getOptionLabel={(option: any) => (typeof option === 'string' ? option : option.description)}
            inputValue={locationQuery}
            onInputChange={updateGeoQuery}
            filterOptions={x => x}
            noOptionsText="No options"
            renderInput={params => (
              <TextField
                {...params}
                label="Zip code, city, or address"
                variant={variant}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={getGeoLocation} aria-label="Find my location">
                          {findingLocation ? <MyLocationOutlined /> : <LocationSearchingOutlined />}
                        </IconButton>
                      </InputAdornment>
                    </>
                  )
                }}
              />
            )}
            renderOption={(option: any) => {
              const matches = option.structured_formatting.main_text_matched_substrings

              const parts = parse(
                option.structured_formatting.main_text,
                matches.map(match => [match.offset, match.offset + match.length])
              )

              return (
                <Grid container alignItems="center">
                  <Grid item>
                    <LocationOnOutlined style={{ marginRight: '8px', marginLeft: '8px' }} />
                  </Grid>
                  <Grid item xs>
                    {parts.map((part, index) => (
                      <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                        {part.text}
                      </span>
                    ))}

                    <Typography variant="body2" color="textPrimary">
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              )
            }}
          />
        </Flex>

        <FormControl className="distance" variant={variant}>
          <InputLabel htmlFor="radius-filter">Distance</InputLabel>
          <Select
            native
            value={radius}
            onChange={setRadius}
            label="Distance"
            inputProps={{
              name: 'radius',
              id: 'radius-filter'
            }}
          >
            <option value="0">Any</option>
            <option value="5">5 Miles</option>
            <option value="10">10 Miles</option>
            <option value="15">15 Miles</option>
            <option value="30">30 Miles</option>
            <option value="45">45 Miles</option>
            <option value="60">60 Miles</option>
          </Select>
        </FormControl>

        <Button
          color="secondary"
          marginLeft={[0, '4px']}
          marginBottom="4px"
          marginRight={[0, '4px']}
          style={{
            position: 'relative',
            zIndex: 8
          }}
          noShadows
        >
          <SearchOutlined style={{ marginRight: '4px' }} />
          Search
        </Button>
      </Flex>
    </form>
  )
}

export default Search
