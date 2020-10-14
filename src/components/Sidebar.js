import React from "react";
import { Box } from "@chakra-ui/core";

const Sidebar = ({ children }) => {
  return (
    <Box w={[1 / 5]} bg="gray.50" pt={8} pl={8} pb={16} overflowY="scroll">
      {children}
    </Box>
  );
};

export default Sidebar;
