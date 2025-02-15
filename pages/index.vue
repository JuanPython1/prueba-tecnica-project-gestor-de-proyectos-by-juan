<template>
  <div class="container">
    <div class="actions">
      <button class="btn" @click="createProject">Agregar Proyecto</button>
    </div>
    <ProjectTable />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import ProjectTable from "~/components/ProjectTable.vue";

const router = useRouter();
const createProject = () => {
  router.push("/project/new");
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}


.actions {
  text-align: right;
  margin-bottom: 16px;
}
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #f97316;
  color: #fff;
  cursor: pointer;
}
.btn:hover {
  background-color: #ea580c;
}
</style>
