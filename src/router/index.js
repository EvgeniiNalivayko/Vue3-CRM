import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ClientListView from '@/views/ClientListView.vue';
import ClientEditView from '@/views/ClientEditView.vue';
import UserSettingsView from '@/views/UserSettingsView.vue';

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/clients', name: 'Clients', component: ClientListView },
    { path: '/clients/edit/:id', name: 'EditClient', component: ClientEditView },
    { path: '/settings', name: 'Settings', component: UserSettingsView },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;