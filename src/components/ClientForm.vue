<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name</label>
      <input type="text" id="name" v-model="form.name" required />
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" required />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
});

function handleSubmit() {
  // Обработка данных формы; здесь можно задействовать store
  console.log(form);
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: 600;
}

button {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>