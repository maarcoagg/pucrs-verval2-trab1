<template>
  <v-main>
    <v-card>
      <v-card-title>
        Todas as Alocações e Reservas
        <v-spacer></v-spacer>
        <v-btn color="primary" to="/nova-reserva">
          Nova Reserva
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
          <v-stepper non-linear v-model="step">
            <v-stepper-header>
              <v-stepper-step
                editable
                step="1"
                :complete="medicoSelecionado.length > 0"
              >
                Escolher um médico
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                editable
                step="2"
                :complete="salaSelecionada.length > 0"
              >
                Escolher uma sala
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                step="3"
                editable
                :complete="dataReserva != null && horaInicioReserva != null && horaFinalReserva != null"
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

                <v-row class="mt-4">
                  <v-spacer></v-spacer>
                  <v-btn text @click="novaReserva = false">
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="step = 2"
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

                <v-row class="mt-4">
                  <v-spacer></v-spacer>
                  <v-btn text @click="step = 1">
                    Voltar
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="step = 3"
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
                  <v-col cols="3">
                    <!-- <v-date-picker v-model="dataReserva"></v-date-picker> -->

                    <v-menu
                      v-model="menuSelecionarData"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          outlined
                          v-model="dataReserva"
                          label="Selecionar a data"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        no-title
                        scrollable
                        v-model="dataReserva"
                        @input="menuSelecionarData = false"
                      ></v-date-picker>
                    </v-menu>

                  </v-col>
                  <v-col cols="3">
                    <!-- <v-time-picker
                      v-model="horaInicioReserva"
                      :max="horaFinalMinima"
                    ></v-time-picker> -->

                    <v-menu
                      ref="menu"
                      v-model="menuSelecionarHoraInicial"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="horaInicioReserva"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          outlined
                          v-model="horaInicioReserva"
                          label="Selecionar hora de inicio"
                          prepend-inner-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menuSelecionarHoraInicial"
                        v-model="horaInicioReserva"
                        full-width
                        @click:minute="$refs.menu.save(horaInicioReserva)"
                        :max="horaFinalReserva"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="3">
                    <!-- <v-time-picker
                      v-model="horaFinalReserva"
                      :min="horaInicioReserva"
                    ></v-time-picker> -->

                    <v-menu
                      ref="menu2"
                      v-model="menuSelecionarHoraFinal"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="horaFinalReserva"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          outlined
                          v-model="horaFinalReserva"
                          label="Selecionar hora de termino"
                          prepend-inner-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menuSelecionarHoraFinal"
                        v-model="horaFinalReserva"
                        full-width
                        @click:minute="$refs.menu2.save(horaFinalReserva)"
                        :min="horaInicioReserva"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="3">
                    <v-text-field
                      outlined
                      v-model="valorTotal"
                      label="Total"
                      prepend-inner-icon="mdi-clock-time-four-outline"
                      prefix="R$"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="mt-2">
                  <v-spacer></v-spacer>
                  <v-btn text @click="step = 2">
                    Voltar
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="adicionarReserva()"
                    class="mx-3"
                  >
                    Confirmar
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
  name: 'Reservas',
  data: () => ({
    tab: null,
    step: 1,
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

    menuSelecionarData: null,
    menuSelecionarHoraInicial: null,
    menuSelecionarHoraFinal: null,
    
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
    },
    valorTotal: {
      get() {
        return 0
      }
    },
  },
  methods: {
    adicionarReserva() {
      if (this.medicoSelecionado.length > 0 && this.salaSelecionada.length > 0 && this.dataReserva && this.horaInicioReserva && this.horaFinalReserva) {
        this.$store.commit('adicionarReserva', {
          sala: this.salaSelecionada[0].nome,
          tipo: this.salaSelecionada[0].tipo,
          medico: this.medicoSelecionado[0].nome,
          crm: this.medicoSelecionado[0].crm,
          especialidade: this.medicoSelecionado[0].especialidade,
          data: this.dataReserva,
          inicio: this.horaInicioReserva,
          termino: this.horaFinalReserva
        })
      }
    }
  }
}
</script>