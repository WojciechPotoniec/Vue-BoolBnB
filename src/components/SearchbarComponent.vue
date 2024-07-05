<template>
  <div id="searchbar" class="mt-3">
    <div class="d-flex container justify-content-between pt-2">
      <div id="searchbar_input" class="px-3">
        <label for="destination">where</label>
        <input id="address" list="locality" type="text" aria-label="Destination" class="form-control"
          placeholder="Search Destination" v-model="this.store.destination" @keyup.enter="search"  @input ="suggestion"/>
        <datalist id="locality">
        </datalist>
      </div>
      <div>
        <select class="form-select" id="radius" v-model="radius">
          <option value="20" selected>20 km</option>
          <option value="25">25 km</option>
          <option value="30">30 km</option>
          <option value="180">180 km</option>
        </select>
      </div>
     <!--  test push -->
      <!-- <div>
        <label for="guests">Ospiti</label>
        <input
          type="text"
          aria-label="Guests"
          class="form-control"
          placeholder="Aggiungi ospiti"
          v-model="searchQuery.guests"
        />
      </div> -->
      <button class="btn" @click="search">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store.js";
import { router } from "../router.js";
import { TOMTOM_API_KEY } from "../../config";

export default {
  name: "SearchbarComponent",
  data() {
    return {
      store,
      router,
      /* searchQuery: {
        destination: "",
      }, */
      params: null,
      latitude: "",
      longitude: "",
      radius: 20,
      result: [],
    };
  },
  methods: {
    async suggestion() {
      const url2 = `https://api.tomtom.com/search/2/search/${encodeURIComponent(this.store.destination)}.json?key=${TOMTOM_API_KEY}&countrySet=it-IT&limit=10`;
      try {
        const response = await fetch(url2);
        const data = await response.json();
        const myArray = data.results.map(result => result.address);
        const datalist = document.getElementById('locality');
        datalist.innerHTML = '';
        myArray.forEach(result => {
          let suggest = document.createElement('option');
          if (result.streetName && result.municipality && result.postalCode) {
            suggest.value = `${result.streetName}, ${result.municipality}, ${result.postalCode}`;
          } else if (result.streetName) {
            suggest.value = result.streetName;
          } else if (result.municipality) {
            suggest.value = result.municipality;
          } else if (result.postalCode) {
            suggest.value = result.postalCode;
          }
          datalist.append(suggest);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async search() {
      if (!this.store.destination) {
        alert("Per favore inserisci una destinazione.");
        return;
      }
      const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(this.store.destination)}.json?key=${TOMTOM_API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.latitude = data.results[0].position.lat;
        this.longitude = data.results[0].position.lon;
        this.result = data.results;
        this.setParams();
        this.$router.push({ path: "/results" });
      } catch (error) {
        console.error("Errore durante la ricerca:", error);
      }
    },
    setParams() {
      if (this.latitude && this.longitude) {
        this.params = {
          lat: this.latitude,
          lon: this.longitude,
          radius: this.radius,
        };
        this.getApartmentsFiltered();
      }
    },
    getApartmentsFiltered() {
      axios
        .get(store.apiBaseUrl + "/apartments", { params: this.params })
        .then((res) => {
          this.store.apartmentsFiltered = res.data.results;
          this.params = null;
          console.log(this.store.apartmentsFiltered);
        })
        .catch(error => {
          console.error('Error fetching apartments:', error);
        });
    },
  },
  mounted() {},
};




</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/variables.scss";

#searchbar {
  border-top: 5px solid #d98b2c;
  border-bottom: 5px solid #d98b2c;
  width: 60%;
  height: 85px;
  margin: 0 auto;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: white;
  border-radius: 100px;
}

input {
  border: none;
  outline: none;
}
</style>
