<template>
  <v-main>
    <v-card>
      <v-card-title>
        Nova Reserva
      </v-card-title>

      <v-card-text>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step
              step="1"
              :complete="selecaoMedicos.length > 0"
            >
              Escolher um médico
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              step="2"
              :complete="selecaoSalas.length > 0"
            >
              Escolher uma sala
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              step="3"
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
                        clearable
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
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="pesquisarSala"
                        outlined
                        clearable
                        label="Pesquisar médicos"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-select
                        v-model="tipoSelecionado"
                        :items="tipoSala"
                        label="Selecionar Tipo de Sala"
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
                  text 
                  @click="voltar()"
                >
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
                    prefix="R$"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="mt-2">
                <v-spacer></v-spacer>
                <v-btn 
                  text 
                  @click="voltar()"
                >
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
import { add, addHours, differenceInHours, format, parse, sub } from "date-fns";

export default {
  name: 'Reservas',
  data: () => ({
    step: 1,

    pesquisarMedico: '',
    especialidadeSelecionada: '',

    pesquisarSala: '',
    tipoSelecionado: '',

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
      'especialidades',
      'tipoSala',
      'alocacoes',
      'reservas',
      'valorSalaPequena',
      'valorSalaGrande',
      'valorSalaAltoRisco'
    ]),
    salas: {
      get() {
        const especialidade = this.medicoSelecionado ? this.medicoSelecionado.especialidade : ''
        let salas

        if (especialidade == 'Dermatologia')
          salas = this.$store.state.salas.filter(s => s.tipo == 'Pequena')
        else if (especialidade == 'Cirurgia Cardiovascular' || especialidade == 'Neurologia')
          salas = this.$store.state.salas.filter(s => s.tipo != 'Pequena')
        else
          salas = this.$store.state.salas

        if (this.tipoSelecionado)
          salas = salas.filter(s => s.tipo == this.tipoSelecionado)

        return salas
      }
    },
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
    dataSelecionada() {
      return this.parseData(this.dataReserva)
    },
    horaInicial() {
      return this.parseHora(this.horaInicioReserva)
    },
    horaFinal() {
      return this.parseHora(this.horaFinalReserva)
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
      const dataAtual = this.formatarData(new Date())
      let horaInicial

      if (this.dataSelecionada == dataAtual)
        horaInicial = this.formatarHora(new Date())
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
      const dataAtual = this.formatarData(new Date())
      const horaAtual = this.formatarHora(new Date())
      let horaInicial = this.horaInicioReserva
      let horaFinal

      if (horaInicial)
        horaFinal = format(add(parse(horaInicial, 'kk:mm', new Date()), { hours: 2 }), 'kk:mm')
      else if (this.dataSelecionada == dataAtual && horaAtual > '06:00')
        horaFinal = this.formatarHora(addHours(new Date(), 2))
      else
        horaFinal = '08:00'

      return horaFinal
    },
    valorTotal() {
      let total = 0
      let diferencaEmHoras = 0

      if (this.horaFinal && this.horaInicial)
        diferencaEmHoras = differenceInHours(this.horaFinal, this.horaInicial)

      if (this.salaSelecionada.tipo == 'Pequena')
        total = diferencaEmHoras * this.valorSalaPequena
      else if (this.salaSelecionada.tipo == 'Grande')
        total = diferencaEmHoras * this.valorSalaGrande
      else if (this.salaSelecionada.tipo == 'Alto-risco') {
        total = diferencaEmHoras * this.valorSalaAltoRisco
        if (this.horaInicioReserva < '10:00')
          total = total * 0.9
      }

      return total
    },
  },
  methods: {
    voltar(){
      if (this.step == 2) {
        this.step = 1
        this.selecaoSalas = []
      } else if (this.step == 3) {
        this.step = 2
        this.dataReserva = null
        this.horaInicioReserva = null
        this.horaFinalReserva= null
      }
    },
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


    },
    formatarHora(hora) {
      const pattern24h = 'kk:mm'
      let horaFormatada

      if (hora)
        horaFormatada = format(hora, pattern24h)
      else
        horaFormatada = ''

      return horaFormatada
    },
    formatarData(data) {
      const patternData = 'yyyy-MM-dd'
      let dataFormatada

      if (data)
        dataFormatada = format(data, patternData)
      else
        dataFormatada = ''

      return dataFormatada
    },
    parseHora(hora) {
      const pattern24h = 'kk:mm'
      let horaParsed

      if (hora)
        horaParsed = parse(hora, pattern24h, new Date())
      else
        horaParsed = ''

      return horaParsed
    },
    parseData(data) {
      const patternData = 'yyyy-MM-dd'
      let dataParsed

      if (data)
        dataParsed = parse(data, patternData, new Date())
      else
        dataParsed = ''

      return dataParsed
    },
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