import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from './../pages/auth/login.vue'
import Logout from './../pages/auth/logout.vue'
import NotFound from './../pages/error/notFound.vue'

import HomePage from './../pages/home.vue'
import ChatPage from './../pages/chat.vue'

import MainLayout from './../components/layout/main.vue'

Vue.use(Router);

const router = new Router({
    mode: 'history',

    routes: [
        {
            name: 'login',
            path: '/login',
            component: LoginPage
        }, {
            path: '/',
            meta: { auth: true },
            component: MainLayout,
            children : [
                {
                    path: '',
                    name: 'Home',
                    component: HomePage
                }, {
                    name: 'Chat',
                    path: 'chat',
                    component: ChatPage,
                }
            ]
        }, {
            name: 'logout',
            path: '/logout',
            component: Logout
        }, {
            name: 'NotFound',
            path: '*',
            component: NotFound
        }
    ]
})

router.beforeEach((to, from, next) => {
    if ( to.matched.some(record => record.meta.auth) ) {
        const auth = JSON.parse(localStorage.getItem('auth'))
        if ( auth && auth.access_token ) {
            next();
        } else {
            next({ name: 'login' })
            return ;
        }
    }
    next();
})
export default router;