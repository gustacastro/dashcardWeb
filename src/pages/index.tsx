import { Flex, Button, Stack, Text } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { Input } from "../components/Form/Input";

import { toast } from "react-toastify";

export default function Home() {
  const [userText, setUserText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const router = useRouter();

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    if (!userText || !passwordText) {
      toast.error("Preencha todos os campos!");
    } else if (userText === "gustavo.castro" && passwordText === "cabelo00") {
      event.preventDefault();

      router.push("/dashboard");
    } else {
      toast.error("Senha ou usuário incorreto!");
    }
  };

  return (
    <Flex h="100vh" align="center" justify="center">
      <Head>
        <title>dashCard | Início</title>
      </Head>
      <Flex flexDir="column" align="center">
        <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" my="4">
          dashCard
          <Text as="span" color="orange.500" ml="1">
            .
          </Text>
        </Text>
        <Flex
          as="form"
          w="100%"
          maxW={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
        >
          <Stack spacing={4}>
            <Input
              name="email"
              type="input"
              label="E-mail"
              onChange={(event) => setUserText(event.target.value)}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              onChange={(event) => setPasswordText(event.target.value)}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="orange"
            size="lg"
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
