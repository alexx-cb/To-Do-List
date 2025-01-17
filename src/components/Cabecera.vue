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
    <h1>Cabecera</h1>

    <input type="text" placeholder="Nueva Nota" v-model="contenido" v-on:keyup.enter="nuevaNota">

    
</template>


<style scoped>

</style>