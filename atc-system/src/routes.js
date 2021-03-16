import login from './components/login.vue'
import atc from './components/atc.vue'
import airport from './components/airport.vue'
import register from './components/register.vue'

export default [
    { path: '/login', component: login },
    { path: '/atc', component: atc },
    { path: '/', component: airport },
    { path: '/register', component: register }
]
