<template>
  <div class="home">

    <md-toolbar>
    </md-toolbar>

    <md-layout md-gutter md-align="center">
      <md-layout md-flex="30">
        <md-boards :md-auto="true" :md-infinite="true" :md-duration="10000" :md-swipeable="true" class="card-wall">
          <md-board id="slide1">
            <md-card md-with-hover>

              <md-card-media>
                <img src="/static/slider01.jpg">
              </md-card-media>

              <md-card-header>
                <div class="md-title">Productos en el tótem</div>
                <div class="md-subhead">Desactivar</div>
              </md-card-header>

              <md-card-content>Recuerde verificar la lista de productos y desactivar aquellos productos que no deben mostrarse en el tótem</md-card-content>

            </md-card>
          </md-board>

          <md-board id="slide2">
            <md-card md-with-hover>

              <md-card-media>
                <img src="/static/slider02.jpg">
              </md-card-media>

              <md-card-header>
                <div class="md-title">Seguridad</div>
                <div class="md-subhead">Credenciales</div>
              </md-card-header>

              <md-card-content>Mantenga en secreto sus credenciales y no se las dé a nadie. Recuerde que las modificaciones introducidas en la data con sus credenciales son grabadas</md-card-content>

            </md-card>
          </md-board>

          <md-board id="slide3">
            <md-card md-with-hover>

              <md-card-media>
                <img src="/static/slider03.jpg">
              </md-card-media>

              <md-card-header>
                <div class="md-title">Problemas</div>
                <div class="md-subhead">Asistencia</div>
              </md-card-header>

              <md-card-content>Si detecta que el tótem no está funcionando correctamente puede desabilitarlo desde esta aplicación</md-card-content>

            </md-card>
          </md-board>

        </md-boards>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
export default {
  name: 'home'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
