<template>
  <div class="home">

    <md-whiteframe md-elevation="2" class="whiteframe">
      <md-boards :md-auto="true" :md-infinite="true" :md-duration="5000" :md-swipeable="true">
        <md-board id="slide1">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
        </md-board>

        <md-board id="slide2">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
        </md-board>

        <md-board id="slide3">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
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
