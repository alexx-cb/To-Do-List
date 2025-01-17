<script setup>

import { computed } from 'vue';
const props = defineProps(["pendientes"]);
const emits = defineEmits(["eliminarAcabadas"]);

const numeroTareasPendientes = computed (()=>{
    return props.pendientes.filter( (tarea)=> !tarea.acabada).length;
});

function eliminarCompletadas() {
  emits('eliminarAcabadas');
}

</script>


<template>
    
    <p>{{ numeroTareasPendientes }} numero de tareas pendientes <button @click="eliminarCompletadas">Eliminar Terminadas</button></p>

</template>


<style scoped>

</style>