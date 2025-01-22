<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps(["titulo", "fecha", "posicion", "prioridad", "acabada", "usuario"]);
const emit = defineEmits(["borrado", "cambiarPrioridad", "acabada"]);


const tiempoTranscurrido = ref("");

const calcularTiempoTranscurrido = () => {
  const ahora = Date.now();
  const diferencia = ahora - props.fecha;
  const minutos = Math.floor(diferencia / 60000);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  const minutosRestantes = minutos % 60;
  const horasRestantes = horas % 24;

  tiempoTranscurrido.value = `Creada hace ${dias} días, ${horasRestantes} horas y ${minutosRestantes} minutos`;
};

onMounted(() => {
    calcularTiempoTranscurrido();
    const interval = setInterval(calcularTiempoTranscurrido, 60000);
    onUnmounted(() => {
      clearInterval(interval);
    });
});

watch(() => props.fecha, calcularTiempoTranscurrido);


const acabada = () => {
  emit('acabada', props.posicion);
};
  
const cambiarPrioridad = (nuevaPrioridad) => {
  emit('cambiarPrioridad',  {posicion: props.posicion, nuevaPrioridad });
};


</script>

<template>
  <div class="tarea">
    <div class="header">
      <input class="rounded-checkbox" type="checkbox" @change="acabada" :checked="props.acabada">
      <h1 :class="{ tachado: props.acabada }" id="titulo">{{ titulo }}</h1>
      <button class="borrar" @click="$emit('borrado')">Borrar</button>
    </div>
    
    <div id="cositas">
      <p>Prioridad: </p>
      <button 
        @click="cambiarPrioridad(1)" 
        :class="{ active: prioridad === 1, bajo: prioridad === 1  }"
      >
        LOW
      </button>
      <button 
        @click="cambiarPrioridad(2)" 
        :class="{ active: prioridad === 2,medio: prioridad === 2  }"
      >
        MEDIUM
      </button>
      <button 
        @click="cambiarPrioridad(3)" 
        :class="{ active: prioridad === 3, alto: prioridad === 3 }"
      >
        HIGH
      </button>
    </div>
    <span class="fecha">{{ tiempoTranscurrido }}</span>
    
  </div>
</template>

<style scoped>
.tarea {
  width: 100%;
  height: 10%;
  margin: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: black;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 7px;
}
input[type="checkbox"]:checked{
  background-color: transparent;
  border: 3px solid green;
}

input[type="checkbox"]:checked::before {
  content: '✔';
  position: absolute;
  transform: translate(-50%, -50%);
  margin-left: 10px;
  margin-top: 4px;
  display: block;
  text-align: center;
  color: green;
  font-size: 25px;
}


.rounded-checkbox {
  width:35px;
  height: 35px;
  border-radius: 50%;
  vertical-align: middle;
  border: 3px solid white;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}

#titulo {
  margin-left: 10px;
}

#titulo.tachado {
  text-decoration: line-through;
  color: green;
}

#cositas {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
}

.borrar {
  position: absolute;
  margin-left: 675px;
  margin-top: 50px;
  padding-top: 7px;
  padding-bottom: 7px;
}

.fecha {
  margin-top: 10px;
  align-self: flex-start;
}

button.active {
  background-color: #4CAF50;
  color: white;
  border-radius: 7px;
}

button.bajo.active {
  background-color: blue;
  color: white;

}

button.medio.active{
  background-color: #4CAF50;
  color: white;
}

button.alto.active{
  background-color: red;
  color: white;
}

button:not(.active) {
  opacity: 0.6;
}
</style>