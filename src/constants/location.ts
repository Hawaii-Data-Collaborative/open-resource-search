import { getAppConfigValue } from '../utils/getAppConfigValue'

export const LOCATION_CONSTANTS = {
  CENTER_LAT: getAppConfigValue('services.map.center.lat'),
  CENTER_LON: getAppConfigValue('services.map.center.lon')
}
