<template>
  <v-main>
    <v-card>
      <v-card-title>
        Todas as Salas de Cirurgia
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="salas"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              outlined
              label="Pesquisar salas"
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
  name: 'Salas',
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Nome',
        align: 'start',
        value: 'nome',
      },
      { text: 'Tipo', value: 'tipo' },
    ],
  }),
  computed: {
    salas: {
      get() {
        return this.$store.state.salas
      }
    }
  },
}
</script>