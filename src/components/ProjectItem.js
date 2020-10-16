import React from "react";
import { Box, Text, Icon, MenuTransition } from "@chakra-ui/core";
import {
  RiCheckboxBlankCircleFill,
  RiMoreLine,
  RiDeleteBinLine,
  RiStarLine,
  RiDislikeLine,
  RiEditLine,
} from "react-icons/ri";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  //   MenuGroup,
  MenuDivider,
  //   MenuOptionGroup,
  //   MenuItemOption,
} from "@chakra-ui/core";

import COLORS from "../colors.json";

const ProjectItem = (props) => {
  const {
    name,
    color,
    onUpdate,
    id: projectId,
    favorite,
    onDelete,
    onEdit,
    onSelect,
    isActive,
  } = props;
  const handleAddToFavorites = () => {
    onUpdate(projectId, {
      favorite: true,
    });
  };
  const handleRemoveFromFavorites = () => {
    onUpdate(projectId, {
      favorite: false,
    });
  };
  const handelEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      cursor="pointer"
      _hover={{ bg: "white" }}
      p={2}
      pr={4}
      role="group"
      onClick={onSelect}
      bg={isActive ? "white" : "transparent"}
    >
      <Icon
        as={RiCheckboxBlankCircleFill}
        boxSize={4}
        color={COLORS[color].rgb}
      ></Icon>
      <Text mx={3} color="gray.700" fontSize="sm">
        {name}
      </Text>
      <Menu ml="auto" autoSelect={false} placement="right-start">
        <MenuButton
          bg="none"
          ml="auto"
          onClick={(e) => e.stopPropagation()}
          visibility="hidden"
          _groupHover={{
            visibility: "visible",
          }}
          _hover={{
            bg: "none",
          }}
        >
          <RiMoreLine />
        </MenuButton>
        <MenuTransition>
          {(styles) => {
            return (
              <MenuList sx={styles}>
                {favorite ? (
                  <MenuItem p={2} onClick={handleRemoveFromFavorites}>
                    <Box display="flex" alignItems="center">
                      <Icon
                        boxSize={4}
                        as={RiDislikeLine}
                        color="gray.500"
                      ></Icon>
                      <Text fontSize="sm" px={3} color="gray.700">
                        Remove from favorites
                      </Text>
                    </Box>
                  </MenuItem>
                ) : (
                  <MenuItem p={2} onClick={handleAddToFavorites}>
                    <Box display="flex" alignItems="center">
                      <Icon boxSize={4} as={RiStarLine} color="gray.500"></Icon>
                      <Text fontSize="sm" px={3} color="gray.700">
                        Add to favorites
                      </Text>
                    </Box>
                  </MenuItem>
                )}
                <MenuItem p={2} onClick={handelEdit}>
                  <Box display="flex" alignItems="center">
                    <Icon boxSize={4} as={RiEditLine} color="gray.500"></Icon>
                    <Text fontSize="sm" px={3} color="gray.700">
                      Edit project
                    </Text>
                  </Box>
                </MenuItem>
                <MenuDivider />
                <MenuItem p={2} onClick={onDelete}>
                  <Box display="flex" alignItems="center">
                    <Icon
                      boxSize={4}
                      as={RiDeleteBinLine}
                      color="gray.500"
                    ></Icon>
                    <Text fontSize="sm" px={3} color="gray.700">
                      Delete project
                    </Text>
                  </Box>
                </MenuItem>
              </MenuList>
            );
          }}
        </MenuTransition>
      </Menu>
    </Box>
  );
};

export default ProjectItem;
