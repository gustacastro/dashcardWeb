import { Box, Flex, Icon, Text } from "@chakra-ui/react";

interface ResumeProps {
  name: string;
  number: string;
  icon?: any;
  iconColor?: string;
  bg?: string;
  color?: string;
}

export default function Resume({
  name,
  number,
  icon,
  iconColor,
  bg,
  color,
}: ResumeProps) {
  return (
    <Flex
      flexDir="column"
      bg={!bg ? "gray.50" : bg}
      maxW="220px"
      maxH="100px"
      align="center"
      justify="center"
      p="4"
      borderRadius="10"
      color={!color ? "gray.700" : color}
    >
      <Flex w="100%" align="center" mb="3">
        <Text as="strong" fontSize="1xl">
          {name}
        </Text>
        <Icon as={icon} fontSize="25" ml="auto" color={iconColor} />
      </Flex>
      <Box w="100%">
        <Flex align="center" w="100%">
          <Text as="strong" fontSize="2xl">
            {number}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
