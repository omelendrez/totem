<template>
  <div class="home">

    <md-toolbar class="md-primary">
      <h1 class="md-title">Administrador del Tótem</h1>
    </md-toolbar>

    <md-whiteframe md-elevation="2" class="whiteframe">
      <md-boards :md-auto="true" :md-infinite="true" :md-duration="5000" :md-swipeable="true">
        <md-board id="slide1">
          <p>Recuerde verificar la lista de productos y desactivar aquellos productos que no deben mostrarse en el tótem</p>
        </md-board>

        <md-board id="slide2">
          <p>Mantenga en secreto sus credenciales y no se las dé a nadie. Recuerde que las modificaciones introducidas en la data con sus credenciales son grabadas</p>
        </md-board>

        <md-board id="slide3">
          <p>Si detecta que el tótem no está funcionando correctamente puede desabilitarlo desde esta aplicación.</p>
        </md-board>
      </md-boards>
    </md-whiteframe>

      <md-bottom-bar md-shift class="bottom_bar">
        <md-bottom-bar-item md-icon="books" md-active>Manual</md-bottom-bar-item>
      </md-bottom-bar>

  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whiteframe {
  margin-top: 60px;
  margin-left: 120px;
  margin-right: 120px;
  padding: 20px;
}

.bottom_bar {
  position: absolute;
  bottom: 0;
}
</style>
