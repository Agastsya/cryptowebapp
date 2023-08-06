import React from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <Box bgColor={"black"} p={"4"} py={["5", "8"]}>
      <VStack textAlign={"center"}>
        <Text color={"whiteAlpha.700"}>
          We are the best website for Crypto Trading <br />
          <br />
          Contact Us <br />
          <HStack justifyContent={"center"} py={"4"}>
            <FaInstagram />
            <FaFacebook />
            <FaWhatsapp />
            <FaLinkedin />
          </HStack>
        </Text>
      </VStack>
    </Box>
  );
};

export default Footer;
