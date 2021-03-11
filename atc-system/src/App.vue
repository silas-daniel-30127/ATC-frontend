<template>
  <div>
    <app-header></app-header>
      <router-view></router-view>
  </div>
</template>

<script>
import logIn from './components/login';
import atc from './components/atc.vue';
import header from './components/header';
export default {
  components: {
    'login': logIn,
    'atc': atc,
    'app-header': header
  },
 
  methods: {
      
  },
  computed: {

  }
}
</script>

