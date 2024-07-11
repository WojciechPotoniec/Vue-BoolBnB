<template>
  <div id="searchbar" class="mt-4 animated-searchbar">
    <div class="d-flex flex-wrap justify-content-center align-items-center">
      <div id="searchbar_input" class="px-3">
        <label for="destination">Where</label>
        <input id="address" list="locality" type="text" aria-label="Destination" class="form-control"
          placeholder="Search Destination" v-model="this.store.destination" @keyup.enter="search" @input="suggestion" />

        <datalist id="locality">

        </datalist>

      </div>
      <div id="searchbar_radius" class="px-3">
        <label for="radius">Radius</label>
        <select class="form-select" id="radius" v-model="this.store.radius">
          <option value="20" selected>20 km</option>
          <option value="25">25 km</option>
          <option value="30">30 km</option>
          <option value="180">180 km</option>
        </select>
      </div>
      <div id="searchbar_button" class="px-3">
        <button class="rounded-5 btn btn-primary" @click="search">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
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
      params: null,
      latitude: "",
      longitude: "",
      radius: 20,
      result: [],
    };
  },
  methods: {
    async suggestion() {
      const url2 = `https://api.tomtom.com/search/2/search/${encodeURIComponent(this.store.destination)}.json?key=${TOMTOM_API_KEY}&countrySet=IT&limit=10`;
      try {
        const response = await fetch(url2);
        const data = await response.json();
        const myArray = data.results.map(result => result.address);
        const datalist = document.getElementById('locality');
        datalist.innerHTML = '';

        // Utilizza un Set per tenere traccia degli indirizzi aggiunti
        const addedAddresses = new Set();

        myArray.forEach(result => {
          let suggest = document.createElement('option');
          let addressString = '';

          if (result.streetName && result.municipality && result.postalCode) {
            addressString = `${result.streetName}, ${result.municipality}, ${result.postalCode}`;
          } else if (result.streetName) {
            addressString = result.streetName;
          } else if (result.municipality) {
            addressString = result.municipality;
          } else if (result.postalCode) {
            addressString = result.postalCode;
          }

          // Aggiungi solo indirizzi unici
          if (addressString && !addedAddresses.has(addressString)) {
            addedAddresses.add(addressString);
            suggest.value = addressString;
            datalist.append(suggest);
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async search() {
      if (!this.store.destination) {
        alert("please entyer a destination.");
        return;
      }
      const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(this.store.destination)}.json?key=${TOMTOM_API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.store.latitude = data.results[0].position.lat;
        this.store.longitude = data.results[0].position.lon;
        this.result = data.results;
        this.setParams();
        this.$router.push({ path: "/results" });
      } catch (error) {
        console.error("Errore durante la ricerca:", error);
      }
    },
    setParams() {
      if (this.store.latitude && this.store.longitude) {
        this.params = {
          lat: this.store.latitude,
          lon: this.store.longitude,
          radius: this.store.radius,
        };
        this.getApartmentsFiltered();
      }
    },
    getApartmentsFiltered() {
      axios
        .get(store.apiBaseUrl + "/apartments", { params: this.params })
        .then((res) => {
          this.store.apartmentsFiltered = res.data.results.map(apartment => {
            apartment.image = JSON.parse(apartment.image);
            return apartment;
            //console.log(this.store.apartmentsFiltered);
          });
          this.params = null;
          console.log(this.store.apartmentsFiltered);
        })
        .catch(error => {
          console.error('Error fetching apartments:', error);
        });
    },
  },
  mounted() {
    this.store.radius = 20;
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/variables.scss";

#searchbar {
  border-top: 5px solid #d98b2c;
  border-bottom: 5px solid #d98b2c;
  width: 90%;
  max-width: 800px;
  height: auto;
  margin: 0 auto;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: white;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  transform: translateY(-20px);
  opacity: 0;
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
  text-align: center;
}

#searchbar.animated-searchbar {
  transform: translateY(0);
  opacity: 1;
}

#searchbar_input {
  flex: 2;
  margin: 0 10px;
}

#searchbar_input input {
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
  width: 100%;
}

#searchbar_radius {
  width: 120px;
  margin: 0 10px;
}

#searchbar_radius select {
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  background-color: #f8f9fa;
  border: none;
  width: 100%;
}

#searchbar_button {
  margin: 0 10px;
}

#searchbar_button button {
  padding: 10px 20px;
  background-color: #d98b2c;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

#searchbar_button button:hover {
  background-color: #bf751e;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  #searchbar {
    width: 95%;
  }
}
</style>
