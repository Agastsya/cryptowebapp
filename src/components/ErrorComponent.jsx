import React from "react";
import { Alert, AlertIcon, VStack } from "@chakra-ui/react";

const ErrorComponent = ({ message }) => {
  return (
    <VStack>
      <Alert
        position={"fixed"}
        bottom={"4"}
        status={"error"}
        w={"container.lg"}
      >
        <AlertIcon />
        {message}
      </Alert>
    </VStack>
  );
};

export default ErrorComponent;
