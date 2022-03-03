import Vue from 'vue';
import Router from 'vue-router';
import Read from '@/'
import LoginPage from '@/components/LoginPage';
import TodoPage from '@/components/TodoPage';
import TodoList from '@/components/TodoList';
import TodoInput from '@/components/TodoInput';
import TodoFooter from '@/components/TodoFooter';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Read',
            component : Read
        },
        {
            path: '/login',
            name: 'LoginPage',
            component : LoginPage
        },
        {
            path: '/TodoPage',
            name: 'TodoPage',
            component: TodoPage
        },
        {
            path: '/TodoInput',
            name: 'TodoInput',
            component: TodoInput
        },
        {
            path: '/TodoList',
            name: 'TodoList',
            component: TodoList
        },
        {
            path: '/TodoFooter',
            name: 'TodoFooter',
            component: TodoFooter
        },
        
    ]
})