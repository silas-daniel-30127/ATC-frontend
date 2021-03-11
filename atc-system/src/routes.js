import login from './components/login.vue'
import atc from './components/atc.vue'
import airport from './components/airport.vue'

export default [
    { path: '/login', component: login },
    { path: '/atc', component: atc },
    { path: '/', component: airport }
]