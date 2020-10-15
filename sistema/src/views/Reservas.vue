<template>
  <v-main>
    <v-card>
      <v-card-title>
        Todas as Alocações e Reservas
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="novaReserva = true">
          Reservar
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-tabs
          dark
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab>
            Alocações
          </v-tab>
          
          <v-tab>
            Reservas
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
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
          </v-tab-item>

          <v-tab-item>
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
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="novaReserva"
      width="1000"
    >
      <v-card>
        <v-card-title>
          Nova Reserva
        </v-card-title>

        <v-card-text>
          <v-stepper non-linear>
            <v-stepper-header>
              <v-stepper-step
                editable
                step="1"
              >
                Escolher um médico
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                editable
                step="2"
              >
                Escolher uma sala
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                step="3"
                editable
              >
                Definir data e hora
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content
                step="1"
              >
                <v-data-table
                  v-model="medicoSelecionado"
                  :headers="headersMedicos"
                  :items="medicos"
                  :search="pesquisarMedico"
                  show-select
                  single-select
                  item-key="crm"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-row class="mx-2 pt-4">
                      <v-col>
                        <v-text-field
                          v-model="pesquisarMedico"
                          outlined
                          label="Pesquisar médicos"
                        ></v-text-field>
                      </v-col>

                      <v-col>
                        <v-select
                          v-model="especialidadeSelecionada"
                          :items="especialidades"
                          item-text="state"
                          item-value="abbr"
                          label="Selecionar Especialidade"
                          clearable
                          outlined
                          return-object
                        ></v-select>
                      </v-col>
                    </v-row>
                  </template>
                </v-data-table>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn text @click="novaReserva = false">
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="nextStep(n)"
                    class="mx-3"
                  >
                    Avançar
                  </v-btn>
                </v-row>
              </v-stepper-content>

              <v-stepper-content
                step="2"
              >
                <v-data-table
                  dense
                  v-model="salaSelecionada"
                  :headers="headersSalas"
                  :items="salas"
                  :search="pesquisarSala"
                  show-select
                  single-select
                  item-key="nome"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-text-field
                      v-model="pesquisarSala"
                      outlined
                      label="Pesquisar médicos"
                    ></v-text-field>
                    <v-spacer></v-spacer>
                  </template>
                </v-data-table>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn text @click="novaReserva = false">
                    Voltar
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="nextStep(n)"
                    class="mx-3"
                  >
                    Avançar
                  </v-btn>
                </v-row>
              </v-stepper-content>

              <v-stepper-content
                step="3"
              >
                <v-row>
                  <v-col>
                    <v-text-field
                      outlined
                      v-model="nomeMedicoSelecionado" 
                      readonly
                      label="Médico"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      outlined
                      v-model="nomeSalaSelecionada" 
                      readonly
                      label="Sala"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">
                    <v-date-picker v-model="dataReserva"></v-date-picker>
                  </v-col>
                  <v-col cols="4">
                    <v-time-picker
                      v-model="horaInicioReserva"
                      :max="horaFinalMinima"
                    ></v-time-picker>
                  </v-col>
                  <v-col cols="4">
                    <v-time-picker
                      v-model="horaFinalReserva"
                      :min="horaInicioReserva"
                    ></v-time-picker>
                  </v-col>
                </v-row>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn text>
                    Cancel
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="nextStep(n)"
                    class="mx-3"
                  >
                    Continue
                  </v-btn>
                </v-row>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
export default {
  name: 'Salas',
  data: () => ({
    tab: null,
    novaReserva: null,
    pesquisarMedico: '',
    pesquisarAlocacoes: '',
    pesquisarReservas: '',
    pesquisarSala: '',
    especialidadeSelecionada: '',
    salaSelecionada: [],
    medicoSelecionado: [],
    dataReserva: null,
    horaInicioReserva: null,
    horaFinalReserva: null,
    
    headersAlocacoes: [
      { text: 'Médico', value: 'medico' },
      { text: 'Sala', value: 'sala' },
      { text: 'Data', value: 'data' },
      { text: 'Hora de Início', value: 'inicio' },
      { text: 'Hora de Término', value: 'termino' },
    ],
    headersReservas: [
      { text: 'Médico', value: 'medico' },
      { text: 'Sala', value: 'sala' },
      { text: 'Data', value: 'data' },
      { text: 'Hora de Início', value: 'inicio' },
      { text: 'Hora de Término', value: 'termino' },
    ],
    headersMedicos: [
      { text: 'Nome', value: 'nome' },
      { text: 'Especialidade', value: 'especialidade' },
      { text: 'CRM', value: 'crm' }
    ],
    headersSalas: [
      { text: 'Nome', align: 'start', value: 'nome' },
      { text: 'Tipo', value: 'tipo' },
    ],
  }),
  computed: {
    salas: {
      get() {
        return this.$store.state.salas
      }
    },
    medicos: {
      get() {
        return this.$store.state.medicos.filter(m => this.selecionado ? m.especialidade == this.selecionado : true)
      }
    },
    especialidades: {
      get() {
        return this.$store.state.medicos.map(m => m.especialidade)
      }
    },
    alocacoes: {
      get() {
        return this.$store.state.reservas
      }
    },
    reservas: {
      get() {
        return this.$store.state.reservas
      }
    },
    nomeMedicoSelecionado: {
      get() {
        return this.medicoSelecionado[0] ? this.medicoSelecionado[0].nome : ''
      }
    },
    nomeSalaSelecionada: {
      get() {
        return this.salaSelecionada[0] ? this.salaSelecionada[0].nome : ''
      }
    },
    horaFinalMinima: {
      get() {
        return this.horaInicioReserva ? null : null
      }
    }
  },
  watch: {
    medicoSelecionado() {
      console.log(this.medicoSelecionado[0])
    }
  }
}
</script>