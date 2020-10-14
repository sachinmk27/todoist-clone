import React from "react";
import { Flex } from "@chakra-ui/core";

const Header = ({ children }) => {
  return (
    <Flex w={"100%"} as="nav" h="7vh" bg="red.500" px={8} py={4} align="center">
      {children}
    </Flex>
  );
};

export default Header;
