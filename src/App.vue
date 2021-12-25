<template>
  <div>
      <label class="switch">
        <input type="checkbox" v-model="onePlayer">
        <span class="slider round"></span>
      </label>
      <span v-bind:class="[onePlayer ? blueFont : grayFont]"> One Player </span>
  </div>

  <!--img alt="tic tac teo logo" src="./assets/tic-img.png"-->
  <Board v-bind:onePlayer="onePlayer"/>
</template>

<script>
import Board from "./components/Board.vue"

export default {
  name: 'App',
  components: {
    Board
  },
  data () {
    return {
      onePlayer: false,
      blueFont: "bluefont",
      grayFont: "grayfont",
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  width: 100px;
  height: 100px;
}
.bluefont {
  color: blue;
}
.grayfont{
  color: gray;
}
@import "./assets/style.css";
</style>
