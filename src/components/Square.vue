<template>
    <button class="gameButton"
    v-bind:class=PClass
    v-on:click="handleClickSquare">
        {{ sign_value }} 
    </button>

</template>

<script>
    export default {
        updated() {
            if (this.sign_value == 'O'){
                this.PClass = "OClass";
            }
            else if (this.sign_value == 'X'){
                this.PClass = "XClass";
            }
            else {
                this.PClass = "DClass";
             }
        },

        props: {
            sign_value: String,
            no: Number,
            xTurn: Boolean,
        },
        data() {
          return {
            PClass: "DClass",
          }
        },
        methods: {
         handleClickSquare(){
            this.$parent.handleClickSquare(this.no);
          }
        }
      }
</script>

<style>
    .gameButton {
        height:75px;
        width:75px;
        font-size: 25px;
      }
    .XClass {
        color: blue;
    }
    .OClass {
        color: red;
    }
    .DClass {
        color: black;
    }
</style>