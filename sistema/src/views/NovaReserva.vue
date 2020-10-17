<template>
  <v-main>
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
              :complete="selecaoMedicos.length > 0"
            >
              Escolher um médico
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              editable
              step="2"
              :complete="selecaoSalas.length > 0"
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
                v-model="selecaoMedicos"
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
                <v-btn
                  color="primary"
                  @click="step = 2"
                  class="mx-3"
                  :disabled="!(this.selecaoMedicos.length > 0)"
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
                v-model="selecaoSalas"
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
                  :disabled="!(this.selecaoSalas.length > 0)"
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
                    v-model="medicoSelecionado.nome" 
                    readonly
                    label="Médico"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    v-model="medicoSelecionado.especialidade" 
                    readonly
                    label="Especialidade"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    v-model="medicoSelecionado.crm" 
                    readonly
                    label="CRM"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    v-model="salaSelecionada.nome" 
                    readonly
                    label="Sala"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    v-model="salaSelecionada.tipo" 
                    readonly
                    label="Tipo"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="3">
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
                      :min="dataMinima"
                      @input="menuSelecionarData = false"
                    ></v-date-picker>
                  </v-menu>

                </v-col>
                <v-col cols="3">
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
                      format="24hr"
                      @click:minute="$refs.menu.save(horaInicioReserva)"
                      :min="horaInicialMinima"
                      :max="horaInicialMaxima"
                    ></v-time-picker>
                  </v-menu>
                </v-col>

                <v-col cols="3">
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
                      format="24hr"
                      @click:minute="$refs.menu2.save(horaFinalReserva)"
                      :min="horaFinalMinima"
                      :max="'22:00'"
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
                  :disabled="!(this.selecaoMedicos.length > 0 && this.selecaoSalas.length > 0 && this.dataReserva && this.horaInicioReserva && this.horaFinalReserva)"
                >
                  Confirmar
                </v-btn>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import { add, format, parse, sub } from "date-fns";

export default {
  name: 'Reservas',
  data: () => ({
    step: 1,
    pesquisarMedico: '',
    pesquisarSala: '',
    especialidadeSelecionada: '',
    selecaoSalas: [],
    selecaoMedicos: [],
    dataReserva: null,
    horaInicioReserva: null,
    horaFinalReserva: null,

    menuSelecionarData: null,
    menuSelecionarHoraInicial: null,
    menuSelecionarHoraFinal: null,
    
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
    ...mapGetters([
      'salas',
      'especialidades',
      'alocacoes',
      'reservas',
    ]),
    medicos: {
      get() {
        return this.$store.state.medicos.filter(m => this.selecionado ? m.especialidade == this.selecionado : true)
      }
    },
    medicoSelecionado: {
      get() {
        return this.selecaoMedicos[0] ?? {}
      }
    },
    salaSelecionada: {
      get() {
        return this.selecaoSalas[0] ?? {}
      }
    },
    dataMinima() {
      const hora = format(new Date(), 'kk:mm')
      let data
      
      if (hora > '20:00')
        data = format(add(new Date(), { days: 1 }), 'yyyy-MM-dd')
      else
        data = format(new Date(), 'yyyy-MM-dd')

      return data
    },
    horaInicialMinima() {
      const dataAtual = format(new Date(), 'yyyy-MM-dd')
      let horaInicial

      if (this.dataMinima == dataAtual)
        horaInicial = format(new Date(), 'kk:mm')
      else
        horaInicial = '06:00'

      return horaInicial
    },
    horaInicialMaxima() {
      const hora = format(new Date(), 'kk:mm')
      let horaFinal = this.horaFinalReserva
      let horaInicial

      if (horaFinal)
        horaInicial = format(sub(parse(horaFinal, 'kk:mm', new Date()), { hours: 2 }), 'kk:mm')
      else
        horaInicial = '20:00'

      return horaInicial
    },
    horaFinalMinima() {
      const hora = format(new Date(), 'kk:mm')
      let horaInicial = this.horaInicioReserva
      let horaFinal

      if (horaInicial)
        horaFinal = format(add(parse(horaInicial, 'kk:mm', new Date()), { hours: 2 }), 'kk:mm')
      else
        horaFinal = '08:00'

      return horaFinal
    },
    valorTotal: {
      get() {
        return 0
      }
    },
  },
  methods: {
    adicionarReserva() {
      this.$store.commit('adicionarReserva', {
        sala: this.salaSelecionada.nome,
        tipo: this.salaSelecionada.tipo,
        medico: this.medicoSelecionado.nome,
        crm: this.medicoSelecionado.crm,
        especialidade: this.medicoSelecionado.especialidade,
        data: this.dataReserva,
        inicio: this.horaInicioReserva,
        termino: this.horaFinalReserva,
        valor: this.valorTotal
      })


    }
  },
  mounted() {
    // console.log(format(new Date(), 'kk:mm'))
    // var result = add(new Date(), {
    //   hours: 5
    // })
    var result = parse('06:00', 'kk:mm', new Date())
    console.log(result)
  }
}
</script>