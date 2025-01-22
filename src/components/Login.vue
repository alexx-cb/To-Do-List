<script setup>
import { GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider } from 'firebase/auth';
import { signInWithPopup, signOut} from 'firebase/auth'

import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { useRouter } from 'vue-router';
import { authGit, provider } from '../firebase.js';



const router = useRouter();
const googleAuthProvider = new GoogleAuthProvider();
const user = useCurrentUser()
const auth = useFirebaseAuth()
const usuario = getAuth();


var email;
var password;

var emailIn;
var passwordIn;

function iniciarSesion(){
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
  createUserWithEmailAndPassword(usuario, email, password)
    .then((userCredential) => {
      const nuevoUsuario = userCredential.user;
      console.log("Usuario registrado:", nuevoUsuario);
      email="";
      password ="";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}

function iniciarSesionConEmail() {
  signInWithEmailAndPassword(auth, emailIn, passwordIn)
    .then((userCredential) => {
      console.log("Usuario autenticado:", userCredential.user);
      emailIn="";
      passwordIn="";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}

async function iniciarSesionGitHub() {
  try {
    const resultado = await signInWithPopup(authGit, provider);
    const user = resultado.user;
    const credential = GithubAuthProvider.credentialFromResult(resultado);
    const token = credential.accessToken;

    console.log('Usuario autenticado:', user);
    console.log('Token de GitHub:', token);
  } catch (error) {
    console.error('Error al iniciar sesión con GitHub:', error);
  }
}


</script>

<template>
    <div v-if="user">
      <p>Hola {{ user.displayName }}</p>
      <button @click="cerrarSesion">Cerrar Sesion</button>
    </div>
    
    <div v-else>
      <button @click="iniciarSesion">Iniciar Sesion con Google</button>
      <button @click="iniciarSesionGitHub">Iniciar Sesion con Github</button>
      <p>Registrarse</p>
      <form @submit.prevent="registrarUsuario">
        <input type="email" v-model="email" placeholder="Email" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit">Registrarse</button>
      </form>
      <p>Iniciar Sesion</p>
      <form @submit.prevent="iniciarSesionConEmail">
        <input type="email" v-model="emailIn" placeholder="Email" required>
        <input type="password" v-model="passwordIn" placeholder="Password" required>
        <button type="submit">Iniciar Sesion</button>
      </form>
    </div>
  </template>

<style scoped>
</style>