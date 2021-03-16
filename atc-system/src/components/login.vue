<template>
  <div id="login">
    <div class="container">
      <section id="content">
        <form action="">
          <h1>Administrator</h1>
          <div>
            <label for="username"></label><input type="text" placeholder="Username" required="" id="username"
                                                 v-model="credentials.username"/>
          </div>
          <div>
            <label for="password"></label><input type="password" placeholder="Password" required="" id="password"
                                                 v-model="credentials.password"/>
          </div>
          <div>
            <input v-on:click.prevent="handleSubmit()" type="submit" value="Log in"/>
            <a href="#" v-on:click.prevent="alert1()">About</a>
            <div><h1 id="ans"></h1></div>
            <br>
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
      loginUrl: 'http://localhost:8080/api/v1/login',
      credentials: {
        username: "",
        password: "",
      },
      logged: false
    }
  },
  methods: {
    handleSubmit() {
      this.$http.post(this.loginUrl, this.credentials).then(function (data) {
        if (data.body.access === true) {
          this.logged = true;
          this.$router.push("/atc");
        } else {
          $('#ans').html("Incorrect username or password !");
        }
        console.log(data);
      });
      // localStorage.setItem('token', this.logged);
      // this.$store.dispatch('user', this.credentials)
    },
    alert1() {
      alert("Made by Daniel \n2021");
    }
  },
  computed: {}
}
</script>

