<template>
  <div class="container">
    <ProjectForm v-if="projectData" :initialData="projectData" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProjectForm from "~/components/ProjectForm.vue";
import { useProjectStore } from "./src/stores/projectStore";

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();
const projectId = Number(route.params.id);
const projectData = ref(null);

onMounted(() => {
  const proj = projectStore.getProjectById(projectId);
  if (!proj) {
    router.push("/");
  } else {
    projectData.value = { ...proj };
  }
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}
</style>
