<template>
<div id="background">
  <div class="container" >
   <Navbar/>
   
      <router-view></router-view>
   
  </div>
  </div>
</template>

<style>
  #background{
    background-color: #e0ecff;
  }
  
</style>

<script>
import Navbar from './components/Navbar'
export default {
  components:{
    Navbar
  },
  methods:{
    
  }
}
</script>

