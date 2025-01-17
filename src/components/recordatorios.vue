<script setup>
import Tarea from './Tarea.vue';
import Cabecera from './Cabecera.vue';
import TareasPendientes from './ResumenTarea.vue';
import Pie from './Pie.vue';
import { useCollection, useCurrentUser, useFirebaseAuth, useFirestore } from 'vuefire'
import { collection, addDoc, orderBy , query, deleteDoc, doc, updateDoc, where} from 'firebase/firestore';


import { onMounted, watch, computed } from 'vue';


const db = useFirestore();
const auth = useFirebaseAuth();
const usuario = useCurrentUser();

var listaTarea = useCollection(query(collection(db, 'Recordatorios'),where('usuario', '==', usuario.value.uid), orderBy("prioridad", "desc")));


auth.onAuthStateChanged((user) => {
  usuario.value = user;
  if (user) {
    listaTarea.value;
  } else {
    listaTarea.value= [];
  }
});


onMounted(() => {
    const tareasGuardadas = localStorage.getItem('listaTarea');
    if (tareasGuardadas) {
      listaTarea.value = JSON.parse(tareasGuardadas);
    }
});

watch(listaTarea, (nuevaLista) => {
    localStorage.setItem('listaTarea', JSON.stringify(nuevaLista));
}, { deep: true });


function nuevaNota(texto){
    console.log("recibe");

    let altaNueva ={
        Titulo: texto,
        prioridad: 2,
        fechaCreacion: Date.now(),
        acabada:false,
        usuario: usuario.value.email
    }

    addDoc(collection(db, "Recordatorios"),altaNueva)
    .then((docRef)=>{
      console.log("documento escrito con ID" , docRef.id);
    }).catch((error)=>{
      console.log("ERROR: " +error);
    });

    
}

function borrarTarea(pos){
    var tarea = listaTarea.value[pos];

    deleteDoc(doc(db, "Recordatorios", tarea.id))
    .then(()=>{
      tarea.splice(pos, 1)

    }).catch((error)=>{
      console.log("ERROR: " +error);
    })
}

function tareaFinalizada(pos) {
  const tarea = listaTarea.value[pos];

  updateDoc(doc(db, "Recordatorios", tarea.id), { acabada: !tarea.acabada })
    .then(() => {
      tarea.acabada = !tarea.acabada;
    }).catch((error) => {
      console.log("ERROR: " + error);
    });
}

function eliminarAcabadas() {
  listaTarea.value.forEach((tarea,pos)=>{
    if(tarea.acabada){
      borrarTarea(pos);
    }
  })
}

function cambiarPrioridad({ posicion, nuevaPrioridad }) {
  const tarea = listaTarea.value[posicion];

  updateDoc(doc(db, "Recordatorios", tarea.id), { prioridad: nuevaPrioridad })
    .then(() => {
      tarea.prioridad = nuevaPrioridad;
    }).catch((error) => {
      console.log("ERROR: " + error);
    });
}

</script>

<template>
  
    <Cabecera v-on:nuevo="nuevaNota"></Cabecera>

    <TareasPendientes :pendientes="listaTarea" v-on:eliminarAcabadas="eliminarAcabadas"></TareasPendientes>
  
    <Tarea v-for="(tarea, posicion) in listaTarea" 
    :key="posicion" 
    :titulo="tarea.Titulo" 
    :fecha="tarea.fechaCreacion" 
    :posicion="posicion" 
    :acabada="tarea.acabada" 
    :prioridad="tarea.prioridad"
    :usuario = "tarea.usuario"

    v-on:borrado="borrarTarea(posicion)" 
    v-on:acabada="tareaFinalizada(posicion)"
    v-on:cambiarPrioridad="cambiarPrioridad">
    </Tarea>

    <Pie></Pie>

</template>

<style scoped>
</style>