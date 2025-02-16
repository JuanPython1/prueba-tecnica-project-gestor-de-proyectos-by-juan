import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: [],
  }),
  actions: {
    addProject(project) {
      const exists = this.projects.some(
        (p) => p.name.toLowerCase() === project.name.toLowerCase(),
      );
      if (exists) {
        throw new Error("El nombre del proyecto ya existe");
      }
      this.projects.push(project);
    },
    updateProject(project) {
      const index = this.projects.findIndex((p) => p.id === project.id);
      if (index === -1) {
        throw new Error("Proyecto no encontrado");
      }
      const duplicate = this.projects.some(
        (p) =>
          p.id !== project.id &&
          p.name.toLowerCase() === project.name.toLowerCase(),
      );
      if (duplicate) {
        throw new Error("El nombre del proyecto ya existe");
      }
      this.projects[index] = { ...project };
    },
    deleteProject(id) {
      this.projects = this.projects.filter((p) => p.id !== id);
    },
    getProjectById(id) {
      return this.projects.find((p) => p.id === id);
    },
  },
});
