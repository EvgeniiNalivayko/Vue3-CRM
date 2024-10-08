<template>
  <div>
    <h2>Client List</h2>
    <form @submit.prevent="addNewClient">
      <input v-model="newClient.name" placeholder="Name" required />
      <input v-model="newClient.email" placeholder="Email" type="email" required />
      <select v-model="newClient.category">
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <button type="submit">Add Client</button>
    </form>

    <ul>
      <li v-for="client in clients" :key="client.id">
        {{ client.name }} - {{ client.email }} - {{ client.category }}
        <button @click="edit(client)">Edit</button>
        <button @click="deleteClient(client.id)">Delete</button>
      </li>
    </ul>

    <!-- Simple Client Edit Form -->
    <div v-if="editingClient">
      <h3>Edit Client</h3>
      <input v-model="editingClient.name" placeholder="Name" required />
      <input v-model="editingClient.email" placeholder="Email" type="email" required />
      <select v-model="editingClient.category">
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <button @click="saveEdit">Save Changes</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useClientStore} from '@/stores/clientStore';

const store = useClientStore();
const clients = ref(store.clients);
const categories = ref(store.categories);

const newClient = ref({name: '', email: '', category: categories.value[0]});
const editingClient = ref(null);

function addNewClient() {
  store.addClient({...newClient.value});
  newClient.value = {name: '', email: '', category: categories.value[0]};
}

function edit(client) {
  editingClient.value = {...client};
}

function saveEdit() {
  store.editClient(editingClient.value.id, editingClient.value);
  editingClient.value = null;
}

function cancelEdit() {
  editingClient.value = null;
}

function deleteClient(id) {
  store.deleteClient(id);
}
</script>

<style scoped>
form {
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
}
</style>