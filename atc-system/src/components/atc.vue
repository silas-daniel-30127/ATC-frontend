<template>
  <div id="atc">
    <section id="content">
      <form>
        <h1>All airplanes</h1>
        <div id="show-aircraft">
          <h2>
            <label for="airline"></label>
            <select id="airline" v-model="selected" v-on:click.prevent="fillText()">
              <option id="con" v-for="airplane in airplanes" :value="airplane" :key="airplane.id">Id {{ airplane.id }} - {{ airplane.name }}
                -
                {{ airplane.altitude }}
              </option>
            </select></h2>
        </div>
      </form>
    </section>

    <section id="content">
      <form>
        <div>
          <div id="time">
<!--            <button v-on:click.prevent="ResetChart">Reset</button>-->
            <button v-on:click.prevent="showChart()">Display</button>
            Time: {{ timeAxis }}</div>
          <div id="myDiv">
            <!-- Plotly chart will be drawn inside this DIV -->
          </div>
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
          <input v-on:click.prevent="launch()" type="submit" value="Submit"/>
          <input v-on:click.prevent="launchAll()" type="submit" value="Launch All"
          />
        </div>
      </form>
    </section>

    <section id="content">
      <form action="">
        <h1>TAKEOFF</h1>
        <div>
          <label for="id"></label>
          <label>
            <input
              type="text"
              placeholder="Id"
              required=""
              v-model="idTakeoff"
            />
          </label>
          <label for="alt"></label><input
          type="text"
          placeholder="Altitude"
          required=""
          id="alt"
          v-model="altitude"
        />
        </div>

        <div>
          <input v-on:click.prevent="takeoff()" type="submit" value="Submit"/>
        </div>
      </form>
    </section>
    <section id="content">
      <form action="">
        <h1>LAND</h1>
        <div>
          <label>
            <input
              type="text"
              placeholder="Id"
              required=""
              v-model="idLand"
            />
          </label>
        </div>

        <div>
          <input v-on:click.prevent="land()" type="submit" value="Submit"/>
        </div>
      </form>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {

      selected: {
      },
      administrator: '',
      altitude: '',
      timer: '',
      idTakeoff: "",
      idLand: "",
      idLaunch: "",
      airplanes: [],
      show: false,
      layout: {
        title: {
          text: "Airline dashboard",
          font: {
            family: "Helvetica, Arial",
            size: 25,
            color: "#7f7f7f",
          },
          xref: "paper",
          x: 0.05,
        },
        xaxis: {
          title: {
            text: "Time (sec)",
            font: {
              family: "Courier New, monospace",
              size: 18,
              color: "#7f7f7f",
            },
          },
        },
        yaxis: {
          title: {
            text: "Altitude (m)",
            font: {
              family: "Courier New, monospace",
              size: 18,
              color: "#7f7f7f",
            },
          },
        },
      },
      timeAxis: 0,
      chartData: [],
      native: 'http://localhost:8080/'
    };
  },
  methods: {
    fillText() {
      console.log(this.selected)
      this.idLand = this.selected.id;
      this.idTakeoff = this.selected.id;
      this.idLaunch = this.selected.id;
    },
    takeoff() {
      let element = this.airplanes.filter(e =>
        e.id === parseInt(this.idTakeoff)
      );
      if (element[0] !== null) {
        console.log(element[0]);
        if (element[0].altitude === 0) {
          element[0].altitude = this.altitude;
          this.startNew(element[0]);
        } else {
          element[0].altitude = this.altitude;
        }
      }
      this.$http
        .post(this.native + "api/v1/atc/takeoff/" + this.idTakeoff, this.altitude).then(function (data) {
        console.log(data);
      });


    },
    land() {
      this.$http.post(this.native + "api/v1/atc/land/" + this.idLand).then(function (data) {
        console.log(data)
      });
      let element = this.airplanes.filter(e =>
        e.id === parseInt(this.idLand)
      );
      element[0].altitude = 0;
    },
    launch() {
      this.$http.post(this.native + "api/v1/atc/launch/" + this.idLaunch).then(function (data) {
        console.log(data);
      });

    },
    launchAll() {
      this.$http.post(this.native + "api/v1/atc/launchAll").then(function (data) {
        console.log(data);
      });

    },
    startNew(trace) {
      this.chartData.push(trace);
    },
    updateChart() {
      this.timeAxis++;


      this.chartData.forEach((element) => {
        element.x.push(this.timeAxis);
        let lastY = element.y[element.y.length - 1];
        let rand = Math.random();
        if (Math.abs(lastY - element.altitude) < 50) {
          /*** cruising*/
          element.y.push(element.altitude - 2 + Math.floor(rand * 4));
          if (element.altitude === 0) {
            this.stop(element.id);
          }
        } else if (element.altitude >= lastY) {
          /*** ascending*/
          element.y.push(lastY + Math.floor(rand * 33));
        } else if (element.altitude < lastY) {
          /*** descending*/
          element.y.push(lastY - Math.floor(rand * 50));
        }
        if (element.y.length > 100) {
          element.y.shift();
          element.x.shift();
        }
      });
      Plotly.newPlot("myDiv", this.chartData, this.layout);
    },
    showChart() {
      if (this.show === false) {
        this.timer = setInterval(this.updateChart, 1000);
        this.show = true;
      } else if (this.show === true) {
        clearInterval(this.timer);
        this.show = false;
        $("#myDiv").html("");
      }
    },
    stop(trace) {
      console.log(trace);
      this.chartData = this.chartData.filter(function (el) {
        return el.id !== trace;
      });
    }
  },
  created() {
    this.$http
      .get("http://localhost:8080/api/v1/atcCRUD")
      .then(function (data) {
        console.log(data);
        data.body.forEach((element) => {
          this.airplanes.push({
            id: element.id,
            name: "" + element.id + " " + element.name,
            model: element.model,
            altitude: 0,
            x: [0],
            y: [0],
            type: "scatter",
          });
        });
      });
   // this.selected = this.airplanes.find(i => i.id === this.selected);
  },
};
</script>

<style>
select {
/ / A reset of styles, including removing the default dropdown arrow appearance: none;
/ / Additional resets for further consistency background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  text-align-last: center;
}
</style>
