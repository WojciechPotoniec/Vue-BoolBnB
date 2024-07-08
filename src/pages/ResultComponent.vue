<template>
  <div class="mt-5 pt-5 container" id="results">
    <h1 class="mt-3">Results</h1>

    <!-- Filtri per i servizi -->
    <div class="checkbox-group">
      <div v-for="service in store.services" :key="service.id">
        <input type="checkbox" :value="service.id" v-model="selectedServices">
        <label class="service-name">{{ service.name }}</label>
      </div>
    </div>
    <!-- Container per i filtri -->
    <div class="filters d-flex flex-wrap mt-4">
      <!-- Filtri per il numero minimo di letti e stanze -->
      <div class="form-group">
        <label for="minBeds">Min number of beds</label>
        <input type="number" class="form-control" placeholder="Min number of beds" v-model.number="minBeds" />
      </div>
      <div class="form-group">
        <label for="minRooms">Min number of rooms</label>
        <input type="number" class="form-control" placeholder="Min number of rooms" v-model.number="minRooms" />
      </div>

      <!-- Menu a tendina per il raggio di ricerca -->
      <div class="form-group">
        <label for="radius">Radius (km)</label>
        <select class="form-select" v-model="store.radius">
          <option value="25">25 km</option>
          <option value="30">30 km</option>
          <option value="180">180 km</option>
        </select>
      </div>
    </div>

    <!-- Bottone per applicare tutti i filtri -->
    <button @click="applyFilters" class="btn btn-primary mt-2">Apply Filters</button>

    <!-- Risultati della ricerca -->
    <div class="row mt-3">
      <h2>Results for {{ capitalizedDestination }}</h2>
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
          this.store.services = res.data.results.map(service => ({
            ...service,
            name: this.capitalizeFirstLetter(service.name)
          }));
        })
        .catch((error) => {
          console.error('Error fetching services:', error);
        });
    },

    capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
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
  computed: {
    capitalizedDestination() {
      if (!this.store.destination) return '';
      return this.store.destination.charAt(0).toUpperCase() + this.store.destination.slice(1);
    },
  }
}
</script>


<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#results {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-out;
}

h1 {
  font-family: 'Arial', sans-serif;
  color: #333;
  margin-bottom: 20px;
  animation: fadeIn 1s ease-out 0.2s backwards;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  animation: fadeIn 1s ease-out 0.4s backwards;
}

.checkbox-group div {
  flex: 1 1 calc(33.333% - 10px);
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
  animation: fadeIn 1s ease-out 0.6s backwards;
}

label {
  font-weight: bold;
  color: #555;
}

input[type="checkbox"] {
  margin-right: 10px;
  accent-color: #007bff;
}

input[type="number"],
.form-select {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
}

button.btn {
  background-color: #007bff;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  animation: fadeIn 1s ease-out 0.8s backwards;
}

button.btn:hover {
  background-color: #0056b3;
}

#results h2 {
  font-size: 24px;
  margin-top: 20px;
  color: #333;
  animation: fadeIn 1s ease-out 1s backwards;
}

#results p {
  color: #666;
  animation: fadeIn 1s ease-out 1.2s backwards;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  animation: fadeIn 1s ease-out 1.4s backwards;
}

.card img {
  width: 100%;
  height: auto;
  display: block;
}

.card-body {
  padding: 15px;
}
</style>
