<template>
    <div>
      <p> Turn: 
          <span class="XClass" v-if="isXTurn"> X </span> 
          <span class="OClass" v-if="!isXTurn"> O </span> 
      </p>
    </div>
    <div v-bind:key="rowSigns" 
        v-for="rowSigns in signs">
        <Square 
          v-for="(value, key) in rowSigns"
          v-bind:sign_value="value"
          v-bind:no="key"
          v-bind:key="key"
          v-bind:xTurn="isXTurn"
        >
        </Square>
    </div>
     <div> 
        <button class="resetButton" v-on:click="fillBlank" > Reset Game </button>
        <p v-if="won">WINNER is Player 
            <span class="XClass" v-if="pname == 'X' "> {{ pname }} </span> 
            <span class="OClass" v-if="pname == 'O' "> {{ pname }} </span> 
        </p> 
        <p v-if="draw"> Draw! Game Over! </p>
    </div>
</template>

<script>
    import Square from './Square.vue';
    import {rules6, rules5, rules4, rules3, rules2, rules1} from './rules.js';

    export default {

        props: {
            onePlayer: Boolean,
            level: String,
        },
        components: {
            Square
        },
       data () {
           return {
                BLANK: '-',
                isXTurn: true,
                won: false,
                signs: [{'0':'', '1':'', '2':''}, 
                        {'3':'', '4':'', '5':''}, 
                        {'6':'', '7':'', '8':''}],
                pname : '',
                draw : false
            }
       },
        created: function () {
          this.fillBlank();
        },

        methods: {
          handleClickSquare: function (index) {
            let x = this.isXTurn ? 'X' : 'O';
            var row = parseInt(index/3);
            if (this.signs[row][index] == this.BLANK && !this.won){
              this.signs[row][index] = x;
              this.isXTurn = !this.isXTurn;
            }
            if (!this.won){
              this.pname = this.calculateWinner();
              if (this.pname){
                this.won = true;
              }
            }
            if (this.allCellsFilled() && !this.won){
                this.draw = true;
            }
            else {
                this.draw = false;
            }
            if (this.onePlayer && !this.won && !this.isXTurn && !this.draw){
                this.computerPlay(this.level);
                this.pname = this.calculateWinner();
                if (this.pname){
                    this.won = true;
              }
            }
          },
          fillBlank: function () {
            this.signs.forEach(element => {
              for (var k in element){
                element[k] = this.BLANK;
              }
            });
            this.won = false;
            this.isXTurn = true;
            this.draw = false;
          },
          calculateWinner: function () {
            const lines = [
              [[0, 0], [0, 1], [0, 2]],
              [[1, 3], [1, 4], [1, 5]],
              [[2, 6], [2, 7], [2, 8]],
              [[0, 0], [1, 3], [2, 6]],
              [[0, 1], [1, 4], [2, 7]],
              [[0, 2], [1, 5], [2, 8]],
              [[0, 0], [1, 4], [2, 8]],
              [[0, 2], [1, 4], [2, 6]],
            ];
            for (let i = 0; i < lines.length; i++) {
              const [a, b, c] = lines[i];
              if (this.signs[a[0]][a[1]]!=this.BLANK && this.signs[a[0]][a[1]] === this.signs[b[0]][b[1]] 
                  && this.signs[a[0]][a[1]] === this.signs[c[0]][c[1]]) {
                return this.signs[a[0]][a[1]];
              }
            }
            return null;
          },
          allCellsFilled: function() {
              for (let i=0; i<this.signs.length; i++) {
                  for (let key in this.signs[i]){
                      if (this.signs[i][key] == this.BLANK) {
                          return false;
                      }
                  }
               }
              return true;
          },
          computerPlay: function (plevel) {
              let cell = []
              switch(plevel) {
                case "1": 
                    cell = rules1(this.signs, this.BLANK);
                    break;
                case "2": 
                    cell = rules2(this.signs, this.BLANK);
                    break;
                case "3": 
                    cell = rules3(this.signs, this.BLANK);
                    break;
                case "4": 
                    cell = rules4(this.signs, this.BLANK);
                    break;
                case "5": 
                    cell = rules5(this.signs, this.BLANK);
                    break;
                case "6": 
                    cell = rules6(this.signs, this.BLANK);
                    break;
              }
           this.signs[cell[0]][cell[1]] = 'O'
           this.isXTurn = !this.isXTurn;
           return;
          },
        }
      }
</script>

<style>
   .resetButton {
        margin-top: 2em;
        margin-bottom: 2em;
      }
    .XClass {
        color: blue;
    }
    .OClass {
        color: red;
    }
</style>