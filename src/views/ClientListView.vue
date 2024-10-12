<template>
  <div>
    <ClientForm v-model="newClient" @submit="addNewClient"/>
    <ClientTable :clients="store.clients" :edit="edit" :deleteClient="deleteClient" />
    <ClientForm v-model="editingClient" @submit="saveEdit"/>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useClientStore} from '@/stores/clientStore';
import ClientTable from '@/components/ClientTable.vue';
import ClientForm from "@/components/ClientForm.vue";

const store = useClientStore();
const categories = computed(() => store.categories);

const newClient = ref({name: '', email: '', category: categories.value[0]});
const editingClient = ref({name: '', email: '', category: categories.value[0]});


function addNewClient() {
  store.addClient({...newClient.value});
  newClient.value = {name: '', email: '', category: categories.value[0]};
}

function edit(client) {
  editingClient.value = {...client};
}

function saveEdit() {
  if (editingClient.value) {
    store.editClient(editingClient.value.id, editingClient.value);
    editingClient.value = {name: '', email: '', category: categories.value[0]};
  }
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