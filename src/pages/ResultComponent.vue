<template>
  <div class="mt-5 pt-5 container" id="results">
    <h1 class="mt-2">Results</h1>
    
    <!-- Filtri per i servizi -->
    <div>
      <div v-for="service in store.services" :key="service.id">
        <input type="checkbox" :value="service.id" v-model="selectedServices">
        <label>{{ service.name }}</label>
      </div>
    </div>
    
    <!-- Filtri per il numero minimo di letti e stanze -->
    <div class="form-group mt-3">
      <label for="minBeds">Min number of beds</label>
      <input type="number" class="form-control" placeholder="Min number of beds" v-model.number="minBeds" />
    </div>
    <div class="form-group mt-3">
      <label for="minRooms">Min number of rooms</label>
      <input type="number" class="form-control" placeholder="Min number of rooms" v-model.number="minRooms" />
    </div>
    
    <!-- Menu a tendina per il raggio di ricerca -->
    <div class="form-group mt-3">
      <label for="radius">Radius (km)</label>
      <select class="form-select" v-model="store.radius">
        <option value="25">25 km</option>
        <option value="30">30 km</option>
        <option value="180">180 km</option>
      </select>
    </div>
    
    <!-- Bottone per applicare tutti i filtri -->
    <button @click="applyFilters" class="btn btn-primary mt-2">Apply Filters</button>
    
    <!-- Risultati della ricerca -->
    <div class="row mt-3">
      <h2>Results for {{ store.destination }}</h2>
      <p>The number of apartments for your search are: {{ store.apartmentsUltraFiltered.length }}</p>
      <div class="col-12 col-xl-4 col-lg-6" v-for="(apartment, index) in store.apartmentsUltraFiltered" :key="index">
        <CardComponent :card="apartment" :getOneImg="getOneImg" />
      </div>
    </div>
  </div>
</template>




<script>
import axios from "axios";
import { store } from "../store.js";
import CardComponent from "@/components/CardComponent.vue";

export default {
  name: "ResultComponent",
  
  components: { 
    CardComponent,
  },
  data() {
    return {
      store,
      selectedServices: [],
      minBeds: null,
      minRooms: null,
    };
  },
  created() {
    this.getServices();
    this.getApartmentsUltraFiltered(); // Carica inizialmente tutti gli appartamenti
  },
  methods: {
    getServices() {
      axios.get(this.store.apiBaseUrl + '/services')
        .then((res) => {
          console.log('Services response:', res.data);
          this.store.services = res.data.results;
        })
        .catch((error) => {
          console.error('Error fetching services:', error);
        });
    },

    getOneImg(apartment) {
      if (apartment.image) {
        for (let key in apartment.image) {
          if (apartment.image.hasOwnProperty(key) && apartment.image[key]) {
            return `${this.store.imgBasePath}${apartment.image[key]}`;
          }
        }
      }
      return ''; // o this.store.imgBasePath + 'default.jpg' per un'immagine di default
    },

    applyFilters() {
      // Assicurati che il raggio sia un numero float
      this.store.radius = parseFloat(this.store.radius);
      this.getApartmentsUltraFiltered();
    },

    getApartmentsUltraFiltered() {
      const params = {
        services: this.selectedServices.join(','),
        lat: this.store.latitude,
        lon: this.store.longitude,
        radius: this.store.radius,
        minBeds: this.minBeds,
        minRooms: this.minRooms,
      };

      console.log('Fetching apartments with params:', params);

      axios
        .get(`${this.store.apiBaseUrl}/apartments`, { params })
        .then((res) => {
          console.log('Apartments response:', res.data);
          this.store.apartmentsUltraFiltered = res.data.results.map((apartment) => {
            if (apartment.image) {
              apartment.image = JSON.parse(apartment.image);
            }
            return apartment;
          });
        })
        .catch((error) => {
          console.error('Error fetching apartments:', error);
        });
    },
  },
}
</script>



