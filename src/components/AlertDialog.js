import React, { Component } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box,
  Divider,
} from "@chakra-ui/core";

class AlertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.cancelRef = React.createRef();
  }

  onOpen = () => this.setState({ isOpen: true });
  onClose = () => {
    this.setState({ isOpen: false });
  };
  onSubmit = () => {
    this.props.onClose();
    this.onClose();
  };
  render() {
    const { trigger, title, body, action } = this.props;
    return (
      <>
        <Box onClick={this.onOpen}>{trigger}</Box>
        <AlertDialog
          isOpen={this.state.isOpen}
          leastDestructiveRef={this.cancelRef}
          onClose={this.onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="md" fontWeight="bold">
                {title}
              </AlertDialogHeader>

              <AlertDialogBody fontSize="sm" mb={2}>
                {body}
              </AlertDialogBody>
              <Divider />
              <AlertDialogFooter>
                <Button ref={this.cancelRef} onClick={this.onClose} size="sm">
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={this.onSubmit}
                  ml={3}
                  size="sm"
                >
                  {action}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  }
}

export default AlertModal;
