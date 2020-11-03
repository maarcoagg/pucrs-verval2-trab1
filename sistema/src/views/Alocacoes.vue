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
            <v-row
              class="mx-2 pt-2"
            >
              <v-col>
                <v-menu
                  v-model="menuDataInicial"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      outlined
                      v-model="dataInicio"
                      label="Selecionar a data inicial"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    scrollable
                    v-model="dataInicio"
                    :max="dataFinal"
                    @input="menuDataInicial = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col>
                <v-menu
                  v-model="menuDataFinal"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      outlined
                      v-model="dataFinal"
                      label="Selecionar a data final"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    scrollable
                    v-model="dataFinal"
                    :min="dataInicio"
                    @input="menuDataFinal = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col>
                <v-text-field
                  :value="total"
                  outlined
                  readonly
                  prefix="R$"
                  label="Total"
                ></v-text-field>
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
  name: 'Alocacoes',
  data: () => ({
    pesquisarAlocacoes: '',
    dataInicio: '',
    dataFinal: '',

    menuDataInicial: null,
    menuDataFinal: null,
    
    headersAlocacoes: [
      { text: 'Médico', value: 'medico' },
      { text: 'Sala', value: 'sala' },
      { text: 'Data', value: 'data' },
      { text: 'Hora de Início', value: 'inicio' },
      { text: 'Hora de Término', value: 'termino' },
      { text: 'Custo', value: 'valor' }
    ],
  }),
  computed: {
    alocacoes: {
      get() {
        let alocacoes = this.$store.getters.alocacoes

        if (this.dataInicio)
          alocacoes = alocacoes.filter(a => a.data >= this.dataInicio)
        if (this.dataFinal)
          alocacoes = alocacoes.filter(a => a.data <= this.dataFinal)

        return alocacoes
      }
    },
    total() {
      const valores = this.alocacoes.map(a => a.valor)
      let total = 0

      if (valores.length > 0)
        total = valores.reduce((total, atual) => total + atual)

      return total
    }
  },
}
</script>