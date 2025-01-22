<script setup>
import Pie from './Pie.vue';
import { GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider } from 'firebase/auth';
import { signInWithPopup, signOut} from 'firebase/auth'

import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { useRouter } from 'vue-router';
import { authGit, provider } from '../firebase.js';
import { ref } from 'vue';

const mostrarFormulario = ref('registrarse');


const router = useRouter();
const googleAuthProvider = new GoogleAuthProvider();
const user = useCurrentUser()
const auth = useFirebaseAuth()
const usuario = getAuth();

var mensajeError = ref('');

var email;
var password;
var password2;

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
  if(password===password2){

  
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
  }else{
    mensajeError.value = "La contraseña no coincide.";
  }
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
      mensajeError.value = "La contraseña o el email son incorrectos"
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
  <div v-if="user" class="auth-container">
    <p class="nombre">Hola {{ user.displayName }}</p>
    <button @click="cerrarSesion" class="btn">Cerrar Sesión</button>
  </div>

  <div v-else class="auth-container">
    <transition name="fade" mode="out-in">
      <!-- Formulario de Iniciar Sesión -->
      <div v-if="mostrarFormulario === 'iniciarSesion'" class="form-container" key="iniciarSesion">
        <p class="form-title">Iniciar Sesión</p>
        <form @submit.prevent="iniciarSesionConEmail" class="form">
          <input type="email" v-model="emailIn" placeholder="Email" required class="input">
          <input type="password" v-model="passwordIn" placeholder="Contraseña" required class="input">
          <div v-if="mensajeError" class="error-message">{{ mensajeError }}</div>
          <button type="submit" class="btn">Iniciar Sesión</button>
        </form> 

        <div class="otrosMetodos">
          <button @click="iniciarSesion" class="btn"><font-awesome-icon :icon="['fab', 'google']"class="fa-2x" /></button>
          <button @click="iniciarSesionGitHub" class="btn"><font-awesome-icon :icon="['fab', 'github']"class="fa-2x" /></button>
        </div>
        
        <p class="form-footer">
          ¿No tienes una cuenta? 
          <a href="/login" @click.prevent="mostrarFormulario = 'registrarse'" class="link">Regístrate aquí</a>
        </p>
      </div>

      <!-- Formulario de Registro -->
      <div v-else-if="mostrarFormulario === 'registrarse'" class="form-container" key="registrarse">
        <p class="form-title">Registrarse</p>
        <form @submit.prevent="registrarUsuario" class="form">
          <input type="email" v-model="email" placeholder="Email" required class="input">
          <input type="password" v-model="password" placeholder="Contraseña" required class="input">
          <input type="password" v-model="password2" placeholder="Repite Contraseña" required class="input">
          <div v-if="mensajeError" class="error-message">{{ mensajeError }}</div>
          <button type="submit" class="btn">Registrarse</button>
        </form>
        <p class="form-footer">
          ¿Ya tienes una cuenta? 
          <a href="/login" @click.prevent="mostrarFormulario = 'iniciarSesion'" class="link">Inicia sesión aquí</a>
        </p>
      </div>
    </transition>
  </div>
  <Pie></Pie>
</template>

<style scoped>
/* Estilos generales */
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #2c2b2d;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
}

.form-container {
  width: 100%;
}

.form-title {
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
  color: #eca219;
}

.form {
  display: flex;
  flex-direction: column;
}

.otrosMetodos{
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.otrosMetodos button{
  flex: 1;
}

.icon{
  font-size: 4rem;
}

.input {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

.btn {
  padding: 10px;
  margin: 10px 0;
  background-color: #eca219;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}

.btn:hover {
  background-color: #b57b10;
}

.link {
  color: #eca219;
  text-decoration: none;
  cursor: pointer;
}

.link:hover {
  color: #b57b10;
  cursor: pointer;
}

.nombre{
  color: white;
  font-size: 20px;
}

.form-footer {
  text-align: center;
  margin-top: 10px;
  font-size: 0.9em;
  color: #555;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin: 10px 0;
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>