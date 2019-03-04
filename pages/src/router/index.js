import Vue from 'vue';
import Router from 'vue-router';
import index from '@/pages/index';
import release from '../components/release.vue'

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index,
        },
        {
            path: '/release',
            component: release,
        }
    ],
    linkActiveClass: 'van-tabbar-item--active' //覆盖默认的路由高亮的类
});