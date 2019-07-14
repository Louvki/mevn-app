import Vue from 'vue';
import Router from 'vue-router';
import CompanyList from './views/CompanyList.vue';
import CompanyDetails from './views/CompanyDetails.vue';
import NotFound from './views/NotFound.vue';
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
      path: '/company/:id',
      name: 'company-details',
      component: CompanyDetails,
      props: true,
      async beforeEnter(to, from, next) {
        try {
          const companyId = to.params.id;
          const company = companyId === 'new'
            ? await store.dispatch('company/getNewCompany')
            : await store.dispatch('company/getCompany', to.params.id)

          to.params.company = company;
          next();
        } catch {
          next({ name: '404', params: { resource: 'company' } });
        }
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true,
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } },
    },
  ],
});


export default router;
