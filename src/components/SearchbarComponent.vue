<template>
  <div id="searchbar" class="mt-3">
    <div class="d-flex container justify-content-between pt-2">
      <div id="searchbar_input" class="px-3">
        <label for="destination">Dove</label>
        <input
          type="text"
          aria-label="Destination"
          class="form-control"
          placeholder="Cerca Destinazione"
          v-model="searchQuery.destination" @keyup.enter="search"
        />
      </div>
      <div>
        <select class="form-select" id="radius" name="" >
            <option value="20" selected>20 km</option>
            <option value="25">25 km</option>
            <option value="30">30 km</option>
            <option value="180">180 km</option>
        </select>
      </div>
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
      router: router,
      searchQuery: {
        destination: "",
      },
      params: null,
      latitude: "",
      longitude: "",
      radius: "20",
      result: [],
    };
  },
  methods: {
    async search() {
      if (!this.searchQuery.destination) {
        alert("Per favore inserisci una destinazione.");
        return;
      }
      // Replace with your API endpoint URL
      const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
        this.searchQuery.destination
      )}.json?key=${TOMTOM_API_KEY}`;
      // console.log(url);
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.latitude = data.results[0].position.lat;
        this.longitude = data.results[0].position.lon;
        this.result = data.results;
        // console.log(this.result[0].address);
        // Redirect to results page with search results data
        this.$router.push({ path: "/results" });
      } catch (error) {
        console.error("Errore durante la ricerca:", error);
      }
      const myurl = `${store.apiBaseUrl}/apartments?lat=${this.latitude}&lon=${this.longitude}&radius=${this.radius}`;

      /*  try {
        const response = await fetch(url);
        const data = await response.json();
        this.store.apartments = data.results;
        console.log(this.store.apartments)

      } catch (error) {
        console.error('Errore durante la ricerca:', error);
      } */
      console.log(myurl);
      this.setParams();
    },
    setParams() {
      if (this.radius && this.latitude && this.longitude) {
        this.params = {
          lat: this.latitude,
          lon: this.longitude,
          radius: this.radius,
        };
      }
      this.getAllApartments();
    },
    getAllApartments() {
      axios
        .get(store.apiBaseUrl + "/apartments", { params: this.params })
        .then((res) => {
          this.store.apartments = res.data.results;
          this.params = null;
          console.log(this.store.apartments);
        });
    },
  },
  mounted() {
    this.getAllApartments();
  },
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
