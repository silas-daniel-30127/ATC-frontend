<template>
  <div id="login">
    <div class="container">
        <section id="content">
            <form action="">
                <h1>Administrator</h1>
                <div>
                    <input type="text" placeholder="Username" required="" id="username" v-model="credentials.username"/>
                </div>
                <div>
                    <input type="password" placeholder="Password" required="" id="password" v-model="credentials.password" />
                </div>
                <div>
                    <input v-on:click.prevent="post()" type="submit" value="Log in" />
                    <a href="#" v-on:click.prevent="alert1()">About</a>
                </div>
            </form>
        </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'http://localhost:8080/api/v1/crud',
      loginurl: 'http://localhost:8080/api/v1/login',
      credentials: {
        username: "",
        password: "",
      },
      logged: false
    }
  },
  methods: {
      post: function() {
        // console.log(this.credentials.username + '\n' + this.credentials.password);
       this.$http.post(this.loginurl, this.credentials).then(function(data) {
          var token = JSON.parse(data.bodyText);
          if(token.access === true) {
            this.logged = true;
            window.location.href = "http://localhost:8081/atc";
          } else {
            console.log(data);
          }
        });
      },
      alert1: function() {
        alert("Made by Daniel \n2021");
      }
  },
  computed: {

  }
}
</script>

