import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import { Button, Container, HStack, RadioGroup, Radio } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€ " : "$";
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  const btns = new Array(132).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);
  if (error)
    return (
      <ErrorComponent message={"This is an error caused by fetching coins"} />
    );

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack spacing={"4"}>
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
          <HStack wrap={"wrap"}>
            {coins.map((i) => (
              <CoinCard
                key={i.id}
                id={i.id}
                name={i.name}
                symbol={i.symbol}
                img={i.image}
                price={i.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                color={"white"}
                bgColor={"blackAlpha.900"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
