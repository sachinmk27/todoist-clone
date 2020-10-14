import React, { Component } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Box,
  Icon,
  Select,
  Switch,
  Divider,
  IconButton,
} from "@chakra-ui/core";
import { Fade, SlideFade } from "@chakra-ui/transition";
import { RiAddLine } from "react-icons/ri";

import COLORS from "../colors.json";

class ProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      name: "",
      color: Object.values(COLORS)[0].value,
      favorite: false,
    };
    this.initialRef = React.createRef();
    this.cancelRef = React.createRef();
  }
  componentDidUpdate(prevProps) {
    if (this.props.edit && prevProps.edit !== this.props.edit) {
      console.log("componentDidUpdate");
      this.setState({
        isOpen: true,
        name: this.props.edit.name,
        color: this.props.edit.color,
        favorite: this.props.edit.favorite,
      });
    }
  }
  onOpen = () => this.setState({ isOpen: true });
  onClose = () => {
    this.setState({
      isOpen: false,
      name: "",
      color: Object.values(COLORS)[0].value,
      favorite: false,
    });
    this.props.onClose();
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSwitchChange = (e) => {
    this.setState({
      favorite: e.target.checked,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, color, favorite } = this.state;
    if (this.props.edit) {
      this.props.onUpdate(this.props.edit.id, {
        name,
        color: parseInt(color),
        favorite,
      });
      this.onClose();
      return;
    }
    this.props.onSubmit({
      name,
      color: parseInt(color),
      favorite,
    });
    this.onClose();
  };
  render() {
    return (
      <>
        {this.props.iconOnly ? (
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              this.onOpen();
            }}
            variant="ghost"
            icon={<Icon as={RiAddLine} boxSize={4} />}
            ml="auto"
            size="sm"
            _focus={{ boxShadow: "none" }}
          />
        ) : (
          <Button
            onClick={this.onOpen}
            variant="ghost"
            px={2}
            _hover={{ color: "red.500" }}
          >
            <Flex align="center">
              <Icon as={RiAddLine} boxSize={4} mr={2} color="red.500"></Icon>
              <Text fontSize="sm" fontWeight="light" color="inherit" mx={1}>
                Add Project
              </Text>
            </Flex>
          </Button>
        )}

        <Fade timeout={300} in={this.state.isOpen}>
          {(styles) => {
            return (
              <Modal
                isOpen={true}
                onClose={this.onClose}
                initialFocusRef={this.initialRef}
                leastDestructiveRef={this.cancelRef}
                isCentered
              >
                <ModalOverlay style={styles}>
                  <SlideFade
                    timeout={150}
                    in={this.state.isOpen}
                    unmountOnExit={false}
                  >
                    {(styles) => {
                      return (
                        <ModalContent style={styles}>
                          <ModalHeader
                            bg="gray.100"
                            display="flex"
                            alignItems="center"
                            py={3}
                          >
                            <Text>Add project</Text>
                          </ModalHeader>

                          <form onSubmit={this.handleSubmit}>
                            <ModalBody pb={2}>
                              <FormControl mb={4}>
                                <FormLabel>
                                  <Text fontSize="sm">Project name</Text>
                                </FormLabel>
                                <Input
                                  name="name"
                                  value={this.state.name}
                                  ref={this.initialRef}
                                  onChange={this.handleChange}
                                  size="sm"
                                />
                              </FormControl>
                              <FormControl my={4}>
                                <FormLabel>
                                  <Text fontSize="sm">Project color</Text>
                                </FormLabel>
                                <Select
                                  name="color"
                                  value={this.state.color}
                                  placeholder="Project color"
                                  onChange={this.handleChange}
                                  size="sm"
                                >
                                  {Object.values(COLORS).map(
                                    ({ value, name, rgb }) => {
                                      return (
                                        <option key={value} value={value}>
                                          {name}
                                        </option>
                                      );
                                    }
                                  )}
                                </Select>
                              </FormControl>
                              <FormControl mb={3}>
                                <FormLabel>
                                  <Text fontSize="sm">Favorite</Text>
                                </FormLabel>
                                <Flex align="center" py={1}>
                                  <Switch
                                    name="favorite"
                                    colorScheme="red"
                                    isChecked={this.state.favorite}
                                    onChange={this.handleSwitchChange}
                                    size="sm"
                                  />
                                  <FormLabel px={2} mb={0}>
                                    <Text fontSize="sm" fontWeight="light">
                                      Add to favorites
                                    </Text>
                                  </FormLabel>
                                </Flex>
                              </FormControl>
                              <Divider />
                            </ModalBody>

                            <ModalFooter>
                              <Button onClick={this.onClose} mr={3} size="sm">
                                Cancel
                              </Button>
                              <Button colorScheme="red" type="submit" size="sm">
                                {this.props.edit ? "Save" : "Add"}
                              </Button>
                            </ModalFooter>
                          </form>
                        </ModalContent>
                      );
                    }}
                  </SlideFade>
                </ModalOverlay>
              </Modal>
            );
          }}
        </Fade>
      </>
    );
  }
}

export default ProjectModal;
