// import Link from '../../elements/Link/Link';
import Text from '../../../elements/Text'
import Box from '../../../elements/Box'
import Flex from '../../../elements/Flex'

export default function ContactLinks({ hit }) {
  if (!hit) return null

  return (
    <Box marginBottom="16px" className="ContactLinks">
      {/* {hit.website && (
        <Flex alignItems="flex-start">
          <Text color="primary" marginRight="4px">
            Website:
          </Text>
          <Link
            href={hit.website}
            rel="noreferrer"
            target="_blank"
            color="primary"
          >
            {hit.website}
          </Link>
        </Flex>
      )} */}

      {/* {hit.email && (
        <Flex alignItems="flex-start">
          <Text color="primary" marginRight="4px">
            Email:
          </Text>
          <Link
            color="primary"
            href={`mailto:${hit.email}?subject=${hit.title}`}
          >
            {hit.email}
          </Link>
        </Flex>
      )} */}

      {/* {hit.phone && (
        <Flex alignItems="flex-start">
          <Text color="primary" marginRight="4px">
            Phone:
          </Text>
          <Link href={`tel:${hit.phone}`} color="primary">
            {hit.phone}
          </Link>
        </Flex>
      )} */}

      {hit.schedule && (
        <Flex alignItems="flex-start">
          <Text color="primary" marginRight="4px">
            Hours:
          </Text>
          <Text
            variant="div"
            color="primary"
            fontWeight={300}
            whiteSpace="pre-line"
            dangerouslySetInnerHTML={{
              __html: hit.schedule?.replaceAll('\\n', '\n')
            }}
          />
        </Flex>
      )}
    </Box>
  )
}
