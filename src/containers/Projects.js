import React, { Component } from "react";

import { projectService } from "../services";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      currentProject: null,
      isEditing: false,
    };
  }
  componentDidMount() {
    this.fetchProjects();
  }

  setCurrentProject = (id, fromFavorites) => {
    if (id) {
      this.setState({
        currentProject: this.state.projects.find((p) => p.id === id),
        fromFavorites,
      });
    } else {
      this.setState({
        currentProject: null,
        isEditing: false,
        fromFavorites: false,
      });
    }
  };
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

  editProject = (id) => {
    this.setState({
      currentProject: this.state.projects.find((p) => p.id === id),
      isEditing: true,
    });
  };
  render() {
    const { projects, currentProject, isEditing, fromFavorites } = this.state;
    return (
      <React.Fragment>
        {this.props.render({
          projects,
          currentProject,
          isEditing,
          fromFavorites,
          updateProject: this.updateProject,
          deleteProject: this.deleteProject,
          addProject: this.addProject,
          setCurrentProject: this.setCurrentProject,
          editProject: this.editProject,
        })}
      </React.Fragment>
    );
  }
}

export default Projects;
