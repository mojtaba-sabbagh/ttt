<template>
  <div>
      <label class="switch">
        <input type="checkbox" v-model="onePlayer" @change="$refs.myBoard.fillBlank()">
        <span class="slider round"></span>
      </label>
      <span v-bind:class="[onePlayer ? blueFont : grayFont]"> One Player </span>
      <select class="form-select-inline form-select-sm mb-5" 
        v-model="level" @change="$refs.myBoard.fillBlank()">
        <option value="1" selected>level 1</option>
        <option value="2">level 2</option>
        <option value="3">level 3</option>
        <option value="4">level 4</option>
        <option value="5">level 5</option>
        <option value="6">level 6</option>
      </select>
  </div>

  <!--img alt="tic tac teo logo" src="./assets/tic-img.png"-->
  <Board v-bind:onePlayer="onePlayer" v-bind:level="level" ref="myBoard"/>
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
      level: "1",
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
select {
  margin-left: 10px;
}
@import "./assets/style.css";
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
</style>
