import Vue from 'vue';
import Router from 'vue-router';
import Read from '@/'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Read',
            component : Read
        },
    ]
})