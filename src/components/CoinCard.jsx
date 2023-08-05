import React from "react";
import { VStack, Heading, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => {
  return (
    <Link to={`/coins/${id}`} target="blank">
      <VStack
        w={"52"}
        shadow={"lg"}
        borderRadius={"lg"}
        p={"8"}
        transition={"all 0.3s"}
        m={4}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image src={img} w={10} h={10} objectFit={"contain"}></Image>

        <Heading size={"md"} noOfLines={"1"}>
          {symbol}
        </Heading>
        <Text noOfLines={"1"}> {name}</Text>
        <Text noOfLines={"1"}>{`${currencySymbol}${price}`}</Text>
      </VStack>
    </Link>
  );
};

export default CoinCard;
