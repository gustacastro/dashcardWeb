import {
  Flex,
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import firebaseDB from "../../services/firebase";
import { RiArrowGoBackFill } from "react-icons/ri";
import Head from "next/head";

export default function ResumeTransaction() {
  const [total, setTotal] = useState(0);
  const [adiantamentoTotal, setAdiantamentoTotal] = useState(0);
  const [restante, setRestante] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState({});

  const personToFilter =
    typeof id === "string" ? id.charAt(0).toUpperCase() + id.slice(1) : "";

  useEffect(() => {
    if (personToFilter === "Geral") {
      firebaseDB.child("santander_fatura_atual").on("value", (snapshot) => {
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
    } else {
      firebaseDB
        .child("santander_fatura_atual")
        .orderByChild("person")
        .equalTo(personToFilter)
        .on("value", (snapshot) => {
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
    }
  }, [personToFilter]);

  useEffect(() => {
    var totalTemp = 0;
    var totalAdiantamentoTemp = 0;

    Object.keys(data).map((idA, acc) => {
      if (data[idA].type === "Gasto") {
        totalTemp = totalTemp + data[idA].value;
      }

      setTotal(totalTemp);
    });

    Object.keys(data).map((idA, acc) => {
      if (data[idA].type === "Adiantamento") {
        totalAdiantamentoTemp = totalAdiantamentoTemp + data[idA].value;
      }

      setAdiantamentoTotal(totalAdiantamentoTemp);
    });

    setRestante(total - adiantamentoTotal);
  }, [data, adiantamentoTotal, total]);

  return (
    <Flex direction="column" h="100vh">
      <Head>
        <title>{personToFilter} | Resumo</title>
      </Head>

      <Flex w="100%" my="6" maxW="1480" mx="auto" px="6">
        <Flex bg="gray.800" justify="center" p="6" mx="auto" flexDir="column">
          <Flex justify="space-between" p="4">
            <Text>
              Total:{" "}
              {new Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(total)}
            </Text>
            <Text>
              Adiantamento:{" "}
              {new Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(adiantamentoTotal)}
            </Text>
            <Text>
              Restante:{" "}
              {new Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(restante)}
            </Text>
          </Flex>

          <ChakraTable colorScheme="whiteAlpha" size="sm" variant="unstyled">
            <Thead color="gray.500">
              <Th>Pessoa</Th>
              <Th>Título</Th>
              <Th>Valor</Th>
              <Th>Nº Vezes</Th>
              <Th>Tipo</Th>
              <Th>Data</Th>
            </Thead>
            <Tbody>
              {Object.keys(data).map((id, index) => {
                return (
                  <Tr key={id} whiteSpace="nowrap">
                    <Td>{data[id].person}</Td>
                    <Td>{data[id].title}</Td>
                    <Td>
                      {String(
                        new Intl.NumberFormat("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        }).format(data[id].value)
                      )}
                    </Td>
                    <Td>
                      {data[id].vezes} x {data[id].vezesTotal}
                    </Td>
                    <Td
                      color={
                        data[id].type === "Adiantamento"
                          ? "green.400"
                          : "red.400"
                      }
                    >
                      {data[id].type}
                    </Td>
                    <Td>{data[id].date}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </ChakraTable>
          <Button
            mt="4"
            onClick={() => Router.back()}
            p="2"
            px="4"
            colorScheme="gray"
            size="small"
            fontWeight="normal"
            fontSize="sm"
            color="gray.600"
            opacity="0.8"
            mx="auto"
            leftIcon={<Icon as={RiArrowGoBackFill}></Icon>}
          >
            Voltar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
