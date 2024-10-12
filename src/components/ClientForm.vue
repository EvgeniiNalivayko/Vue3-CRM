<template>
  <div>
    <h3>{{ isEditing ? 'Edit Client' : 'Add New Client' }}</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.email" placeholder="Email" type="email" required />
      <select v-model="form.category">
        <option v-for="category in clientStore.categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <button type="submit">{{ isEditing ? 'Save Changes' : 'Add Client' }}</button>

      <button type="button" @click="handleCancel">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import {defineEmits } from 'vue';
import {useClientStore} from "@/stores/clientStore.js";

const clientStore = useClientStore()

const form = defineModel({ default: {
    name: '',
    email: '',
    category: null,
  } })


const emits = defineEmits(['submit', 'cancel']);
const isEditing = true


function handleSubmit() {
  emits('submit');
}

function handleCancel() {
  emits('cancel');
}
</script>

<style scoped>
form {
  margin-bottom: 1rem;
}
</style>