import React from "react";
import { VStack, Image, Heading, Text } from "@chakra-ui/react";

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target="blank">
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
          {rank}
        </Heading>
        <Text> {name}</Text>
      </VStack>
    </a>
  );
};

export default ExchangeCard;
