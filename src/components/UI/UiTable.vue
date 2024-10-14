<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3">Name & Email</th>
        <th scope="col" class="px-6 py-3">Category</th>
        <th scope="col" class="px-6 py-3">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for=" item in items" :key="item.id" class="bg-white border-b">
        <td class="px-6 py-4">{{ item.name }}</td>
        <td class="px-6 py-4">{{ item.email }}</td>
        <td class="px-6 py-4">{{ item.category }}</td>
        <td class="px-6 py-4">
          <button @click="emit('edit',item)" class="btn-edit">Edit</button>
          <button @click="emit('delete',item.id)" class="btn-delete">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

const {items} = defineProps({
  items: {
    type: Array,
    default: [],
    required: true
  }
});

const emit = defineEmits(['edit','delete']);
</script>

<style scoped>

.btn-edit {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  margin-right: 0.5rem;
}

.btn-edit:hover {
  background-color: #2563eb;
}

.btn-delete {
  background-color: #ef4444;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.btn-delete:hover {
  background-color: #dc2626;
}
</style>