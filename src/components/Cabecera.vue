<script setup>
import { ref } from 'vue';

const emits = defineEmits(['nuevo']);
var contenido = ref("");

function nuevaNota(){
    emits('nuevo', contenido.value);
    contenido.value="";
}

</script>


<template>
    <div class="cabecera">
        <h1>Proyecto Vue.js -- Alejandro Cabrera</h1>
        <input type="text" placeholder="¿Qué quieres recordar?" v-model="contenido" v-on:keyup.enter="nuevaNota">
    </div>
    
</template>


<style scoped>
.cabecera {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.cabecera input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 9px;
}

input{
  outline: none;
  text-decoration: none;
}

</style>