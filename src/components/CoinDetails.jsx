import {
  Container,
  Box,
  HStack,
  RadioGroup,
  Radio,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { server } from "../index";
import axios from "axios";
import ErrorComponent from "./ErrorComponent";
import CustomBar from "./CustomBar";
import Chart from "./Chart";

const CoinDetails = () => {
  const params = useParams();

  const [coin, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const btns = ["24h", "7d", "14d", "30d", "200d", "1y", "max"];

  // PASSING KEY TO SwitchChartStats
  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(false);
        break;
      case "7d":
        setDays("7d");
        setLoading(false);
        break;
      case "14d":
        setDays("14d");
        setLoading(false);
        break;
      case "30d":
        setDays("30d");
        setLoading(false);
        break;
      case "200d":
        setDays("200d");
        setLoading(false);
        break;
      case "1y":
        setDays("1y");
        setLoading(false);
        break;
      case "max":
        setDays("max");
        setLoading(false);
        break;

      default:
        setDays("24h");
        setLoading(false);
        break;
    }
  };
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€ " : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        console.log(chartData);
        setCoins(data);
        setChartArray(chartData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, params.id, days]);

  if (error) <ErrorComponent message={"Error in fetching coin info"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"} borderWidth={"1"}>
            <Chart
              currency={currencySymbol}
              arr={chartArray.prices}
              days={days}
            />
          </Box>
          <HStack p={"4"} wrap={"wrap"}>
            {btns.map((i) => (
              <Button key={i} onClick={() => switchChartStats(i)}>
                {i}
              </Button>
            ))}
          </HStack>

          {/* BUTTONS THAT WILL CHANGE DATA ACC. TO TIME */}
          <HStack spacing={"4"} my={"4"}>
            <RadioGroup value={currency} onChange={setCurrency}>
              <Radio value="inr" mx={"1"}>
                ₹ INR{" "}
              </Radio>
              <Radio value="eur" mx={"1"}>
                € EUR{" "}
              </Radio>
              <Radio value="usd" mx={"1"}>
                $ USD{" "}
              </Radio>
            </RadioGroup>
          </HStack>
          <VStack spacing={"4"} p={"16"} alignItems={"center"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
              Last Updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}
              </StatHelpText>
            </Stat>
            <Badge fontSize={"2xl"} bgColor={"blackAlpha.700"}>
              #{coin.market_data.market_cap_rank}
            </Badge>
            <CustomBar
              high={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}
              low={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
            />
            <Box w={"full"} p={"4"}>
              <Item
                title={"Max Supply".toUpperCase()}
                value={coin.market_data.max_supply}
              />
              <Item
                title={"Circulating Supply".toUpperCase()}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap".toUpperCase()}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low".toUpperCase()}
                value={`${currencySymbol} ${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High".toUpperCase()}
                value={`${currencySymbol} ${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack w={"full"} my={"4"} justifyContent={"space-between"}>
      <Text fontFamily={"Roboto Condensed"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  );
};

export default CoinDetails;
