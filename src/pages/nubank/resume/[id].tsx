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
  Box,
  HStack,
  Select,
} from "@chakra-ui/react";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import Router from "next/router";
import { useEffect, useState, FormEvent } from "react";
import firebaseDB from "../../../services/firebase";
import { toast } from "react-toastify";
import Head from "next/head";

export default function ResumeTransaction() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [alreadyClose, setAlreadyClose] = useState(false);

  const [data, setData] = useState({});

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
    firebaseDB
      .child(`nubank_fatura_fechada_${year}_${month}`)
      .on("value", (snapshot) => {
        if (snapshot.val() === null) {
          setAlreadyClose(false);
        } else {
          setAlreadyClose(true);
        }
      });
  }, [year, month]);

  function handleCreateNewFatura(event: FormEvent) {
    event.preventDefault();

    if (!year) {
      toast.error("Preencha o ano!");
    } else if (!month) {
      toast.error("Preencha o mês!");
    } else {
      if (alreadyClose) {
        toast.error("Essa fatura já foi fechada!");
      } else {
        firebaseDB
          .child(`nubank_fatura_fechada_${year}_${month}`)
          .push(data, (err) => {
            if (err) {
              toast.error(err);
            } else {
              toast.success("Fatura fechada com com sucesso.");
              setAlreadyClose(true);
            }
          });
      }
    }

    return;
  }

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Head>
        <title>dashCard | Fechar Fatura</title>
      </Head>

      <Flex w="100%" my="6" maxW="1480" mx="auto" px="6">
        <Sidebar />

        <Flex
          bg="gray.800"
          justify="center"
          p="6"
          mx="auto"
          align="center"
          flexDir="column"
          mb="6"
        >
          <HStack>
            <Box>
              <label htmlFor="ano">Ano</label>
              <Select
                id="ano"
                placeholder="Selecione o ano"
                focusBorderColor="orange.500"
                color="gray.500"
                bg="gray.900"
                variant="filled"
                _hover={{
                  bgColor: "gray.900",
                }}
                size="lg"
                colorScheme="red"
                onChange={(event) => {
                  setYear(event.target.value);
                }}
              >
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </Select>
            </Box>
            <Box>
              <label htmlFor="Mês">Mês</label>
              <Select
                id="ano"
                placeholder="Selecione o mês"
                focusBorderColor="orange.500"
                color="gray.500"
                bg="gray.900"
                variant="filled"
                _hover={{
                  bgColor: "gray.900",
                }}
                size="lg"
                colorScheme="red"
                onChange={(event) => {
                  setMonth(event.target.value);
                }}
              >
                <option value="Janeiro">Janeiro</option>
                <option value="Fevereiro">Fevereiro</option>
                <option value="Março">Março</option>
                <option value="Abril">Abril</option>
                <option value="Maio">Maio</option>
                <option value="Junho">Junho</option>
                <option value="Julho">Julho</option>
                <option value="Agosto">Agosto</option>
                <option value="Setembro">Setembro</option>
                <option value="Outubro">Outubro</option>
                <option value="Novembro">Novembro</option>
                <option value="Dezembro">Dezembro</option>
              </Select>
            </Box>
          </HStack>

          <HStack spacing="5">
            <Button
              colorScheme="green"
              my="5"
              onClick={handleCreateNewFatura}
              disabled={alreadyClose === true}
            >
              Finalizar fatura
            </Button>

            <Button colorScheme="red" my="5" onClick={() => Router.back()}>
              Cancelar
            </Button>
          </HStack>

          <ChakraTable colorScheme="whiteAlpha" size="sm" variant="unstyled">
            <Thead color="gray.500">
              <Tr>
                <Th>Pessoa</Th>
                <Th>Título</Th>
                <Th>Valor</Th>
                <Th>Nº Vezes</Th>
                <Th>Tipo</Th>
                <Th>Data</Th>
              </Tr>
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
        </Flex>
      </Flex>
    </Flex>
  );
}
