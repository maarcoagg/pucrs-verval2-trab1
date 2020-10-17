import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/salas',
    name: 'Salas',
    component: () => import('../views/Salas.vue')
  },
  {
    path: '/medicos',
    name: 'Médicos',
    component: () => import('../views/Medicos.vue')
  },
  {
    path: '/reservas',
    name: 'Reservas',
    component: () => import('../views/Reservas.vue')
  },
  {
    path: '/alocacoes',
    name: 'Alocações',
    component: () => import('../views/Alocacoes.vue')
  },
  {
    path: '/nova-reserva',
    name: 'Nova Reserva',
    component: () => import('../views/NovaReserva.vue')
  },
  {
    path: '/configuracoes',
    name: 'Configurações',
    component: () => import('../views/Configuracoes.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
