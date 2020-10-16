import React from "react";
import { Box } from "@chakra-ui/core";

const Layout = ({ children }) => {
  return <Box w={[4 / 5]}>{children}</Box>;
};

export default Layout;
