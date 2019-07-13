import Vue from 'vue';
import Router from 'vue-router';
import CompanyList from './views/CompanyList.vue';
import CompanyDetails from './views/CompanyDetails.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import NotFound from './components/NotFound.vue';
import NetworkIssue from './components/NetworkIssue.vue';
import store from './store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'company-list',
      component: CompanyList,
    },
    {
      path: '/companies/:id',
      name: 'company-details',
      component: CompanyDetails,
      props: true,
      beforeEnter(to, from, next) {
        store.dispatch('company/getCompany', to.params.id).then((company) => {
          to.params.company = company;
          console.log(company)
          next();
        }).catch((e) => {
          if (e.response && e.response.status == 404) {
            next({ name: '404', params: { resource: 'company' } });
          } else {
            next({ name: 'network-issue' });
          }
        });
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true,
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue,
      props: true,
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   next();
// });

// router.afterEach(() => {
//   NProgress.done();
// });

export default router;
