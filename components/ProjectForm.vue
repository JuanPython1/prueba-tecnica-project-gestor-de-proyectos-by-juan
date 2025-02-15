<template>
  <div class="project-form">
    <div class="form-header">
    <h2 class="form-title">
      {{ isEditMode ? "Editar Proyecto" : "Nuevo Proyecto" }}
    </h2>
  </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <CustomInput
          v-model="form.name"
          label="Nombre del Proyecto"
          placeholder="Ingresar nombre del proyecto"
        />
      </div>

      <div class="form-group">
        <ExecutiveSelector
          v-model:modelValue="form.executive"
          placeholder="Escribe al menos una letra para buscar un ejecutivo..."
        />
      </div>

      <div class="form-group">
        <CustomInput
          v-model="form.client"
          label="Cliente"
          placeholder="Ingresa el usuario"
        />
      </div>
      <div class="form-group">
        <CustomInput
          v-model="form.contact"
          label="Contacto"
          placeholder="Ingresa el contacto"
        />
      </div>
      <div class="form-group">
        <label class="group-label">Tipo de Proyecto</label>
        <div class="type-buttons">
          <button
            type="button"
            :class="{ active: form.type === 'cotizacion' }"
            @click="form.type = 'cotizacion'"
          >
            Cotización
          </button>
          <button
            type="button"
            :class="{ active: form.type === 'negocio' }"
            @click="form.type = 'negocio'"
          >
            Negocio
          </button>
        </div>
      </div>
      <div class="form-actions">
        <button type="button" class="btn cancel" @click="cancel">
          Cancelar
        </button>
        <button type="submit" class="btn submit">
          {{ isEditMode ? "Actualizar" : "Guardar" }}
        </button>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import CustomInput from "~/components/CustomInput.vue";
import ExecutiveSelector from "~/components/ExecutiveSelector.vue";
import { useProjectStore } from "~/stores/projectStore";

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      name: "",
      executive: "",
      client: "",
      contact: "",
      type: "cotizacion",
    }),
  },
});

const router = useRouter();
const projectStore = useProjectStore();

const form = reactive({ ...props.initialData });
const isEditMode = !!props.initialData.id;
const errorMessage = ref("");

const handleSubmit = () => {
  errorMessage.value = "";
  if (!form.name || !form.executive || !form.client || !form.contact) {
    errorMessage.value = "Todos los campos son obligatorios.";
    return;
  }
  if (!form.name || !form.executive) {
    errorMessage.value =
      "El nombre del proyecto y el ejecutivo son obligatorios.";
    return;
  }
  try {
    if (isEditMode) {
      projectStore.updateProject({ ...form });
    } else {
      const newProject = {
        id: Date.now(),
        name: form.name,
        executive: form.executive,
        executiveAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        client: form.client,
        contact: form.contact,
        type: form.type,
      };
      projectStore.addProject(newProject);
    }
    router.push("/");
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const cancel = () => {
  router.push("/");
};
</script>

<style scoped>
.project-form {
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  border: 1px solid #436051;
  border-radius: 8px;
  background-color: #436051;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.form-title {
  margin-top: 16px;
  margin-bottom: 16px;
  justify-content: center;
  font-size: 1.5em;
  color: darkgrey;
}
.form-group {
  margin-bottom: 16px;
}
.group-label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  color: darkgray;
}
.type-buttons {
  display: flex;
  gap: 8px;
}
.type-buttons button {
  flex: 1;
  padding: 8px 16px;
  border: 1px solid #65c478;
  background-color: #fef3c7;
  color: #ea580c;
  cursor: pointer;
  border-radius: 4px;
  font-family: monospace;
}
.type-buttons button.active {
  background-color: #f97316;
  color: #fff;
}
.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: monospace;
}
.btn.submit {
  background-color: #f97316;
  color: #fff;
}
.btn.submit:hover {
  background-color: #ea580c;
}
.btn.cancel {
  background-color: transparent;
  border: 1px solid #f97316;
  color: #f97316;
}
.btn.cancel:hover {
  background-color: #fff3e0;
}
.error-message {
  color: red;
  margin-top: 8px;
}
</style>
