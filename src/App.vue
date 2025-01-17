<script setup>
import { getCurrentUser } from 'vuefire';
import Login from './components/Login.vue';


import { useRouter } from 'vue-router';
const router = useRouter();

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

<Login></Login>
<RouterLink to="/">Incio</RouterLink>
<RouterLink to="/recordatorios">Lista recordatorios</RouterLink>

<RouterView></RouterView>

</template>


<style scoped>
</style>