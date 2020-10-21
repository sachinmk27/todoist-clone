import React from "react";
import { Box } from "@chakra-ui/core";
import { Slide } from "@chakra-ui/transition";

const Sidebar = ({ children, isOpen }) => {
  return (
    <Slide placement="left" timeout={150} in={isOpen}>
      {(styles) => {
        const { transform, transition, willChange } = styles;
        return (
          <Box
            style={{
              transform,
              transition,
              willChange,
            }}
            w={{ base: "100%", sm: "30%", md: "25%" }}
            h={{ base: "100%", md: "auto" }}
            bg="gray.50"
            pt={8}
            pl={{ base: 4, sm: 6, md: 8 }}
            pb={16}
            overflowY="scroll"
            position={{ base: "fixed", md: "static" }}
          >
            {children}
          </Box>
        );
      }}
    </Slide>
  );
};

export default Sidebar;
