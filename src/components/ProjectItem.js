import React from "react";
import { Box, Text, Icon, MenuTransition, Tooltip } from "@chakra-ui/core";
import {
  RiCheckboxBlankCircleFill,
  RiMoreLine,
  RiDeleteBin7Line,
  RiStarLine,
  RiDislikeLine,
  RiEditLine,
  RiInboxFill,
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
    inbox_project: isInboxProject,
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
      {isInboxProject ? (
        <Icon as={RiInboxFill} boxSize={4} color="gray.700"></Icon>
      ) : (
        <Icon
          as={RiCheckboxBlankCircleFill}
          boxSize={4}
          color={COLORS[color].rgb}
        ></Icon>
      )}
      <Text mx={3} color="gray.700" fontSize="sm">
        {name}
      </Text>
      {!isInboxProject && (
        <Menu ml="auto" autoSelect={false} placement="right-start">
          <Tooltip label="More actions">
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
          </Tooltip>
          <MenuTransition>
            {(styles) => {
              return (
                <MenuList sx={styles} py={2}>
                  {favorite ? (
                    <MenuItem py={2} px={3} onClick={handleRemoveFromFavorites}>
                      <Box display="flex" alignItems="center">
                        <Icon
                          boxSize={5}
                          as={RiDislikeLine}
                          color="gray.500"
                        ></Icon>
                        <Text fontSize="sm" px={3} color="gray.700">
                          Remove from favorites
                        </Text>
                      </Box>
                    </MenuItem>
                  ) : (
                    <MenuItem py={2} px={3} onClick={handleAddToFavorites}>
                      <Box display="flex" alignItems="center">
                        <Icon
                          boxSize={5}
                          as={RiStarLine}
                          color="gray.500"
                        ></Icon>
                        <Text fontSize="sm" px={3} color="gray.700">
                          Add to favorites
                        </Text>
                      </Box>
                    </MenuItem>
                  )}
                  <MenuItem py={2} px={3} onClick={handelEdit}>
                    <Box display="flex" alignItems="center">
                      <Icon boxSize={5} as={RiEditLine} color="gray.500"></Icon>
                      <Text fontSize="sm" px={3} color="gray.700">
                        Edit project
                      </Text>
                    </Box>
                  </MenuItem>
                  {onDelete && (
                    <React.Fragment>
                      <MenuDivider />
                      <MenuItem py={2} px={3} onClick={onDelete}>
                        <Box display="flex" alignItems="center">
                          <Icon
                            boxSize={5}
                            as={RiDeleteBin7Line}
                            color="gray.500"
                          ></Icon>
                          <Text fontSize="sm" px={3} color="gray.700">
                            Delete project
                          </Text>
                        </Box>
                      </MenuItem>
                    </React.Fragment>
                  )}
                </MenuList>
              );
            }}
          </MenuTransition>
        </Menu>
      )}
    </Box>
  );
};

export default ProjectItem;
