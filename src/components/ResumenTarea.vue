<script setup>

import { computed } from 'vue';
const props = defineProps(["pendientes"]);
const emits = defineEmits(["eliminarAcabadas"]);

const numeroTareasPendientes = computed (()=>{
    return props.pendientes.filter( (tarea)=> !tarea.acabada).length;
});

const tareasTotales = computed(()=>{
  return props.pendientes.length;
})

function eliminarCompletadas() {
  emits('eliminarAcabadas');
}

</script>


<template>
  <div class="resumen-tarea">
    <hr>
    <p>{{ numeroTareasPendientes }} tareas pendientes de {{ tareasTotales }} <button @click="eliminarCompletadas">Eliminar Terminadas</button></p>
    <hr>
  </div>
</template>


<style scoped>
.resumen-tarea {
  margin-top: 15px;
  width: 100%;
  text-align: center;
}
.resumen-tarea button {
  margin-left: 10px;
}

p{
  font-size: 17px;
}

button{
  padding: 5px;
}

hr{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>