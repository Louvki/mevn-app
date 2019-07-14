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
      beforeEnter(to, from, next) {
        const companyId = to.params.id;
        if (companyId === 'new') {
          to.params.company = { _id: 'new', name: '', address: '', city: '', country: '', email: '', phone: '' };
          next();
        } else {
          store.dispatch('company/getCompany', to.params.id).then((company) => {
            to.params.company = company
            next();
          }).catch(() => {
            next({ name: '404', params: { resource: 'company' } });
          });
        }
      },
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
