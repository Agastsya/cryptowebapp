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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { server } from "../index";
import axios from "axios";
import ErrorComponent from "./ErrorComponent";
import CustomBar from "./CustomBar";

const CoinDetails = () => {
  const params = useParams();

  const [coin, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€ " : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        setCoins(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, params.id]);

  if (error) <ErrorComponent message={"Error in fetching coin info"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"} borderWidth={"1"}></Box>

          {/* BUTTONS THAT WILL CHANGE DATA ACC. TO TIME */}
          <HStack spacing={"4"} my={"4"}>
            <RadioGroup value={currency} onChange={setCurrency}>
              <Radio value="inr" mx={"1"}>
                {currencySymbol} INR{" "}
              </Radio>
              <Radio value="eur" mx={"1"}>
                {currencySymbol} EUR{" "}
              </Radio>
              <Radio value="usd" mx={"1"}>
                {currencySymbol} USD{" "}
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
