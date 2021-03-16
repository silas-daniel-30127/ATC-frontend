<template>
  <nav>
    <ul>
      <li id="register">
        <router-link to="/login" exact>Login</router-link>
      </li>
      <li>
        <router-link to="/atc" exact>Air Traffic</router-link>
      </li>
      <li>
        <router-link to="/" exact>Airport</router-link>
      </li>
      <li id="register">
        <router-link to="/register" exact>Register</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {}

</script>

<style>
#register {
  float: right;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}

.router-link-active {
  background: #eee;
  color: #444;
}
</style>
