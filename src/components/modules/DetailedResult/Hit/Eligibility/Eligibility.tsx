import Skeleton from 'react-loading-skeleton';
import Text from 'src/components/elements/Text/Text';
import Box from 'src/components/elements/Box/Box';

export default function Eligibility({ hit }) {
  return (
    <Box marginTop="32px">
      <Text variant="h2" color="primary">
        Eligibility
      </Text>
      <Text color="textSecondary">
        {!hit && <Skeleton count={3} />}

        {hit && hit.eligibility}
      </Text>
    </Box>
  );
}
