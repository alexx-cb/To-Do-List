<script setup>
import { getCurrentUser } from 'vuefire';
import { useRouter } from 'vue-router';
import { useCurrentUser } from 'vuefire';
const router = useRouter();
const user = useCurrentUser();

router.beforeEach(async(to, from) => {
  if(to.meta.requireAuth){
    
    const user = await getCurrentUser();
    if(!user){
      return false;
    }else{
      return true;
    }
  }else{
    return true;
  }
    
})

</script>


<template>
  
<div class="app">

<nav>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink v-if="user" to="/recordatorios">Tasks</RouterLink>
  <RouterLink to="/login" v-if="!user">Log In</RouterLink>
  <RouterLink to="/login" v-else>Your Sesion</RouterLink>
</nav>

<RouterView></RouterView>
</div>
</template>


<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

nav {
  width: 25%;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  margin-top: 15px;
  border-radius: 5px;
  justify-content: space-around;
}

nav a {
  text-decoration: none;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
  color: white;
}

nav a:hover {
  background-color: #ddd;
}

</style>