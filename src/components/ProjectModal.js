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
} from "@chakra-ui/core";
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
        <Button onClick={this.onOpen} variant="ghost" px={2}>
          <Flex align="center">
            <Icon as={RiAddLine} boxSize={4} mr={2}></Icon>
            <Text fontSize="sm" fontWeight="light">
              Add Project
            </Text>
          </Flex>
        </Button>

        <Modal
          initialFocusRef={this.initialRef}
          isOpen={this.state.isOpen}
          onClose={this.onClose}
        >
          <ModalOverlay>
            <ModalContent>
              <ModalHeader bg="gray.100" display="flex" alignItems="center">
                <Text>Add project</Text>
              </ModalHeader>

              <form onSubmit={this.handleSubmit}>
                <ModalBody pb={2}>
                  <FormControl mb={4}>
                    <FormLabel>Project name</FormLabel>
                    <Input
                      name="name"
                      value={this.state.name}
                      ref={this.initialRef}
                      onChange={this.handleChange}
                    />
                  </FormControl>
                  <FormControl my={4}>
                    <FormLabel>Project color</FormLabel>
                    <Select
                      name="color"
                      value={this.state.color}
                      placeholder="Project color"
                      onChange={this.handleChange}
                    >
                      {Object.values(COLORS).map(({ value, name, rgb }) => {
                        return (
                          <option key={value} value={value}>
                            {name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Favorite</FormLabel>
                    <Flex align="center" py={1}>
                      <Switch
                        name="favorite"
                        colorScheme="red"
                        isChecked={this.state.favorite}
                        onChange={this.handleSwitchChange}
                      />
                      <FormLabel px={2}>
                        <Text fontSize="sm" fontWeight="light">
                          Add to favorites
                        </Text>
                      </FormLabel>
                    </Flex>
                  </FormControl>
                  <Divider />
                </ModalBody>

                <ModalFooter>
                  <Button onClick={this.onClose} mr={3}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" type="submit">
                    {this.props.edit ? "Save" : "Add"}
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </>
    );
  }
}

export default ProjectModal;
