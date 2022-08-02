import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import Resume from "../../components/Details/Resume";
import firebaseDB from "../../services/firebase";

import { FiDollarSign } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiShareForward2Fill } from "react-icons/ri";
import Table from "../../components/Details/TableSantander";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Head from "next/head";

export default function Invoice() {
  const [data, setData] = useState({});
  const [total, setTotal] = useState(0);
  const [adiantamentoTotal, setAdiantamentoTotal] = useState(0);
  const [restante, setRestante] = useState(0);
  const route = useRouter();

  const { id } = route.query;

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
    <Box>
      <Header />

      <Head>
        <title>{personToFilter} | Santander</title>
      </Head>

      <Flex w="100%" my="6" maxW="1480" mx="auto" px="6">
        <Sidebar />

        <Box margin="0 auto" flex="1">
          <SimpleGrid
            maxW="750"
            minChildWidth="220px"
            flex="1"
            gap="4"
            align="flex-start"
            margin="0 auto"
          >
            <Resume
              name="Total"
              number={String(
                new Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)
              )}
              icon={FiDollarSign}
              iconColor="orange.400"
            />
            <Resume
              name="Adiantado"
              number={String(
                new Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL",
                }).format(adiantamentoTotal)
              )}
              icon={RiShareForward2Fill}
              iconColor="green.400"
            />
            <Resume
              name="Restante"
              number={String(
                new Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL",
                }).format(restante)
              )}
              icon={FaMoneyBillWave}
              iconColor="grey.500"
              bg="red.500"
              color="grey.50"
            />
          </SimpleGrid>

          <Table nome={id} />
        </Box>
      </Flex>
    </Box>
  );
}
