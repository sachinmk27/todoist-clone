import React, { Component } from "react";
import { Flex, Box, Text, Stack, Icon } from "@chakra-ui/core";
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

  render() {
    return (
      <Flex direction="column" h={["100vh"]}>
        <Header>
          <Box>
            <Icon as={RiHome4Line} boxSize={6} color="white"></Icon>
          </Box>
        </Header>
        <Flex flex="1" maxH="94vh">
          <Sidebar>
            <Accordion defaultIndex={[0]} allowMultiple allowToggle>
              <Projects
                render={({
                  projects,
                  deleteProject,
                  updateProject,
                  addProject,
                  // setCurrentProject,
                  // currentProject,
                  // isEditing,
                  // editProject,
                  // fromFavorites,
                }) => {
                  return (
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
                    </React.Fragment>
                  );
                }}
              />
              <AccordionItem>
                {({ isExpanded }) => {
                  return (
                    <React.Fragment>
                      <AccordionButton px={2} _focus={{ boxShadow: "none" }}>
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
                      <AccordionButton px={2} _focus={{ boxShadow: "none" }}>
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
            </Accordion>
          </Sidebar>
          <Layout>
            <Text>Main content</Text>
          </Layout>
        </Flex>
      </Flex>
    );
  }
}

export default App;
