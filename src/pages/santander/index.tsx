import { Box, Button, Flex, SimpleGrid, Text, Image } from "@chakra-ui/react";
import Link from "next/link";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import Head from "next/head";

export default function Nubank() {
  return (
    <Box>
      <Header />
      <Head>
        <title>Santander</title>
      </Head>

      <Flex w="100%" my="6" maxW="1480" mx="auto" px="6">
        <Sidebar />

        <Flex m="auto" flexDirection="column" align="center">
          <Text fontSize="xxx-large" color="red.500">
            Santander
          </Text>

          <SimpleGrid
            minChildWidth="220px"
            maxW="930"
            flex="1"
            gap="4"
            align="flex-start"
            margin="0 auto"
          >
            <Link href="/santander/gustavo" passHref>
              <Flex
                mt="20"
                flexDirection="column"
                border="1px solid #E53E3E"
                borderRadius="2px"
                shadow="0 0 5px #E53E3E"
                minH="300px"
                maxH="300px"
              >
                <Flex minH="200px">
                  <Image
                    src="https://renderapi.s3.amazonaws.com/2bUa5Czrr.png"
                    alt="GustavoImg"
                    objectFit="cover"
                  />
                </Flex>
                <Flex
                  p="2"
                  flexDirection="column"
                  align="center"
                  borderTop="1px solid #E53E3E"
                >
                  <Text>Gustavo</Text>
                  <Button
                    mt="2"
                    colorScheme="orange"
                    size="lg"
                    w="100%"
                    borderRadius="10"
                    opacity="0.8"
                  >
                    Acessar Fatura
                  </Button>
                </Flex>
              </Flex>
            </Link>
            <Link href="/santander/cal" passHref>
              <Flex
                mt="20"
                flexDirection="column"
                border="1px solid #E53E3E"
                borderRadius="2px"
                shadow="0 0 5px #E53E3E"
                minH="300px"
                maxH="300px"
              >
                <Flex minH="200px">
                  <Image
                    src="https://renderapi.s3.amazonaws.com/3YgUnOUUr.png"
                    alt="CalImg"
                    objectFit="cover"
                  />
                </Flex>
                <Flex
                  p="2"
                  flexDirection="column"
                  align="center"
                  borderTop="1px solid #E53E3E"
                >
                  <Text>Cal</Text>
                  <Button
                    mt="2"
                    colorScheme="pink"
                    size="lg"
                    w="100%"
                    borderRadius="10"
                    opacity="0.8"
                  >
                    Acessar Fatura
                  </Button>
                </Flex>
              </Flex>
            </Link>
            <Link href="/santander/cauê" passHref>
              <Flex
                mt="20"
                flexDirection="column"
                border="1px solid #E53E3E"
                borderRadius="2px"
                shadow="0 0 5px #E53E3E"
                minH="300px"
                maxH="300px"
              >
                <Flex minH="200px">
                  <Image
                    src="https://renderapi.s3.amazonaws.com/52sfDgzkn.png"
                    alt="CaueImg"
                    objectFit="cover"
                  />
                </Flex>
                <Flex
                  p="2"
                  flexDirection="column"
                  align="center"
                  borderTop="1px solid #E53E3E"
                >
                  <Text>Cauê</Text>
                  <Button
                    mt="2"
                    colorScheme="blue"
                    size="lg"
                    w="100%"
                    borderRadius="10"
                    opacity="0.8"
                  >
                    Acessar Fatura
                  </Button>
                </Flex>
              </Flex>
            </Link>
            <Link href="/santander/geral" passHref>
              <Flex
                mt="20"
                flexDirection="column"
                border="1px solid #E53E3E"
                borderRadius="2px"
                shadow="0 0 5px #E53E3E"
                minH="300px"
                maxH="300px"
              >
                <Flex minH="200px">
                  <Image
                    src="https://i.imgur.com/ST8GDmG.png"
                    alt="GeralAvatar"
                    objectFit="cover"
                  />
                </Flex>
                <Flex
                  p="2"
                  flexDirection="column"
                  align="center"
                  borderTop="1px solid #E53E3E"
                >
                  <Text>Geral</Text>
                  <Button
                    mt="2"
                    colorScheme="red"
                    size="lg"
                    w="100%"
                    borderRadius="10"
                    opacity="0.8"
                  >
                    Acessar Fatura
                  </Button>
                </Flex>
              </Flex>
            </Link>
          </SimpleGrid>

          <Link href="santander/invoice" passHref>
            <Button mt="20" colorScheme="green" size="lg" p="8" w="100%">
              Faturas Fechadas
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
