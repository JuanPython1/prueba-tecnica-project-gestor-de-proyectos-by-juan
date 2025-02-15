<template>
  <div class="project-table">
    <div class="table-header">
      <h2 class="table-title">Proyectos</h2>
    </div>
    <div v-if="projects.length === 0" class="no-projects">
      <p>Aún no tienes proyectos añadidos.</p>
    </div>
    <table v-else class="project-list">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Ejecutivo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td class="name-cell">{{ project.name }}</td>
          <td class="executive-cell">
            <img :src="project.executiveAvatar" alt="Avatar" class="avatar" />
            <p class="name-cell">{{ project.executive }}</p>
          </td>
          <td>
            <button class="btn" @click="editProject(project)">Editar</button>
            <button class="btn" @click="confirmDelete(project)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useProjectStore } from "~/stores/projectStore";

const router = useRouter();
const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

const editProject = (project) => {
  router.push(`/project/${project.id}`);
};

const confirmDelete = (project) => {
  if (
    window.confirm(`¿Está seguro de eliminar el proyecto "${project.name}"?`)
  ) {
    projectStore.deleteProject(project.id);
  }
};
</script>

<style scoped>
.project-table {
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  border-radius: 8px;
  background-color: #436051;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.table-title {
  margin-bottom: 20px;
  font-size: 1.5em;
  color: darkgrey;
}

.no-projects {
  text-align: center;
  margin: 20px 0;
  font-size: 1.2em;
  color: darkgrey;
}

.name-cell {
  font-weight: bold;
  color: darkgrey;
}

.project-list {
  width: 100%;
  border-collapse: collapse;
}
.project-list th,
.project-list td {
  padding: 8px;
  text-align: left;
}
.project-list thead {
  background-color: #3c6c4a;
  color: darkgrey;
}

.executive-cell {
  display: flex;
  align-items: center;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 8px;
}
.btn {
  padding: 4px 8px;
  margin: 0 4px;
  border: none;
  border-radius: 4px;
  background-color: #3c6c4a;
  color: #fff;
  cursor: pointer;
  font-family: monospace;
}
.btn:hover {
  background-color: #5baa88;
}
</style>
