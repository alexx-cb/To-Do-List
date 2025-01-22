<script setup>


import { computed, ref } from 'vue';
const props = defineProps(["pendientes"]);
const emits = defineEmits(["eliminarAcabadas"]);

const TareaNumero = computed(()=>{
  if(props.pendientes.filter( (tarea)=> !tarea.acabada).length<=1){
    return TareaNumero.value = "Tarea";
  }else{
    return TareaNumero.value = "Tareas";
  }
});

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
    <p>{{ numeroTareasPendientes }} {{ TareaNumero }} pendientes de {{ tareasTotales }} |<span @click="eliminarCompletadas"> × Eliminar tareas completadas</span></p>
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

span{
  color: #eca219;
}
span:hover{
  cursor: pointer;
  color: #b57b10;
}

hr{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>