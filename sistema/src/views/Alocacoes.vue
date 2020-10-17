<template>
  <v-main>
    <v-card>
      <v-card-title>
        Todas as Alocações
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headersAlocacoes"
          :items="alocacoes"
          :search="pesquisarAlocacoes"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-text-field
              v-model="pesquisarAlocacoes"
              outlined
              label="Pesquisar alocações"
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
  name: 'Alocacoes',
  data: () => ({
    pesquisarAlocacoes: '',
    
    headersAlocacoes: [
      { text: 'Médico', value: 'medico' },
      { text: 'Sala', value: 'sala' },
      { text: 'Data', value: 'data' },
      { text: 'Hora de Início', value: 'inicio' },
      { text: 'Hora de Término', value: 'termino' },
    ],
  }),
  computed: {
    alocacoes: {
      get() {
        return this.$store.getters.alocacoes
      }
    }
  },
}
</script>