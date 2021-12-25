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
    </div>
</template>

<script>
    import Square from './Square.vue'
    export default {

        props: {
            onePlayer: Boolean
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
                pname : ''
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
            if (this.onePlayer && !this.won && !this.isXTurn){
                this.computerPlay();
                this.pname = this.calculateWinner();
                if (this.pname){
                    this.won = true;
              }
            }
          },
          computerPlay: function () {
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
            let hit = false;
            // check if I can be a winner!
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (this.signs[a[0]][a[1]] == this.BLANK && this.signs[b[0]][b[1]] == 'O' 
                  && this.signs[c[0]][c[1]] == 'O') {
                      this.signs[a[0]][a[1]] = 'O';
                      hit = true;
                      break;
                  }
                else if (this.signs[a[0]][a[1]] == 'O' && this.signs[b[0]][b[1]] == this.BLANK 
                  && this.signs[c[0]][c[1]] == 'O') {
                      this.signs[b[0]][b[1]] = 'O';
                      hit = true;
                      break;
                } 
                else if (this.signs[a[0]][a[1]] == 'O' && this.signs[b[0]][b[1]] == 'O' 
                  && this.signs[c[0]][c[1]] == this.BLANK) {
                      this.signs[c[0]][c[1]] = 'O';
                      hit = true;
                      break;
                }   
            }
            // if I can stop winning competitor.
            if (!hit){
                for (let i = 0; i < lines.length; i++) {
                    const [a, b, c] = lines[i];
                    if (this.signs[a[0]][a[1]] == this.BLANK && this.signs[b[0]][b[1]] == 'X' 
                    && this.signs[c[0]][c[1]] == 'X') {
                        this.signs[a[0]][a[1]] = 'O';
                        hit = true;
                        break;
                    }
                    else if (this.signs[a[0]][a[1]] == 'X' && this.signs[b[0]][b[1]] == this.BLANK 
                    && this.signs[c[0]][c[1]] == 'X') {
                        this.signs[b[0]][b[1]] = 'O';
                        hit = true;
                        break;
                    } 
                    else if (this.signs[a[0]][a[1]] == 'X' && this.signs[b[0]][b[1]] == 'X' 
                    && this.signs[c[0]][c[1]] == this.BLANK) {
                        this.signs[c[0]][c[1]] = 'O';
                        hit = true;
                        break;
                    }   
                }
            }
            // check if the middle square is vacant
            if (!hit){
                if (this.signs[1][4] == this.BLANK){
                    this.signs[1][4] = 'O';
                    hit = true;
                }
            }
            if (!hit){
                let blanks = [];
                [[0, 0], [0, 2], [2, 6], [2, 8]].forEach(el => {
                    if (this.signs[el[0]][el[1]] == this.BLANK){
                            blanks.push(el);
                        }
                });
                console.log('Goushe...');
                console.log(blanks);
                if (blanks.length > 0){
                    const rndCell = blanks[Math.floor(Math.random() * blanks.length)];
                    this.signs[rndCell[0]][rndCell[1]] = 'O'
                    hit = true;
                }
            }
            if (!hit){
                let blanks = [];
                for (let i = 0; i < 3; i++){
                    for ( let key in this.signs[i]) {
                        if (this.signs[i][key] == this.BLANK){
                            blanks.push([i, key])
                        }
                    }
                }
                console.log('Last...');
                console.log(blanks);
                if (blanks.length > 0){
                    const rndCell = blanks[Math.floor(Math.random() * blanks.length)];
                    this.signs[rndCell[0]][rndCell[1]] = 'O'
                    hit = true;
                }
           }
           this.isXTurn = !this.isXTurn;
           return;
          },
          fillBlank: function () {
            this.signs.forEach(element => {
              for (var k in element){
                element[k] = this.BLANK;
              }
            });
            this.won = false;
            this.isXTurn = true;
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
          }
        }
      }
</script>

<style>
   .resetButton {
        margin-top: 2em;
      }
    .XClass {
        color: blue;
    }
    .OClass {
        color: red;
    }
</style>