import {
  Box,
  Stack,
  Text,
  Link as ChakraLink,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillCreditCard, AiOutlineCreditCard } from "react-icons/ai";
import Link from "next/link";
import firebaseDB from "../services/firebase";
import { useEffect, useState } from "react";

export function Sidebar() {
  const [data, setData] = useState({});
  const [totalGustavo, setTotalGustavo] = useState(0);
  const [totalCal, setTotalCal] = useState(0);
  const [totalCaue, setTotalCaue] = useState(0);

  useEffect(() => {
    firebaseDB.child("nubank_fatura_atual").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  useEffect(() => {
    var totalTempGustavo = 0;
    var totalTempCal = 0;
    var totalTempCaue = 0;

    Object.keys(data).map((id, acc) => {
      if (data[id].person === "Gustavo" && data[id].type === "Gasto") {
        totalTempGustavo = totalTempGustavo + data[id].value;
      } else if (data[id].person === "Cal" && data[id].type === "Gasto") {
        totalTempCal = totalTempCal + data[id].value;
      } else if (data[id].person === "Cauê" && data[id].type === "Gasto") {
        totalTempCaue = totalTempCaue + data[id].value;
      }

      setTotalGustavo(totalTempGustavo);
      setTotalCal(totalTempCal);
      setTotalCaue(totalTempCaue);
    });
  }, [data]);

  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="10" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">
            GERAL
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link href="/dashboard">
              <ChakraLink display="flex" align="center">
                <Icon as={RiDashboardFill} fontSize="20" />
                <Text ml="4" fontWeight="medium">
                  Dashboard
                </Text>
              </ChakraLink>
            </Link>
          </Stack>
        </Box>
        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">
            CARTÕES
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link href="/nubank" passHref>
              <ChakraLink display="flex" align="center">
                <Icon as={AiFillCreditCard} fontSize="20" />
                <Text ml="4" fontWeight="medium">
                  Nubank
                </Text>
              </ChakraLink>
            </Link>
            <Link href="/santander" passHref>
              <ChakraLink display="flex" align="center">
                <Icon as={AiOutlineCreditCard} fontSize="20" />
                <Text ml="4" fontWeight="medium">
                  Santander
                </Text>
              </ChakraLink>
            </Link>
          </Stack>
        </Box>
        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">
            GASTOS
          </Text>
          <Stack spacing="6" mt="6" align="stretch">
            <Flex flexDir="column">
              <Text fontWeight="medium">Gustavo</Text>
              <Box
                color="gray.100"
                borderBottomWidth={2}
                borderColor="gray.700"
                pb={3}
              >
                <Text as="strong" whiteSpace="nowrap">
                  {new Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalGustavo)}
                </Text>
              </Box>
            </Flex>
            <Flex flexDir="column">
              <Text fontWeight="medium">Cal</Text>
              <Box
                color="gray.100"
                borderBottomWidth={2}
                borderColor="gray.700"
                pb={3}
              >
                <Text as="strong" whiteSpace="nowrap">
                  {new Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalCal)}
                </Text>
              </Box>
            </Flex>
            <Flex flexDir="column">
              <Text fontWeight="medium">Cauê</Text>
              <Box
                color="gray.100"
                borderBottomWidth={2}
                borderColor="gray.700"
                pb={3}
              >
                <Text as="strong" whiteSpace="nowrap">
                  {new Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalCaue)}
                </Text>
              </Box>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
