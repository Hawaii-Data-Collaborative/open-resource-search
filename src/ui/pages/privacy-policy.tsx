import { usePageLoaded, useTitle, useMeta } from '../../hooks'
import { getAppConfigValue } from '../../utils/getAppConfigValue'
import { Box, Link, Text } from '../elements'
import { t } from '../../labels'

export default function PrivacyPolicy() {
  usePageLoaded()
  useTitle(`${getAppConfigValue('brandName')} | ${t('Privacy Policy')}`)
  useMeta({ name: 'description', content: getAppConfigValue('meta.description') })

  return (
    <Box>
      <Box maxWidth={960} margin="8px auto" background="#fff" padding="16px">
        <Text variant="h1" color="textSecondary" paragraph>
          {t('Privacy Policy')}
        </Text>

        <Text color="textSecondary" paragraph>
          {t(
            'This web app collects certain information from users of the app. All data collected is completely anonymous, unless you expressly give us permission to store it (as in the case of registering for an account).'
          )}
        </Text>

        <Text variant="title" color="textSecondary" paragraph marginTop="16px">
          {t('What data we collect')}
        </Text>
        <Text color="textSecondary" paragraph>
          {t(
            'We collect anonymized browsing data such as keywords being searched for, and which resource get viewed the most.'
          )}
        </Text>
        <Text color="textSecondary" paragraph>
          {t('We do')} <strong>{t('not')}</strong>{' '}
          {t("connect this data to personally identifiable information. It's collected and stored anonymously.")}
        </Text>
        <Text color="textSecondary" paragraph>
          {t(
            'In the case of visitors who register a user account, we also store information (such as email and username), provided voluntarily, in a secure database for purpose of letting you save resources in a list.'
          )}
        </Text>

        <Text variant="title" color="textSecondary" paragraph marginTop="16px">
          {t('Why we collect data')}
        </Text>
        <Text color="textSecondary" paragraph>
          {t('User accounts are, of course, collected so that you can save settings and resources for later access.')}
        </Text>
        <Text color="textSecondary" paragraph>
          {t(
            'Anonymous tracking data is stored so that we can improve the user experience, and determine how effective our tools are.'
          )}
        </Text>

        <Text variant="title" color="textSecondary" paragraph marginTop="16px">
          {t('How we collect data')}
        </Text>
        <Text color="textSecondary" paragraph>
          {t('Data is collected one of two ways:')}
        </Text>
        <ol>
          <li>
            <Text color="textSecondary">{t('Anonymously using Google Analytics tracking scripts.')}</Text>
          </li>
          <li>
            <Text color="textSecondary">{t('Through form fields that are filled out voluntarily by viewers.')}</Text>
          </li>
        </ol>

        <Text variant="title" color="textSecondary" paragraph marginTop="16px">
          {t('Who we share your data with')}
        </Text>
        <Text color="textSecondary" paragraph>
          {t(
            'Data is stored in a few third party servers, such as Google Analytics, and on databases hosted in places like Amazon. These are basic services that are required to run this app. We cannot operate without them. They adhere to strict industry policies of security and privacy. They will not share your data without our permission, and we will not share it without'
          )}{' '}
          <strong>{t('your')}</strong> {t('consent.')}
        </Text>
        <Text color="textSecondary" paragraph>
          {t('We')} <strong>{t('never')}</strong>{' '}
          {t('share identifiable data with third parties without your express consent.')}
        </Text>

        <Text variant="title" color="textSecondary" paragraph marginTop="16px">
          {t('How to have your data removed')}
        </Text>
        <Text color="textSecondary" paragraph>
          {t('If you would like us to remove your user account, please email')} {getAppConfigValue('contactEmail')}{' '}
          {t('from the email you used to sign up, asking us to remove your account.')}
        </Text>

        <Text variant="title" color="textSecondary" paragraph marginTop="16px">
          {t('Additional questions')}
        </Text>
        <Text color="textSecondary" paragraph>
          {t(
            'If you have any other questions about what data we collect, or what we do with it, please direct questions to:'
          )}
          <Link
            color="primary"
            to={`mailto:${getAppConfigValue('contactEmail')}?subject=Questions%20about%20Privacy%20Policy`}
          >
            {getAppConfigValue('contactEmail')}
          </Link>
          .
        </Text>
      </Box>
    </Box>
  )
}
