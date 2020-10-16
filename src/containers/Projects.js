import React, { Component } from "react";

import { projectService } from "../services";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }
  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects = async () => {
    const projects = await projectService.getAll();
    this.setState({
      projects,
    });
  };
  deleteProject = async (id) => {
    await projectService.remove(id);
    this.setState({
      projects: this.state.projects.filter((p) => p.id !== id),
    });
  };
  updateProject = async (id, payload) => {
    await projectService.update(id, payload);
    this.setState({
      projects: this.state.projects.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...payload,
          };
        }
        return p;
      }),
    });
  };
  addProject = async (payload) => {
    const newProject = await projectService.create(payload);
    this.setState({
      projects: [...this.state.projects, newProject],
    });
  };

  render() {
    const { projects } = this.state;
    return (
      <React.Fragment>
        {this.props.render({
          projects,
          updateProject: this.updateProject,
          deleteProject: this.deleteProject,
          addProject: this.addProject,
        })}
      </React.Fragment>
    );
  }
}

export default Projects;
