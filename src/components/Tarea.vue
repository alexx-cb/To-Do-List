<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps(["titulo", "fecha", "posicion", "prioridad", "acabada", "usuario"]);
const emit = defineEmits(["borrado", "cambiarPrioridad", "acabada"]);


const tiempoTranscurrido = ref("");

const calcularTiempoTranscurrido = () => {
  const ahora = Date.now();
  const diferencia = ahora - props.fecha;
  const minutos = Math.floor(diferencia / 60000);
  tiempoTranscurrido.value = `creada hace ${minutos} min`;
};

onMounted(() => {
    calcularTiempoTranscurrido();
    const interval = setInterval(calcularTiempoTranscurrido, 60000);
    onUnmounted(() => {
      clearInterval(interval);
    });
});

const acabada = () => {
  emit('acabada', props.posicion);
};
  
const cambiarPrioridad = (nuevaPrioridad) => {
  emit('cambiarPrioridad',  {posicion: props.posicion, nuevaPrioridad });
};


</script>

<template>

<div>
  <button @click="acabada">O</button>
  <h1 id="titulo">{{ titulo }}</h1>
  <div id="cositas">
    <button 
      @click="cambiarPrioridad(1)" 
      :class="{ active: prioridad === 1 }"
    >
      LOW
    </button>
    <button 
      @click="cambiarPrioridad(2)" 
      :class="{ active: prioridad === 2 }"
    >
      MEDIUM
    </button>
    <button 
      @click="cambiarPrioridad(3)" 
      :class="{ active: prioridad === 3 }"
    >
      HIGH
    </button>
    <span>{{ tiempoTranscurrido }}</span>
  </div>
  <button @click="$emit('borrado')">Borrar</button>
</div>
  


</template>

<style scoped>
#titulo{
  width: 300px;
}
#cositas{
  width: 300px;
}

button.active {
  background-color: #4CAF50;
  color: white;
}
button:not(.active) {
  opacity: 0.6;
}
</style>