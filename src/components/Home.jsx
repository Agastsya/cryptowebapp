import React from "react";
import { Text, Box, Image } from "@chakra-ui/react";
import bitcoin from "../assets/bitcoin.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box boxSizing={"border-box"} w={"full"} maxH={"90vh"} bgColor={"black"}>
      <motion.div
        style={{
          height: "75vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          src={bitcoin}
          objectFit={"contain"}
          w={["20rem", "33rem"]}
          h={["20rem", "33rem"]}
          filter={"grayscale(1)"}
          position={"relative"}
          mx={["auto", "auto"]}
        />
      </motion.div>
      <Text
        fontSize={["2xl", "6xl"]}
        color={"white"}
        textAlign={"center"}
        h={["full"]}
        w={["full"]}
        fontFamily={"Roboto Condensed"}
      >
        CRYPTO CRASH
      </Text>
    </Box>
  );
};

export default Home;
