<script setup>
import { getCurrentUser } from 'vuefire';
import { useRouter } from 'vue-router';
const router = useRouter();
import Login from './components/Login.vue';

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
  <RouterLink to="/">Incio </RouterLink>
  <RouterLink to="/recordatorios">Lista recordatorios</RouterLink>
</nav>
<Login></Login>

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


</style>