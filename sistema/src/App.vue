<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-tabs centered>
        <v-tab to="/medicos">
          Médicos
        </v-tab>
        <v-tab to="/salas">
          Salas
        </v-tab>
        <v-tab to="/alocacoes">
          Alocações
        </v-tab>
        <v-tab to="/reservas">
          Reservas
        </v-tab>
        <v-tab to="/configuracoes">
          Configurações
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>
