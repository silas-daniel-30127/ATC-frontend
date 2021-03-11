<template>
  <div id="atc">
    <section id="content">
      <form>
        <h1>All airplanes</h1>
        <div id="show-aircrafts">
          <table border="11">
            <tr>
              <th>
                <h1>Id</h1>
              </th>
              <th><h1>Name</h1></th>
              <th><h1>Model</h1></th>
            </tr>
            <tr v-for="airplane in airplanes">
              <th>{{ airplane.id }}</th>
              <th>{{ airplane.name }}</th>
              <th>{{ airplane.model }}</th>
            </tr>
          </table>
          <br /><br />
        </div>
      </form>
    </section>

    <section id="content">
      <form action="">
        <h1>LAUNCH</h1>
        <div>
          <input
            type="text"
            placeholder="Id"
            required=""
            id="id"
            v-model="idLaunch"
          />
        </div>

        <div>
          <input v-on:click.prevent="launch()" type="submit" value="Submit" />
        </div>
      </form>
    </section>

    <section id="content">
      <form action="">
        <h1>LAUNCH ALL</h1>
        <div>
          <input
            v-on:click.prevent="launchAll()"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </section>

    <section id="content">
      <form action="">
        <h1>TAKEOFF</h1>
        <div>
          <input
            type="text"
            placeholder="Id"
            required=""
            id="id"
            v-model="idTakeoff"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Altitude"
            required=""
            id="alt"
            v-model="altitude"
          />
        </div>

        <div>
          <input v-on:click.prevent="takeoff()" type="submit" value="Submit" />
        </div>
      </form>
    </section>
    <section id="content">
      <form action="">
        <h1>LAND</h1>
        <div>
          <input
            type="text"
            placeholder="Id"
            required=""
            id="id"
            v-model="idLand"
          />
        </div>

        <div>
          <input v-on:click.prevent="land()" type="submit" value="Submit" />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "http://localhost:8080/api/v1/atc/",
      idTakeoff: "",
      idLand: "",
      idLaunch: "",
      privateJet: {
        id: 0,
        name: "",
        model: "",
        color: "black",
      },
      altitude: "",
      airplanes: [],
    };
  },
  methods: {
    takeoff: function () {
      this.$http
        .post(this.url + "/takeoff/" + this.idTakeoff, this.altitude)
        .then(function (data) {
          console.log(data);
        });
    },
    land: function () {
      this.$http.post(this.url + "/land/" + this.idLand).then(function (data) {
        console.log(data);
      });
    },
    launch: function () {
      this.$http
        .post(this.url + "launch/" + this.idLaunch)
        .then(function (data) {
          console.log(data);
        });
    },
    launchAll: function () {
      this.$http.
      post(this.url + "launchAll")
      .then(function (data) {
        console.log(data);
      });
    },
    addPrivatePlane: function () {},
  },
  created() {
    this.$http
      .get("http://localhost:8080/api/v1/atcCRUD")
      .then(function (data) {
        this.airplanes = data.body;
      });
  },
};
</script>