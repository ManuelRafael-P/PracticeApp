require('./bootstrap');



import Vue from 'vue';
import VueRouter from 'vue-router';
import { Form, HasError, AlertError } from 'vform';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar';
import Swal from 'sweetalert2';
import Gate from './Gate';

window.Swal = Swal;
window.Vue = require('vue');
window.Form = Form;
window.Fire = new Vue();

Vue.use(VueRouter);

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
Vue.component('not-found', require('./components/NotFoundComponent.vue').default);
Vue.component('access-denied', require('./components/AccessDeniedComponent.vue').default);
Vue.component('pagination', require('laravel-vue-pagination'));

Vue.prototype.$gate = new Gate(window.user);

Vue.filter('upText', function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
});
Vue.filter('myDate', function(date) {
    return moment(date).format('MMMM Do YYYY');
});
Vue.use(VueProgressBar, {
    color: 'rgb(143,255,199)',
    failedColor: 'red',
    height: '2px'
});


const routes = [{
        path: '/dashboard',
        component: require('./components/DashboardComponent.vue').default
    },
    {
        path: '/profile',
        component: require('./components/ProfileUserComponent.vue').default
    },
    {
        path: '/users',
        component: require('./components/UsersComponent.vue').default
    },
    {
        path: '*',
        component: require('./components/NotFoundComponent.vue').default
    }

];

const router = new VueRouter({
    routes // short for `routes: routes`
});


const app = new Vue({
    el: '#app',
    router,
    data: {
        search: ''
    },
    methods: {
        searchit() {
            // Fire.$emit('searching');
            console.log("searching");
        }
    }
});


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

window.Toast = Toast;