import React, { Component } from "react";
import { Box, Text, IconButton, Icon } from "@chakra-ui/core";
import {
  RiCheckboxBlankCircleLine,
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

class ProjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  handleMouseEnter = () => {
    this.setState({
      active: true,
    });
  };
  handleMouseLeave = () => {
    this.setState({
      active: false,
    });
  };
  handleAddToFavorites = () => {
    this.props.onUpdate(this.props.id, {
      favorite: true,
    });
  };
  handleRemoveFromFavorites = () => {
    this.props.onUpdate(this.props.id, {
      favorite: false,
    });
  };
  render() {
    const { name, color } = this.props;
    return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        cursor="pointer"
        _hover={{ bg: "white" }}
        p={2}
        pr={4}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Icon as={RiCheckboxBlankCircleLine} color={COLORS[color].rgb}></Icon>
        <Text pl={2} color="gray.700" fontSize="sm" fontWeight="light">
          {name}
        </Text>
        <Menu ml="auto" autoSelect={false} placement="right-start">
          <MenuButton
            bg="none"
            ml="auto"
            onClick={(e) => e.stopPropagation()}
            visibility={this.state.active ? "visible" : "hidden"}
            _hover={{
              bg: "none",
            }}
          >
            <RiMoreLine />
          </MenuButton>
          <MenuList>
            {this.props.favorite ? (
              <MenuItem p={2} onClick={this.handleRemoveFromFavorites}>
                <Box display="flex" alignItems="center">
                  <Icon boxSize={4} as={RiDislikeLine} color="gray.700"></Icon>
                  <Text fontSize="xs" px={2} color="gray.700">
                    Remove from favorites
                  </Text>
                </Box>
              </MenuItem>
            ) : (
              <MenuItem p={2} onClick={this.handleAddToFavorites}>
                <Box display="flex" alignItems="center">
                  <Icon boxSize={4} as={RiStarLine} color="gray.700"></Icon>
                  <Text fontSize="xs" px={2} color="gray.700">
                    Add to favorites
                  </Text>
                </Box>
              </MenuItem>
            )}
            <MenuItem p={2} onClick={() => this.props.onSelect(this.props.id)}>
              <Box display="flex" alignItems="center">
                <Icon boxSize={4} as={RiEditLine} color="gray.700"></Icon>
                <Text fontSize="xs" px={2} color="gray.700">
                  Edit project
                </Text>
              </Box>
            </MenuItem>
            <MenuDivider />
            <MenuItem p={2} onClick={this.props.onDelete}>
              <Box display="flex" alignItems="center">
                <Icon boxSize={4} as={RiDeleteBinLine} color="gray.700"></Icon>
                <Text fontSize="xs" px={2} color="gray.700">
                  Delete project
                </Text>
              </Box>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    );
  }
}

export default ProjectItem;
