<template>
  <div class="custom-input">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input-field"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
});
</script>

<style scoped>
.custom-input {
  margin-bottom: 16px;
}

.input-label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  color: darkgrey;
}

.input-field {
  padding: 8px;
  border: 1px solid #ccc;
  background-color: beige;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}
</style>
