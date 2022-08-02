import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { ApexOptions } from "apexcharts";

import Head from "next/head";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    foreColor: theme.colors.gray[500],
  },
  colors: [theme.colors.purple[500]],
  grid: {
    show: false,
  },
  // dataLabels: {
  //   enabled: false,
  // },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[500],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2022-01-01T00:00:00.000z",
      "2022-02-01T00:00:00.000z",
      "2022-03-01T00:00:00.000z",
      "2022-04-01T00:00:00.000z",
      "2022-05-01T00:00:00.000z",
      "2022-06-01T00:00:00.000z",
      "2022-07-01T00:00:00.000z",
      "2022-08-01T00:00:00.000z",
      "2022-09-01T00:00:00.000z",
      "2022-10-01T00:00:00.000z",
      "2022-11-01T00:00:00.000z",
      "2022-12-01T00:00:00.000z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const options2: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    foreColor: theme.colors.gray[500],
  },
  colors: [theme.colors.red[500]],
  grid: {
    show: false,
  },
  // dataLabels: {
  //   enabled: false,
  // },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[500],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2022-01-01T00:00:00.000z",
      "2022-02-01T00:00:00.000z",
      "2022-03-01T00:00:00.000z",
      "2022-04-01T00:00:00.000z",
      "2022-05-01T00:00:00.000z",
      "2022-06-01T00:00:00.000z",
      "2022-07-01T00:00:00.000z",
      "2022-08-01T00:00:00.000z",
      "2022-09-01T00:00:00.000z",
      "2022-10-01T00:00:00.000z",
      "2022-11-01T00:00:00.000z",
      "2022-12-01T00:00:00.000z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  { name: "series1", data: [1036.71, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
];

const series2 = [
  { name: "series1", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Head>
        <title>dashCard | Dashboard</title>
      </Head>

      <Flex w="100%" my="6" maxW="1480" mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="10" align="flex-start">
          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Gasto por mês{" "}
              <Text as="span" color="purple.500">
                nubank
              </Text>
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Gasto por mês{" "}
              <Text as="span" color="red.500">
                santander
              </Text>
              <Chart
                options={options2}
                series={series2}
                type="area"
                height={160}
              />
            </Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
