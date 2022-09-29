<template>
  <div></div>
</template>

<script>
  import axios from 'axios'
export default {
name:'App',
created(){
  axios.get('/spi/mews').then(res=>{
    console.log(res);
  })
  axios.post('/api/mews').then(res=>{
    console.log(res);
  })
}
}
</script>

<style>

</style>
