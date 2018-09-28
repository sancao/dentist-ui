
/* eslint-disable */
// import Vue from 'vue';
// import Router from 'vue-router';

// import HomePage from '../components/home/HomePage'
// import LoginPage from '../components/login/LoginPage'

// Vue.use(Router);

// export const router = new Router({
//   mode: 'history',
//   routes: [
//     { path: '/', component: HomePage },
//     { path: '/login', component: LoginPage },

//     // otherwise redirect to home
//     { path: '*', redirect: '/' }
//   ]
// });

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }

//   next();
// });

import VueRouter from 'vue-router';
// Views
import Dashboard from '../components/dashboard/Dashboard.vue';
import Home from '../components/home/HomePage.vue';
// auth page
import Register from '../components/auth/Register.vue';
import Login from '../components/auth/Login.vue';
// companies
import CompanyCreate from '../components/companies/CompaniesCreate.vue';
import CompanyEdit from '../components/companies/CompaniesEdit.vue';
import CompanyIndex from '../components/companies/CompaniesIndex.vue';
// users
import UserCreate from '../components/users/UsersCreate.vue';
import UserEdit from '../components/users/UsersEdit.vue';
import UserIndex from '../components/users/UsersIndex.vue';

// bệnh nhân
import BenhNhanCreate from '../components/benhnhan/Create.vue';
import BenhNhanEdit from '../components/benhnhan/Edit.vue';
import BenhNhanIndex from '../components/benhnhan/Index.vue';

export const routers = new VueRouter({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },{
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false
        }
    },{
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false
        }
    },{
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            auth: true
        }
    },{
        path: '/company',
        name: 'companies',
        component: CompanyIndex,
        meta: {
            auth: true
        }
    },{
        path: '/edit-company',
        name: 'edit-company',
        component: CompanyEdit,
        meta: {
            auth: true
        }
    },{
        path: '/new-company',
        name: 'new-company',
        component: CompanyCreate,
        meta: {
            auth: true
        }
    },{
        path: '/new-user',
        name: 'new-user',
        component: UserCreate,
        meta: {
            auth: true
        }
    },{
        path: '/edit-user',
        name: 'edit-user',
        component: UserEdit,
        meta: {
            auth: true
        }
    }
    ,{
        path: '/user',
        name: 'users',
        component: UserIndex,
        meta: {
            auth: true
        }
    },{
        path: '/benh-nhan',
        name: 'benh-nhan',
        component: BenhNhanIndex,
        meta: {
            auth: true
        }
    },{
        path: '/new-benh-nhan',
        name: 'new-benh-nhan',
        component: BenhNhanCreate,
        meta: {
            auth: true
        }
    },{
        path: '/edit-benh-nhan',
        name: 'edit-benh-nhan',
        component: BenhNhanEdit,
        meta: {
            auth: true
        }
    }
    ]
});

