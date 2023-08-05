import React from "react";
import { HStack, Progress, VStack, Badge, Text } from "@chakra-ui/react";

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={"50"} colorScheme="teal" w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme="red"></Badge>
        <Text>24H</Text>
        <Badge children={high} colorScheme="green"></Badge>
      </HStack>
    </VStack>
  );
};

export default CustomBar;
