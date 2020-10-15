import Vue from 'vue'
import Vuex from 'vuex'

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
        data: '',
        inicio: '',
        termino: ''
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
