<template>
    <div class="autocomplete">
      <label class="group-label">Ejecutivo</label>
      <input
        type="text"
        v-model="searchText"
        :placeholder="placeholder"
        @input="handleInput"
      />
      <ul v-if="suggestions.length" class="suggestions">
        <li 
          v-for="item in suggestions" 
          :key="item._id"
          @click="selectItem(item)"
        >
          {{ item.user?.data?.name?.first }} {{ item.user?.data?.name?.last }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Buscar al usuario...'
    }
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const searchText = ref('')
  const suggestions = ref([])
  let debounceTimeout = null
  
  const handleInput = () => {
    emit('update:modelValue', '')
    
    if (debounceTimeout) clearTimeout(debounceTimeout)
    
    if (searchText.value.trim().length < 1) {
      suggestions.value = []
      return
    }
    
    debounceTimeout = setTimeout(() => {
      searchExecutives(searchText.value.trim())
    }, 200)
  }
  
  const searchExecutives = async (name) => {
    try {
      const url = `https://apidev.unabase.cc/app/users/findUsers/ByNames?name=${name}`
      const data = await $fetch(url)
      suggestions.value = data
    } catch (error) {
      console.error('Error al buscar ejecutivos:', error)
      suggestions.value = []
    }
  }
  
  const selectItem = (item) => {
  const fullName = `${item.user?.data?.name?.first || ''} ${item.user?.data?.name?.last || ''}`.trim()
  searchText.value = fullName
  emit('update:modelValue', fullName)
  suggestions.value = []
}
  </script>
  
  <style scoped>
  .autocomplete {
    position: relative;
  }
  
  .autocomplete input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    background-color: beige;
    border-radius: 4px;
  }
  
  .suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
    z-index: 10;
    max-height: 150px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .suggestions li {
    padding: 8px;
    cursor: pointer;
  }
  
  .suggestions li:hover {
    background-color: #f0f0f0;
  }
  
  .group-label {
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
    color: darkgray;
  }
  </style>
  