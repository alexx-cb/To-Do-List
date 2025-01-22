<script setup>
import Tarea from './Tarea.vue';
import Cabecera from './Cabecera.vue';
import TareasPendientes from './ResumenTarea.vue';
import Pie from './Pie.vue';
import { useCollection, useCurrentUser, useFirestore } from 'vuefire'
import { collection, addDoc, orderBy , query, deleteDoc, doc, updateDoc, where} from 'firebase/firestore';


const db = useFirestore();
const usuario = useCurrentUser();

let listaTarea;
if(usuario.value && usuario.value.email === "admin@gmail.com"){
  listaTarea = useCollection(query(collection(db, 'Recordatorios'), orderBy("prioridad", "desc")));
}else{
  listaTarea = useCollection(query(collection(db, 'Recordatorios'), where('usuario', '==', usuario.value.email), orderBy("prioridad", "desc")));
}

function nuevaNota(texto){
    console.log("creada");

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
  <div class="recordatorios">
    <Cabecera v-on:nuevo="nuevaNota"></Cabecera>
    
    <TareasPendientes :pendientes="listaTarea" v-on:eliminarAcabadas="eliminarAcabadas"></TareasPendientes>
  
    <transition-group name="list" tag="div" class="listaTarea">
      <Tarea v-for="(tarea, posicion) in listaTarea" 
        :key="tarea.id" 
        :titulo="tarea.Titulo" 
        :fecha="tarea.fechaCreacion" 
        :posicion="posicion" 
        :acabada="tarea.acabada" 
        :prioridad="tarea.prioridad"
        :usuario="tarea.usuario"
        v-on:borrado="borrarTarea(posicion)" 
        v-on:acabada="tareaFinalizada(posicion)"
        v-on:cambiarPrioridad="cambiarPrioridad">
      </Tarea>
    </transition-group>
  
    
  </div>
  <Pie></Pie>
</template>


<style scoped>
.recordatorios {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0d0d0e;
  border-radius: 7px;
  padding: 30px;
}
.listaTarea {
  width: 100%;
  margin: 20px 0;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}

.list-enter, .list-leave-to /* .list-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

</style>