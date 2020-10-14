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
    this.state = {};
  }

  render() {
    return (
      <Flex direction="column" h={["100vh"]}>
        <Header>
          <Icon as={RiHome4Line} boxSize={6} color="white"></Icon>
        </Header>
        <Flex flex="1" maxH="93vh">
          <Sidebar>
            <Accordion defaultIndex={[0]} allowMultiple allowToggle>
              <Projects
                render={({
                  projects,
                  deleteProject,
                  updateProject,
                  addProject,
                  setEditProject,
                  editProject,
                }) => {
                  return (
                    <React.Fragment>
                      <Stack mb={2}>
                        {projects
                          .filter((p) => p.name === "Inbox" || p.favorite)
                          .map((project) => {
                            return (
                              <ProjectItem
                                key={project.id}
                                {...project}
                                onDelete={() => deleteProject(project.id)}
                                onUpdate={updateProject}
                                onSelect={setEditProject}
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
                                _focus={{ boxShadow: "none" }}
                              >
                                {/* <AccordionIcon /> */}
                                {isExpanded ? (
                                  <Icon boxSize={4} as={RiArrowDownSLine} />
                                ) : (
                                  <Icon boxSize={4} as={RiArrowRightSLine} />
                                )}
                                <Box flex="1" textAlign="left" mx={2}>
                                  <Text>Projects</Text>
                                </Box>
                              </AccordionButton>
                              <AccordionPanel pb={4} px={0}>
                                <React.Fragment>
                                  <Stack mb={2}>
                                    {projects
                                      .filter((p) => p.name !== "Inbox")
                                      .map((project) => {
                                        return (
                                          <ProjectItem
                                            key={project.id}
                                            {...project}
                                            onDelete={() =>
                                              deleteProject(project.id)
                                            }
                                            onUpdate={updateProject}
                                            onSelect={setEditProject}
                                          />
                                        );
                                      })}
                                  </Stack>
                                  <ProjectModal
                                    onSubmit={addProject}
                                    edit={editProject}
                                    onUpdate={updateProject}
                                    onClose={() => setEditProject()}
                                  />
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
                        <Box flex="1" textAlign="left" mx={2}>
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
                        <Box flex="1" textAlign="left" mx={2}>
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
