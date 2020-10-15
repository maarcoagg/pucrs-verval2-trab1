<template>
  <v-main>
      <v-card>
        <v-card-title>
          Todas os Médicos
        </v-card-title>

        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="medicos"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-row class="mx-2 pt-4">
                <v-col>
                  <v-text-field
                    v-model="search"
                    outlined
                    label="Pesquisar médicos"
                  ></v-text-field>
                </v-col>

                <v-col>
                  <v-select
                    v-model="selecionado"
                    :items="especialidades"
                    item-text="state"
                    item-value="abbr"
                    label="Especialidades"
                    clearable
                    outlined
                    return-object
                  ></v-select>
                </v-col>
              </v-row>
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
    selecionado: '',
    headers: [
      {
        text: 'Nome',
        align: 'start',
        value: 'nome',
      },
      { text: 'Especialidade', value: 'especialidade' },
      { text: 'CRM', value: 'crm' }
    ],
  }),
  computed: {
    medicos: {
      get() {
        return this.$store.state.medicos.filter(m => this.selecionado ? m.especialidade == this.selecionado : true)
      }
    },
    especialidades: {
      get() {
        return this.$store.state.medicos.map(m => m.especialidade)
      }
    }
  },
}
</script>