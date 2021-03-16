<template>
  <div>
    <app-header></app-header>
      <router-view></router-view>
  </div>
</template>

<script>
import logIn from './components/login';
import atc from './components/atc';
import header from './components/header';
import register from './components/register';
export default {
  components: {
    'login': logIn,
    'atc': atc,
    'app-header': header,
    'register': register
  },

  methods: {

  },
  computed: {

  }
}
</script>

