import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import ContactComponent from './pages/ContactComponent.vue';
import AboutComponent from './pages/AboutComponent.vue';
import ShowComponent from './pages/ShowComponent.vue';
import ResultComponent from './pages/ResultComponent.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactComponent,
        },        
        {
            path: '/about',
            name: 'about',
            component: AboutComponent,
        },
        {
            path: '/apartments/:slug', //* da modificare con id per richiamare il dettaglio // 
            name: 'apartment',
            component: ShowComponent,
        },
        {
            path: '/results',
            name: 'results',
            component: ResultComponent,
        }
        // {
        //     path: '/http://127.0.0.1.8000/login',
        //     name: 'login',
        // },
        // {
        //     path: '/http://127.0.0.1.8000/register',
        //     name: 'register',
        // },
    ]
});
export { router };