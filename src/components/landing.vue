<script setup>
import { RouterLink } from 'vue-router';
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import Pie from './Pie.vue';

const user = useCurrentUser();


</script>


<template>
  <div class="landing">
    <!-- Título principal -->
    <header class="landing-header">
      <h1 class="title">Organiza tu Vida con Nuestra Web de Recordatorios</h1>
      <p class="subtitle">Crea, prioriza y gestiona tus tareas de forma sencilla y eficiente.</p>
    </header>
    
    <!-- Sección de características -->
    <section class="features">
      <h2 class="features-title">Características</h2>
      <ul class="features-list">
        <li>✔ Añade tus recordatorios rápidamente con una interfaz intuitiva.</li>
        <li>✔ Organiza tus tareas por prioridad para mantenerte enfocado.</li>
        <li>✔ Marca tareas como completadas o elimínalas fácilmente.</li>
      </ul>
    </section>
    
    <!-- Sección de acciones (botones) -->
    <section class="actions">
      <RouterLink to="/login">
        <button v-if="!user" class="btn-primary">Iniciar Sesión</button>
        <button v-else class="btn-primary">Ir a tu Sesión</button>
      </RouterLink>
      <RouterLink v-if="user" to="/recordatorios">
        <button class="btn-secondary">Ir a tus Tareas</button>
      </RouterLink>
    </section>
  </div>
  <Pie></Pie>
</template>

<style scoped>
/* Estilos generales */
.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 20px;
  height: 100vh; /* Ocupa el 100% de la altura de la ventana */
  max-height: 78vh; /* Limita la altura máxima */
  font-family: 'Arial', sans-serif;
  background: #2c2b2d;
  border-radius: 10px;
  overflow: auto; /* Asegura que el contenido no se desborde */
}

/* Estilo del header */
.landing-header {
  text-align: center;
  margin-bottom: 10px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff; /* Cambiado para contraste con el fondo negro */
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #ccc; /* Cambiado para mayor contraste */
  margin-bottom: 20px;
}

/* Estilo de las características */
.features {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
  overflow-y: auto; /* Permite desplazamiento si el contenido es largo */
}

.features-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
}

/* Estilo de la sección de acciones */
.actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}

/* Estilo de los botones */
button {
  font-size: 1rem;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  width: 100%;
  background-color: #eca219;
  color: black;
}

.btn-primary:hover {
  background-color: #b57b10;
}

.btn-secondary {
  width: 100%;
  background-color: #eca219;
  color: black;
}

.btn-secondary:hover {
  background-color: #b57b10;
}

/* Agregado para scroll visible si es necesario */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* Evita que la página principal tenga scroll */
}

</style>