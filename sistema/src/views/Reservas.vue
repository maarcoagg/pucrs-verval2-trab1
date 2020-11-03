<template>
  <v-main>
    <v-card>
      <v-card-title>
        Todas as Reservas
        <v-spacer></v-spacer>
        <v-btn color="primary" to="/nova-reserva">
          Nova Reserva
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headersReservas"
          :items="reservas"
          :search="pesquisarReservas"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-text-field
              v-model="pesquisarReservas"
              outlined
              label="Pesquisar reservas"
              class="mx-4 pt-4"
            ></v-text-field>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
export default {
  name: 'Reservas',
  data: () => ({
    pesquisarReservas: '',
    
    headersReservas: [
      { text: 'Médico', value: 'medico' },
      { text: 'Sala', value: 'sala' },
      { text: 'Data', value: 'data' },
      { text: 'Hora de Início', value: 'inicio' },
      { text: 'Hora de Término', value: 'termino' },
    ],
  }),
  computed: {
    reservas: {
      get() {
        return this.$store.getters.reservas
      }
    },
  },
}
</script>