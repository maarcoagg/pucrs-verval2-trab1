<template>
  <v-main>
    <v-card>
      <v-card-title>
        Configurações do Sistema
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="novoValorSalaPequena"
              prefix="R$"
              outlined
              label="Valor-hora da sala pequena"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="novoValorSalaGrande"
              prefix="R$"
              outlined
              label="Valor-hora da sala grande"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="novoValorSalaAltoRisco"
              prefix="R$"
              outlined
              label="Valor-hora da sala de alto-risco"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-spacer></v-spacer>
          <v-btn text @click="resetar">
            Resetar
          </v-btn>
          <v-btn
            color="primary"
            @click="salvar"
            class="mx-3"
          >
            Salvar
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Configuracoes',
  data: () => ({
    novoValorSalaPequena: 0,
    novoValorSalaGrande: 0,
    novoValorSalaAltoRisco: 0,
  }),
  computed: {
    ...mapGetters([
      'valorSalaPequena',
      'valorSalaGrande',
      'valorSalaAltoRisco'
    ]),
    salas: {
      get() {
        return this.$store.state.salas
      }
    }
  },
  mounted() {
    this.resetar()
  },
  methods: {
    resetar() {
      this.novoValorSalaPequena = this.valorSalaPequena
      this.novoValorSalaGrande = this.valorSalaGrande
      this.novoValorSalaAltoRisco = this.valorSalaAltoRisco
    },
    salvar() {
      this.$store.commit('setValorSalaPequena', this.novoValorSalaPequena)
      this.$store.commit('setValorSalaGrande', this.novoValorSalaGrande)
      this.$store.commit('setValorSalaAltoRisco', this.novoValorSalaAltoRisco)
    }
  }
}
</script>