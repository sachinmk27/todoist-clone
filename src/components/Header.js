import React from "react";
import { Flex } from "@chakra-ui/core";

const Header = ({ children }) => {
  return (
    <Flex
      w={"100%"}
      as="nav"
      bg="red.500"
      px={{ base: 4, sm: 6, md: "1.75rem" }}
      py={2}
      align="center"
    >
      {children}
    </Flex>
  );
};

export default Header;
