import React from "react";
import { Text, Box, Image, VStack } from "@chakra-ui/react";
import bitcoin from "../assets/bitcoin.png";

const Home = () => {
  return (
    <div>
      <Box w={"full"} h={"85vh"} bgColor={"black"}>
        <VStack>
          <Image
            src={bitcoin}
            objectFit={"contain"}
            w={"33rem"}
            h={"33rem"}
            filter={"grayscale(1)"}
          />
          <Text
            fontSize={"6xl"}
            color={"white"}
            textAlign={"center"}
            h={"full"}
            w={"full"}
            fontFamily={"Roboto Condensed"}
          >
            CRYPTO CRASH
          </Text>
        </VStack>
      </Box>
    </div>
  );
};

export default Home;
