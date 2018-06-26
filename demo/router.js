import Vue from 'vue'
import Router from 'vue-router'

const FirstPage = () => import('./views/first-page');
const ChildPage = () => import('./views/child-page');

Vue.use(Router)

const Children = [{
    path: 'childpage',
    name: 'childpage',
    component: ChildPage
}];

export default new Router({
    routes: [{
        path: '/',
        redirect: '/firstpage',
    }, {
        path: '/firstpage',
        name: 'firstpage',
        component: FirstPage,
        children: Children,
    }],
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
})