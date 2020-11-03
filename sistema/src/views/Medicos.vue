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

            <!-- <template v-slot:item.total="{ item }">
              <v-chip
                :color="getColor(item.calories)"
                dark
              >
                {{ item.calories }}
              </v-chip>
            </template> -->
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
      { text: 'CRM', value: 'crm' },
      { text: 'Total Gasto', value: 'total' }
    ],
  }),
  computed: {
    medicos: {
      get() {
        let medicos = this.$store.state.medicos.filter(m => this.selecionado ? m.especialidade == this.selecionado : true)

        medicos.forEach(medico => {
          medico.total = this.calcularTotalPorMedico(medico)
        });

        return medicos
      }
    },
    especialidades: {
      get() {
        return this.$store.state.medicos.map(m => m.especialidade)
      }
    }
  },
  methods: {
    calcularTotalPorMedico(medico) {
      let total = 0
      let alocacoes = this.$store.getters.alocacoes.filter(m => m.crm == medico.crm)

      if (alocacoes.length > 0){
        let valores = alocacoes.map(a => a.valor)

        total = valores.reduce((total, atual) => total + atual)
      }

      return total
    }
  }
}
</script>