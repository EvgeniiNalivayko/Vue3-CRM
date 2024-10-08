import { defineStore } from 'pinia';
import { clientsData } from '@/data/clientsData';
import axios from 'axios';

export const useClientStore = defineStore('client', {
    state: () => ({
        clients: JSON.parse(localStorage.getItem('clients')) || clientsData,
        categories: ['VIP', 'Regular', 'New'],
        selectedCategory: '',
        searchQuery: '',
    }),
    actions: {
        addClient(client) {
            client.id = Date.now();
            this.clients.push(client);
            this.saveClientsToLocalStorage();
            this.pushClientToServer(client); // Симуляция отправки на сервер
        },
        editClient(id, updatedClient) {
            const clientIndex = this.clients.findIndex(client => client.id === id);
            if (clientIndex !== -1) {
                this.clients[clientIndex] = { ...this.clients[clientIndex], ...updatedClient };
            }
            this.saveClientsToLocalStorage();
        },
        deleteClient(id) {
            this.clients = this.clients.filter(client => client.id !== id);
            this.saveClientsToLocalStorage();
        },
        selectCategory(category) {
            this.selectedCategory = category;
        },
        setSearchQuery(query) {
            this.searchQuery = query;
        },
        saveClientsToLocalStorage() {
            localStorage.setItem('clients', JSON.stringify(this.clients));
        },
        async fetchClientsFromServer() {
            try {
                const response = await axios.get('https://myServe.com/api/clients');
                this.clients = response.data;
                this.saveClientsToLocalStorage(); // Сохраняем полученные данные в localStorage
            } catch (error) {
                console.error('Error fetching clients from server:', error);
            }
        },
        async pushClientToServer(client) {
            try {
                await axios.post('https://example.com/api/clients', client);
            } catch (error) {
                console.error('Error pushing client to server:', error);
            }
        }
    },
    getters: {
        filteredClients: (state) => {
            return state.clients.filter(client => {
                const matchesCategory = !state.selectedCategory || client.category === state.selectedCategory;
                const matchesSearch = client.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                    client.email.toLowerCase().includes(state.searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });
        }
    }
});