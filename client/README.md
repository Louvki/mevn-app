# Depenedencies
    "axios": "^0.19.0",             ---- Used to make calls to the backend
    "core-js": "^2.6.5",
    "vue": "^2.6.10",
    "vue-router": "^3.0.7",         ---- Used to implement client side navigation
    "vuetify": "^1.5.5",            ---- Used for building quick and consistent UI.
    "vuex": "^3.1.1"                ---- Used for state management


# Project structure
    - public
      - favicon.ico   
      - index.hml   
    - src
      - components
        - BeneficialOwnerList.vue
        - CompanyForm.vue
        - CompanyInvite.vue
        - LoginPopup.vue
        - NavBar.vue
        - RegisterPopup
      - plugins
        - vuetify.js                ---- Configuration file for vuetify
      - services                    ---- Services which use axios to connect to the backend. The methods are called from the store.
        - company.service.js
        - login.service.js
        - register.service.js
      - store                       ---- Veux stores.
        - modules
          - auth-store.js           ---- Holds the state for wether the user is logged in. Also responsible for the register login and logout actions.
          - company-store.js        ---- Holds all state related to companies. Handles company related actions
        - store.js                  ---- Entry point for all the stores
      - views
        - CompanyDetails.vue
        - CompanyList.vue
        - NotFound.vue
      - App.vue                     ---- Parent component
      - main.js                     ---- Handles bootstrapping vue along with the store and the router
      - router.js                   ---- Handles the routing for the application
    - .dockerignore
    - .gitignore
    - babel.config.js   
    - Dockerfile                    ---- Docker configuration
    - package-lock.json
    - package.json  
    - README.md
    - vue.config.js                 ---- Configuration for the output folder when building. Configuration for the proxy to the dev server