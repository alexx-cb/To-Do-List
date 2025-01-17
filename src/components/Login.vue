<script setup>
import { GoogleAuthProvider, getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue';
import { signInWithPopup, signOut} from 'firebase/auth'

import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { useRouter } from 'vue-router';

const router = useRouter();


const googleAuthProvider = new GoogleAuthProvider()
const user = useCurrentUser()
const auth = useFirebaseAuth()
const usuario = getAuth();

const email = ref('');
const password = ref('');

function inciarSesion(){
    signInWithPopup(auth, googleAuthProvider).then(

        ()=>console.log("Validacion Correcta")

    ).catch((reason) => {
    console.error('Failed sign', reason)
  })
}

function cerrarSesion(){
    signOut(auth).then(
        ()=>{
            console.log("se ha cerrado la sesion")
            router.push("/");
    }).catch(
        (e)=>console.log("se ha producido un error" + e)
    )
}

function registrarUsuario() {
  createUserWithEmailAndPassword(usuario, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuario registrado:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}


</script>

<template>
    <div v-if="user">
        <p>Hola {{ user.displayName }}</p>
        <button @click="cerrarSesion">Cerrar Sesion</button>
        
    </div>
    
    <div v-else>
        <button @click="inciarSesion">Inciar Sesion con Google</button>
        <p>Registrarse</p>
        <form @submit.prevent="registrarUsuario">
            <input type="text" v-model="email" placeholder="email" required>
            <input type="text" v-model="password" placeholder="password" required>
            <input type="submit" value="Registrarse">
        </form>
        
    </div>


</template>

<style scoped>
</style>