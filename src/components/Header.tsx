import { Flex, Text, Input, Icon, HStack, Avatar } from "@chakra-ui/react";
import { RiSearch2Line } from "react-icons/ri";

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashCard
        <Text as="span" color="orange.500" ml="1">
          .
        </Text>
      </Text>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxW={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.500"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar no dashCard"
          _placeholder={{ color: "gray.400" }}
        />
        <Icon as={RiSearch2Line} fontSize="20" />
      </Flex>

      <Flex align="center" ml="auto">
        <HStack
          spacing="4"
          mx="4"
          pr="4"
          py="1"
          color="gray.100"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Text>Gustavo Castro</Text>
        </HStack>

        <Flex align="center">
          <Avatar size="md" name="Gustavo Castro" />
        </Flex>
      </Flex>
    </Flex>
  );
}
