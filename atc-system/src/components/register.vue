<template>
  <div id="">
    <div class="container">
      <section id="content">
        <form action="">
          <h1>REGISTER</h1>
          <div>
            <label for="username"></label><input type="text" placeholder="Username" required="" id="username" v-model="credentials.username"/>
          </div>
          <div>
            <label for="password"></label><input type="password" placeholder="Password" required="" id="password" v-model="credentials.password" />
          </div>
          <div>
            <input v-on:click.prevent="register()" type="submit" value="Submit" />
            <div><h1 id="ans"></h1></div>

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
      credentials: {
        username: "",
        password: "",
      },
    }
  },
  methods: {
      register: function () {
        this.$http.post(this.url, this.credentials).then(function (data) {
          console.log(data);
          if (data.status === 200) {
            $('#ans').html("Successfully registered !");
          }
        },(error) => {
          console.log(error);
          $('#ans').html("Username already exists !");
        });
      }
  },
  computed: {

  }
}
</script>

<style>
#ans {
  color: chartreuse;
}
</style>
