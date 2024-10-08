<template>
  <div>
    <h2>User Settings</h2>

    <div>
      <h3>Filter Clients by Category</h3>
      <select v-model="store.selectedCategory" @change="filterClients">
        <option value="">All</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div>
      <h3>Search Clients</h3>
      <input v-model="store.searchQuery" placeholder="Search by name or email" @input="searchClients" />
    </div>

    <div>
      <h3>Filtered Clients</h3>
      <ul>
        <li v-for="client in filteredClients" :key="client.id">
          {{ client.name }} - {{ client.email }} - {{ client.category }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useClientStore } from '@/stores/clientStore';

const store = useClientStore();
const categories = store.categories;

function filterClients() {
  store.selectCategory(store.selectedCategory);
}

function searchClients() {
  store.setSearchQuery(store.searchQuery);
}

const filteredClients = computed(() => store.filteredClients);
</script>

<style scoped>
h3 {
  margin-top: 1rem;
}

ul {
  list-style-type: none;
}

select, input {
  margin-bottom: 1rem;
}
</style>