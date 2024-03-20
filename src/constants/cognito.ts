import { getAppConfigValue } from '../utils/getAppConfigValue'

export const COGNITO_CONSTANTS = {
  REGION: getAppConfigValue('services.auth.cognito.region'),
  USER_POOL_ID: getAppConfigValue('services.auth.cognito.userPoolId'),
  CLIENT_ID: getAppConfigValue('services.auth.cognito.clientId')
}
