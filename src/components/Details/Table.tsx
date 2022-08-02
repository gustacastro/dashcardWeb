import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Stack,
  Select,
} from "@chakra-ui/react";
import {
  RiAddLine,
  RiPencilFill,
  RiDeleteBin2Line,
  RiRepeatFill,
  RiBookMarkFill,
} from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Modal from "react-modal";
import { FormEvent, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import firebaseDB from "../../services/firebase";

import { Input } from "../../components/Form/Input";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Table({ nome }) {
  const [isNewTransactionModalOpen, setIsnewTransactionModalOpen] =
    useState(false);
  const [editTransactionModalOpen, setEditTransactionModalOpen] =
    useState(false);
  const [person, setPerson] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [vezes, setVezes] = useState(1);
  const [vezesTotal, setVezesTotal] = useState(1);
  const [type, setType] = useState("Gasto");
  const [date, setDate] = useState("");
  const [data, setData] = useState({});
  const [idTransactionEdit, setIdTransactionEdit] = useState("");

  function handleOpenEditTransactionModal(id) {
    setEditTransactionModalOpen(true);

    setPerson(data[id].person);
    setTitle(data[id].title);
    setValue(data[id].value);
    setVezesTotal(data[id].vezesTotal);
    setVezes(data[id].vezes);
    setType(data[id].type);
    setDate(data[id].date);

    setIdTransactionEdit(id);
  }

  const editTransactionSubmit = (id) => {
    firebaseDB.child(`/nubank_fatura_atual/${id}`).set(
      {
        person,
        title,
        value,
        vezesTotal,
        type,
        date,
        vezes,
      },
      (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Transação editada com sucesso!");
          setEditTransactionModalOpen(false);
        }
      }
    );
  };

  function handleCloseEditTransactionModal() {
    setEditTransactionModalOpen(false);
  }

  function handleOpenNewTransactionModal() {
    setPerson("Gustavo");
    setTitle("");
    setValue(0);
    setVezes(1);
    setVezesTotal(1);
    setType("Gasto");
    setDate("");
    setIsnewTransactionModalOpen(true);
    setType("Gasto");
  }

  function handleCloseNewTransactionModal() {
    setIsnewTransactionModalOpen(false);
  }

  const personToFilter =
    typeof nome === "string"
      ? nome.charAt(0).toUpperCase() + nome.slice(1)
      : "";

  useEffect(() => {
    if (personToFilter === "Geral") {
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
    } else {
      firebaseDB
        .child("nubank_fatura_atual")
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

  const handleDelete = (id) => {
    if (window.confirm("Deletar mesmo essa transação?")) {
      firebaseDB.child(`/nubank_fatura_atual/${id}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          toast.success("Transação deletada com sucesso.");
        }
      });
    }
  };

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    if (!person || !title || !value || !vezesTotal || !type || !date) {
      toast.error("Preencha todos os campos!");
    } else {
      firebaseDB
        .child("nubank_fatura_atual")
        .push(
          { person, title, value, vezesTotal, type, date, vezes: 1 },
          (err) => {
            if (err) {
              toast.error(err);
            } else {
              toast.success("Transação criada com sucesso.");
              setIsnewTransactionModalOpen(false);
            }
          }
        );
    }
  }

  return (
    <Box mt="6" w="100%" maxW="1480" borderRadius="8" bg="gray.800" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Flex
          fontSize="3xl"
          fontWeight="normal"
          as="span"
          align="center"
          textTransform="capitalize"
        >
          {nome} |
          <Text as="span" color="purple.500" ml="2" fontSize="smaller">
            Nubank
          </Text>
        </Flex>

        <HStack spacing={4}>
          <Button
            size="sm"
            fontSize="sm"
            colorScheme="cyan"
            fontStyle="20"
            color="gray.50"
            onClick={handleOpenNewTransactionModal}
            leftIcon={<Icon as={RiAddLine} />}
          >
            Criar Novo
          </Button>
          {personToFilter === "Geral" && (
            <Link href={`resume/${personToFilter}`} passHref>
              <Button
                size="sm"
                fontSize="sm"
                colorScheme="red"
                fontStyle="20"
                leftIcon={<Icon as={IoIosCloseCircleOutline} />}
              >
                Finalizar fatura
              </Button>
            </Link>
          )}

          <Modal
            isOpen={isNewTransactionModalOpen}
            ariaHideApp={false}
            onRequestClose={handleCloseNewTransactionModal}
            style={{
              overlay: {
                backgroundColor: "rgba(26, 32, 44, 0.9)",
              },
              content: {
                position: "absolute",
                background: "#1A202C",
                maxWidth: "450px",
                maxHeight: "550px",
                margin: "auto",
              },
            }}
          >
            <Flex as="form" flexDir="column">
              <Stack spacing="4">
                <Flex justify="space-between" align="center">
                  <Text>Cadastrar transação</Text>
                  <Box as={Button} colorScheme="transparent" size="1xl">
                    <Icon
                      as={AiOutlineClose}
                      fontSize="15"
                      ml="auto"
                      onClick={handleCloseNewTransactionModal}
                    />
                  </Box>
                </Flex>
                <Select
                  defaultValue="Gustavo"
                  placeholder="Selecionar pessoa"
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
                    setPerson(event.target.value);
                  }}
                >
                  <option value="Gustavo">Gustavo</option>
                  <option value="Cal">Cal</option>
                  <option value="Cauê">Cauê</option>
                  <option value="Geral">Geral</option>
                </Select>
                <Input
                  name="title"
                  type="input"
                  placeholder="Título"
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
                <Input
                  name="valor"
                  type="number"
                  placeholder="Valor"
                  onChange={(event) => {
                    setValue(event.target.valueAsNumber);
                  }}
                />
                <Input
                  name="vezesTotal"
                  type="number"
                  placeholder="Nº Vezes"
                  onChange={(event) => {
                    setVezesTotal(event.target.valueAsNumber);
                  }}
                />

                <Box>
                  <HStack spacing="5" justify="center">
                    <Button
                      w="200px"
                      type="button"
                      leftIcon={
                        <Icon
                          as={BsArrowDownCircle}
                          fontSize="2xl"
                          color={type === "Gasto" ? "gray.200" : "red.400"}
                        />
                      }
                      colorScheme="red"
                      size="lg"
                      p="5"
                      background={type === "Gasto" ? "red.500" : "transparent"}
                      border="2px solid #fff"
                      onClick={() => {
                        setType("Gasto");
                      }}
                    >
                      Gasto
                    </Button>

                    <Button
                      w="200px"
                      type="button"
                      leftIcon={
                        <Icon
                          as={BsArrowUpCircle}
                          fontSize="2xl"
                          color={
                            type === "Adiantamento" ? "gray.200" : "green.400"
                          }
                        />
                      }
                      colorScheme="green"
                      size="lg"
                      p="5"
                      background={
                        type === "Adiantamento" ? "green.500" : "transparent"
                      }
                      border="2px solid #fff"
                      onClick={() => {
                        setType("Adiantamento");
                      }}
                    >
                      Entrada
                    </Button>
                  </HStack>
                </Box>

                <Input
                  name="date"
                  type="date"
                  mb="5"
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                />

                <Button
                  size="lg"
                  fontSize="sm"
                  colorScheme="cyan"
                  fontStyle="20"
                  color="gray.50"
                  onClick={handleCreateNewTransaction}
                  leftIcon={<Icon as={RiAddLine} fontSize="2xl" />}
                  w="50%"
                  alignSelf="center"
                >
                  Cadastrar
                </Button>
              </Stack>
            </Flex>
          </Modal>

          <Modal
            isOpen={editTransactionModalOpen}
            ariaHideApp={false}
            onRequestClose={handleCloseEditTransactionModal}
            style={{
              overlay: {
                backgroundColor: "rgba(26, 32, 44, 0.9)",
              },
              content: {
                position: "absolute",
                background: "#1A202C",
                maxWidth: "450px",
                maxHeight: "800px",
                margin: "auto",
              },
            }}
          >
            <Flex as="form" flexDir="column">
              <Stack spacing="4">
                <Flex justify="space-between" align="center">
                  <Text>Cadastrar transação</Text>
                  <Box as={Button} colorScheme="transparent" size="1xl">
                    <Icon
                      as={AiOutlineClose}
                      fontSize="15"
                      ml="auto"
                      onClick={handleCloseEditTransactionModal}
                    />
                  </Box>
                </Flex>
                <Select
                  defaultValue={person}
                  placeholder="Selecionar pessoa"
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
                    setPerson(event.target.value);
                  }}
                >
                  <option value="Gustavo">Gustavo</option>
                  <option value="Cal">Cal</option>
                  <option value="Cauê">Cauê</option>
                  <option value="Geral">Geral</option>
                </Select>
                <Input
                  label="Título"
                  name="title"
                  value={title}
                  type="input"
                  placeholder="Título"
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
                <Input
                  label="Valor"
                  name="valor"
                  value={value}
                  type="number"
                  placeholder="Valor"
                  onChange={(event) => {
                    setValue(event.target.valueAsNumber);
                  }}
                />
                <Input
                  label="Total de vezes"
                  name="vezesTotal"
                  value={vezesTotal}
                  type="number"
                  placeholder="Nº Vezes Total"
                  onChange={(event) => {
                    setVezesTotal(event.target.valueAsNumber);
                  }}
                />

                <Input
                  label="Nº de vezes restantes"
                  name="vezes"
                  value={vezes}
                  type="number"
                  placeholder="Nº Vezes Restantes"
                  onChange={(event) => {
                    setVezes(event.target.valueAsNumber);
                  }}
                />

                <Box>
                  <HStack spacing="5" justify="center">
                    <Button
                      w="200px"
                      type="button"
                      leftIcon={
                        <Icon
                          as={BsArrowDownCircle}
                          fontSize="2xl"
                          color={type === "Gasto" ? "gray.200" : "red.400"}
                        />
                      }
                      colorScheme="red"
                      size="lg"
                      p="5"
                      background={type === "Gasto" ? "red.500" : "transparent"}
                      border="2px solid #fff"
                      onClick={() => {
                        setType("Gasto");
                      }}
                    >
                      Gasto
                    </Button>

                    <Button
                      w="200px"
                      type="button"
                      leftIcon={
                        <Icon
                          as={BsArrowUpCircle}
                          fontSize="2xl"
                          color={
                            type === "Adiantamento" ? "gray.200" : "green.400"
                          }
                        />
                      }
                      colorScheme="green"
                      size="lg"
                      p="5"
                      background={
                        type === "Adiantamento" ? "green.500" : "transparent"
                      }
                      border="2px solid #fff"
                      onClick={() => {
                        setType("Adiantamento");
                      }}
                    >
                      Entrada
                    </Button>
                  </HStack>
                </Box>

                <Input
                  label="Data"
                  value={date}
                  name="date"
                  type="date"
                  mb="5"
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                />

                <Button
                  size="lg"
                  fontSize="sm"
                  colorScheme="cyan"
                  fontStyle="20"
                  color="gray.50"
                  onClick={() => editTransactionSubmit(idTransactionEdit)}
                  leftIcon={
                    <Icon as={RiRepeatFill} fontSize="2xl" color="gray.50" />
                  }
                  w="50%"
                  alignSelf="center"
                >
                  Atualizar
                </Button>
              </Stack>
            </Flex>
          </Modal>
        </HStack>
      </Flex>
      <ChakraTable colorScheme="whiteAlpha" size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th>Pessoa</Th>
            <Th>Título</Th>
            <Th minW="150px">Valor</Th>
            <Th>Nº Vezes</Th>
            <Th>Tipo</Th>
            <Th>Data</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(data).map((id) => {
            return (
              <Tr key={id} whiteSpace="nowrap">
                <Link href={`${data[id].person}`} passHref>
                  <Td cursor="pointer">{data[id].person}</Td>
                </Link>
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
                    data[id].type === "Adiantamento" ? "green.400" : "red.400"
                  }
                >
                  {data[id].type}
                </Td>
                <Td>{data[id].date}</Td>
                <Td>
                  <Button
                    p="3"
                    size="xs"
                    fontSize="sm"
                    fontWeight="normal"
                    colorScheme="orange"
                    opacity="0.9"
                    leftIcon={<Icon as={RiPencilFill} />}
                    onClick={() => handleOpenEditTransactionModal(id)}
                  >
                    Editar
                  </Button>

                  <Button
                    ml="2"
                    size="xs"
                    fontSize="sm"
                    colorScheme="red"
                    opacity="0.9"
                    onClick={() => handleDelete(id)}
                  >
                    <Icon as={RiDeleteBin2Line} />
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
      <Link href={`/resume/${nome}`} passHref>
        <Button
          p="4"
          mt="5"
          size="xs"
          fontSize="sm"
          fontWeight="bold"
          colorScheme="gray"
          opacity="0.9"
          leftIcon={<Icon as={RiBookMarkFill} />}
          onClick={() => ({})}
          color="gray.900"
        >
          Resumo
        </Button>
      </Link>
    </Box>
  );
}
