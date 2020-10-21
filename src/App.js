import React, { Component } from "react";
import { Flex, Box, Text, Stack, Icon, IconButton } from "@chakra-ui/core";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/core";

import {
  RiHome4Line,
  RiArrowRightSLine,
  RiArrowDownSLine,
  RiMenuLine,
} from "react-icons/ri";

import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";
import Projects from "./containers/Projects";
import Header from "./components/Header";
import ProjectItem from "./components/ProjectItem";
import ProjectModal from "./components/ProjectModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeProjectID: null,
      isFromFavorites: false,
      isEditing: false,
      showSidebar: true,
    };
  }

  setActiveProject = (id, isFromFavorites = false) => {
    this.setState({
      activeProjectID: id,
      isFromFavorites,
      isEditing: false,
    });
  };

  handleEditProject = (id, isFromFavorites = false) => {
    console.log(id, isFromFavorites);
    this.setState({
      activeProjectID: id,
      isEditing: true,
      isFromFavorites,
    });
  };

  handleToggleSidebar = () => {
    this.setState((prevState) => {
      return {
        showSidebar: !prevState.showSidebar,
      };
    });
  };

  render() {
    return (
      <Flex direction="column" h={["100vh"]}>
        <Header>
          <IconButton
            h={8}
            variant="unstyled"
            _focus={{
              boxShadow: "none",
            }}
            _hover={{
              bg: "red.600",
            }}
            onClick={this.handleToggleSidebar}
            icon={<Icon as={RiMenuLine} color="white"></Icon>}
          />
          <IconButton
            h={8}
            variant="unstyled"
            _focus={{
              boxShadow: "none",
            }}
            _hover={{
              bg: "red.600",
            }}
            mx={2}
            icon={<Icon as={RiHome4Line} color="white"></Icon>}
          />
        </Header>
        <Flex flex="1">
          <Projects
            render={({
              projects,
              deleteProject,
              updateProject,
              addProject,
            }) => {
              return (
                <Sidebar
                  isOpen={this.state.showSidebar}
                  onClose={this.handleToggleSidebar}
                >
                  <Accordion defaultIndex={[0]} allowMultiple allowToggle>
                    <React.Fragment>
                      <Stack mb={2} spacing={0}>
                        {projects
                          .filter((p) => p.inbox_project || p.favorite)
                          .map((project) => {
                            return (
                              <ProjectItem
                                key={project.id}
                                {...project}
                                // onDelete={() => deleteProject(project.id)}
                                onUpdate={updateProject}
                                onEdit={() =>
                                  this.handleEditProject(project.id, true)
                                }
                                onSelect={() =>
                                  this.setActiveProject(project.id, true)
                                }
                                isActive={
                                  this.state.isFromFavorites &&
                                  this.state.activeProjectID === project.id
                                }
                              />
                            );
                          })}
                      </Stack>
                      <AccordionItem>
                        {({ isExpanded }) => {
                          return (
                            <React.Fragment>
                              <AccordionButton
                                px={2}
                                as={Box}
                                _hover={{ cursor: "pointer", bg: "gray.100" }}
                                _focus={{ boxShadow: "none" }}
                              >
                                {/* <AccordionIcon /> */}
                                {isExpanded ? (
                                  <Icon boxSize={4} as={RiArrowDownSLine} />
                                ) : (
                                  <Icon boxSize={4} as={RiArrowRightSLine} />
                                )}
                                <Box flex="1" textAlign="left" mx={3}>
                                  <Text>Projects</Text>
                                </Box>

                                <ProjectModal
                                  iconOnly
                                  isEditing={this.state.isEditing}
                                  project={projects.find(
                                    (p) => p.id === this.state.activeProjectID
                                  )}
                                  onUpdate={updateProject}
                                  onAdd={addProject}
                                  onClose={() => this.setActiveProject(null)}
                                />
                              </AccordionButton>
                              <AccordionPanel pb={4} px={0}>
                                <React.Fragment>
                                  <Stack mb={2} spacing={0}>
                                    {projects
                                      .filter((p) => !p.inbox_project)
                                      .map((project) => {
                                        return (
                                          <ProjectItem
                                            key={project.id}
                                            {...project}
                                            onDelete={() =>
                                              deleteProject(project.id)
                                            }
                                            onUpdate={updateProject}
                                            onEdit={() =>
                                              this.handleEditProject(project.id)
                                            }
                                            onSelect={() =>
                                              this.setActiveProject(project.id)
                                            }
                                            isActive={
                                              !this.state.isFromFavorites &&
                                              this.state.activeProjectID ===
                                                project.id
                                            }
                                          />
                                        );
                                      })}
                                  </Stack>
                                  <ProjectModal onAdd={addProject} />
                                </React.Fragment>
                              </AccordionPanel>
                            </React.Fragment>
                          );
                        }}
                      </AccordionItem>
                      <AccordionItem>
                        {({ isExpanded }) => {
                          return (
                            <React.Fragment>
                              <AccordionButton
                                px={2}
                                _focus={{ boxShadow: "none" }}
                              >
                                {/* <AccordionIcon /> */}
                                {isExpanded ? (
                                  <Icon boxSize={4} as={RiArrowDownSLine} />
                                ) : (
                                  <Icon boxSize={4} as={RiArrowRightSLine} />
                                )}
                                <Box flex="1" textAlign="left" mx={3}>
                                  <Text>Labels</Text>
                                </Box>
                              </AccordionButton>
                              <AccordionPanel pb={4} px={0}></AccordionPanel>
                            </React.Fragment>
                          );
                        }}
                      </AccordionItem>
                      <AccordionItem>
                        {({ isExpanded }) => {
                          return (
                            <React.Fragment>
                              <AccordionButton
                                px={2}
                                _focus={{ boxShadow: "none" }}
                              >
                                {/* <AccordionIcon /> */}
                                {isExpanded ? (
                                  <Icon boxSize={4} as={RiArrowDownSLine} />
                                ) : (
                                  <Icon boxSize={4} as={RiArrowRightSLine} />
                                )}
                                <Box flex="1" textAlign="left" mx={3}>
                                  <Text>Filters</Text>
                                </Box>
                              </AccordionButton>
                              <AccordionPanel pb={4} px={0}></AccordionPanel>
                            </React.Fragment>
                          );
                        }}
                      </AccordionItem>
                    </React.Fragment>
                  </Accordion>
                </Sidebar>
              );
            }}
          />
          <Layout isFull={!this.state.showSidebar}></Layout>
        </Flex>
      </Flex>
    );
  }
}

export default App;
