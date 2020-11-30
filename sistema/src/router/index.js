import Vue from "vue";
import VueRouter from "vue-router";
import Medicos from "../views/Medicos.vue";
import Salas from "../views/Salas.vue";
import Reservas from "../views/Reservas.vue";
import Alocacoes from "../views/Alocacoes.vue";
import NovaReserva from "../views/NovaReserva.vue";
import Configuracoes from "../views/Configuracoes.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/medicos",
  },
  {
    path: "/salas",
    name: "Salas",
    component: Salas,
  },
  {
    path: "/medicos",
    name: "Médicos",
    component: Medicos,
  },
  {
    path: "/reservas",
    name: "Reservas",
    component: Reservas,
  },
  {
    path: "/alocacoes",
    name: "Alocações",
    component: Alocacoes,
  },
  {
    path: "/nova-reserva",
    name: "Nova Reserva",
    component: NovaReserva,
  },
  {
    path: "/configuracoes",
    name: "Configurações",
    component: Configuracoes,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
