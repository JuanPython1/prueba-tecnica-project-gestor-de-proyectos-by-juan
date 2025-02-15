<template>
    <div class="container">
      <ProjectForm :initialData="defaultForm" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
import ProjectForm from '~/components/ProjectForm.vue';
  
  const defaultForm = ref({
    name: '',
    executive: '',
    client: '',
    contact: '',
    type: 'cotizacion'
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 16px;
  }

  
  </style>
  