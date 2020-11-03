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
              :complete="dataReserva != null"
            >
              Definir data
            </v-stepper-step>

            <v-stepper-step
              step="4"
              :complete="horaInicioReserva != null"
            >
              Definir hora de início
            </v-stepper-step>

            <v-stepper-step
              step="5"
              :complete="horaFinalReserva != null"
            >
              Definir hora de fim
            </v-stepper-step>

            <v-stepper-step
              step="6"
            >
              Concluir
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
                <v-spacer></v-spacer>
                <v-date-picker
                  scrollable
                  v-model="dataReserva"
                  :min="dataMinima"
                  locale="pt-br"
                  elevation="6"
                ></v-date-picker>
                <v-spacer></v-spacer>

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
                  @click="step = 4"
                  class="mx-3"
                  :disabled="!this.dataReserva"
                >
                  Continuar
                </v-btn>
              </v-row>
            </v-stepper-content>

            <v-stepper-content
              step="4"
            >
              <v-row>
                <v-spacer></v-spacer>
                <v-time-picker
                  v-model="horaInicioReserva"
                  format="24hr"
                  :min="horaInicialMinima"
                  :max="horaInicialMaxima"
                  elevation="6"
                ></v-time-picker>
                <v-spacer></v-spacer>
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
                  @click="step = 5"
                  class="mx-3"
                  :disabled="!this.horaInicioReserva"
                >
                  Continuar
                </v-btn>
              </v-row>
            </v-stepper-content>

            <v-stepper-content
              step="5"
            >
              <v-row>
                <v-spacer></v-spacer>
                <v-time-picker
                  v-model="horaFinalReserva"
                  format="24hr"
                  :min="horaFinalMinima"
                  :max="'22:00'"
                  elevation="6"
                ></v-time-picker>
                <v-spacer></v-spacer>
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
                  @click="step = 6"
                  class="mx-3"
                  :disabled="!this.horaFinalReserva"
                >
                  Continuar
                </v-btn>
              </v-row>
            </v-stepper-content>

            <v-stepper-content
              step="6"
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
                  <v-text-field
                    outlined
                    v-model="dataReserva"
                    label="Data da reserva"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                  ></v-text-field>
                </v-col>

                <v-col cols="3">
                  <v-text-field
                    outlined
                    v-model="horaInicioReserva"
                    label="Hora de inicio da reserva"
                    prepend-inner-icon="mdi-clock-time-four-outline"
                    readonly
                  ></v-text-field>
                </v-col>

                <v-col cols="3">
                  <v-text-field
                    outlined
                    v-model="horaFinalReserva"
                    label="Hora de termino da reserva"
                    prepend-inner-icon="mdi-clock-time-four-outline"
                    readonly
                  ></v-text-field>
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
                  @click="adicionarReserva"
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

    <v-dialog
      v-model="avisoErro"
      max-width="290"
    >
      <v-card>
        <v-card-title>
          Erro
        </v-card-title>
        <v-card-text>
          Horário selecionado não está disponível
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            @click="avisoErro = false"
            color="primary"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import { add, addHours, areIntervalsOverlapping, differenceInHours, format, parse, sub } from "date-fns";

export default {
  name: 'Reservas',
  data: () => ({
    step: 1,
    avisoErro: null,

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

    // horasDeInicioDisponiveis: [],
    // minutosDeInicioDisponiveis: [],
    // horasDeFimDisponiveis: [],
    // minutosDeFimDisponiveis: [],
    
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
      get(a) {
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
    voltar() {
      if (this.step == 2)
        this.selecaoSalas = []
      else if (this.step == 3)
        this.dataReserva = null
      else if (this.step == 4)
        this.horaInicioReserva = null
      else if (this.step == 5)
        this.horaFinalReserva= null

      this.step = this.step - 1
    },
    adicionarReserva() {
      let horaReservas = this.reservas.filter(r => r.sala == this.salaSelecionada.nome && r.data == this.dataReserva)
      let disponivel = true

      if (horaReservas.length > 0) {
        horaReservas.forEach(hora => {
          let sobreposicao = areIntervalsOverlapping(
            { start: this.horaInicial, end: this.horaFinal },
            { start: this.parseHora(hora.inicio), end: this.parseHora(hora.termino) }
          )

          if (sobreposicao)
            disponivel = false
        });
      } 

      if (disponivel) {
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

        this.$router.push('reservas')
      } else {
        this.avisoErro = true
      }
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
    verificarDisponibilidade() {
      let horaReservas = this.reservas.filter(r => r.sala == this.salaSelecionada.nome && r.data == this.dataReserva)

      if (horaReservas.length > 0) {
        horaReservas.forEach(hora => {
          let sobreposicao = areIntervalsOverlapping(
            { start: this.horaInicial, end: this.horaFinal },
            { start: this.parseHora(hora.inicio), end: this.parseHora(hora.termino) }
          )

          if (sobreposicao) {
            console.log('sobreposicao ' + this.horaInicial + ' ' + this.horaFinal + ' com ' + this.parseHora(hora.inicio) + ' ' + this.parseHora(hora.termino))
            return false
          }
        });
      } else {
        return true
      }
    },
    // calcularHorasDeInicioDisponiveis() {
    //   console.log('horasDeInicioDisponiveis')
    //   this.horasDeInicioDisponiveis = [12, 14]
    // },
    // calcularMinutosDeInicioDisponiveis() {
    //   console.log('minutosDeInicioDisponiveis')
    //   this.minutosDeInicioDisponiveis = [25, 35]
    // },
    // calcularMinutosDeFimDisponiveis() {
    //   console.log('minutosDeFimDisponiveis')
    //   this.minutosDeFimDisponiveis = [12, 16]
    // },
  },
  // watch: {
  //   dataReserva: 'calcularHorasDeInicioDisponiveis',
  //   horaInicioReserva: 'calcularMinutosDeInicioDisponiveis',
  //   horaFinalReserva: 'calcularMinutosDeFimDisponiveis',
  // },
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