import Vue from 'vue'
import Vuex from 'vuex'
import { format } from "date-fns";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    salas: [
      {
        nome: 'Alfa',
        tipo: 'Pequena'
      },
      {
        nome: 'Beta',
        tipo: 'Grande'
      },
      {
        nome: 'Gama',
        tipo: 'Alto-risco'
      },
      {
        nome: 'Delta',
        tipo: 'Pequena'
      },
      {
        nome: 'Épsilon',
        tipo: 'Grande'
      },
      {
        nome: 'Zeta',
        tipo: 'Pequena'
      },
      {
        nome: 'Teta',
        tipo: 'Alto-risco'
      },
      {
        nome: 'Lambda',
        tipo: 'Grande'
      },
      {
        nome: 'Sigma',
        tipo: 'Pequena'
      },
      {
        nome: 'Ômega',
        tipo: 'Pequena'
      }
    ],
    medicos: [
      {
        nome: 'João Marcos da Silva',
        crm: '3668032',
        especialidade: 'Pediatria'
      },
      {
        nome: 'Marcos Rocha',
        crm: '8042896',
        especialidade: 'Dermatologia'
      },
      {
        nome: 'Rodrigo Muniz',
        crm: '9060560',
        especialidade: 'Neurologia'
      },
      {
        nome: 'Guilherme Santos',
        crm: '6923658',
        especialidade: 'Cirurgia Cardiovascular'
      },
      {
        nome: 'Diogo Barbosa',
        crm: '8781163',
        especialidade: 'Geriatria'
      }
    ],
    reservas: [
      {
        sala: 'Alfa',
        tipo: 'Pequena',
        medico: 'João Marcos da Silva',
        crm: '3668032',
        especialidade: 'Pediatria',
        data: '2020-10-05',
        inicio: '14:00',
        termino: '16:00'
      },
      {
        sala: 'Beta',
        tipo: 'Grande',
        medico: 'Marcos Rocha',
        crm: '8042896',
        especialidade: 'Dermatologia',
        data: '2020-11-15',
        inicio: '16:00',
        termino: '18:00'
      }
    ]
  },
  getters: {
    salas: state => {
      return state.salas
    },
    medicos: state => {
      return state.medicos
    },
    especialidades: state => {
      return state.medicos.map(m => m.especialidade).filter(distinct)
    },
    alocacoes: state => {
      const data = format(new Date(), 'yyyy-MM-dd')
      const hora = format(new Date(), 'hh:mm')
      return state.reservas.filter(reserva => reserva.data <= data && reserva.inicio < hora)
    },
    reservas: state => {
      const data = format(new Date(), 'yyyy-MM-dd')
      const hora = format(new Date(), 'hh:mm')
      return state.reservas.filter(reserva => reserva.data >= data && reserva.inicio > hora)
    },
  },
  mutations: {
    adicionarReserva(state, novaReserva) {
      state.reservas.push(novaReserva)
    }
  },
  actions: {
  },
  modules: {
  }
})

function distinct(value, index, self) {
  return self.indexOf(value) === index;
}
