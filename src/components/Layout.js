import React from "react";
import { Box } from "@chakra-ui/core";

const Layout = ({ children }) => {
  return (
    <Box flex="1">
      <Box mx="auto" w={[4 / 5]}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
