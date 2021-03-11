<template>
  <div id="atc">
    <section id="content">
      <form>
        <h1>GARAGE</h1>
      </form>
    </section>

    <section id="content">
      <form action="">
        <h1>DELETE</h1>
        <div>
          <input
            type="text"
            placeholder="Id"
            required=""
            id="id"
            v-model="deleteAircraftId"
          />
        </div>

        <div>
          <input v-on:click.prevent="dilit()" type="submit" value="Submit" />
        </div>
      </form>
    </section>
    <section id="content">
      <form action="">
        <h1>Add Airplane</h1>
        <div>
          <input
            type="text"
            placeholder="Id"
            required=""
            id="id"
            v-model="addAircraft.id"
          />
          <input
            type="text"
            placeholder="Name"
            required=""
            id="id"
            v-model="addAircraft.name"
          />
          <input
            type="text"
            placeholder="Model"
            required=""
            id="id"
            v-model="addAircraft.model"
          />
        </div>

        <div>
          <input v-on:click.prevent="add()" type="submit" value="Submit" />
        </div>
      </form>
    </section>
    <section id="content">
      <form action="">
        <h1>EDIT</h1>
        <div>
          <input
            type="text"
            placeholder="Id"
            required=""
            id="id"
            v-model="editAircraft.id"
          />
        </div>
        <input
          type="text"
          placeholder="Name"
          required=""
          id="id"
          v-model="editAircraft.name"
        />
        <input
          type="text"
          placeholder="Model"
          required=""
          id="id"
          v-model="editAircraft.model"
        />
        <div>
          <input v-on:click.prevent="edit()" type="submit" value="Submit" />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editUrl: "http://localhost:8080/api/v1/atcCRUD/update/",
      addUrl: "http://localhost:8080/api/v1/atcCRUD",
      deleteUrl: "http://localhost:8080/api/v1/atcCRUD/",
      addAircraft: {
        id: "",
        name: "",
        model: "",
      },
      editAircraft: {
        id: "",
        name: "",
        model: "",
      },
      deleteAircraftId: "",
    };
  },
  methods: {
    edit: function () {
      this.$http
        .put(this.editUrl + this.editAircraft.id, this.editAircraft)
        .then(function (data) {
          console.log(data);
        });
    },
    add: function () {
      this.$http.post(this.addUrl, this.addAircraft).then(function (data) {
        console.log(data);
      });
    },
    dilit: function () {
      this.$http
        .delete(this.deleteUrl + this.deleteAircraftId)
        .then(function (data) {
          console.log(data);
        });
    },
  },
};
</script>

<style>
</style>