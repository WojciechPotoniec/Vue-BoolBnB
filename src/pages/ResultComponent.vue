<template>
  <div id="search">
    <SearchbarComponent />
  </div>
  <div id="results-container">
    <div class="mt-5 pt-5 container" id="results">
      <!-- <h1 class="mt-3">Results</h1> -->
      <h4 class="ml-3">Filters:</h4>
      <div class="filters d-flex flex-wrap mt-4 justify-content-evenly">
        <div class="button-group d-flex flex-wrap mb-3">
          <button v-for="service in store.services" :key="service.id"
            :class="['service-button', 'styled-input', { 'selected': selectedServices.includes(service.id) }]"
            @click="toggleService(service.id)">
            {{ service.name }}
          </button>
        </div>
      </div>
      <div class="filters-wrapper">
        <div class="filters d-flex flex-wrap justify-content-center">
          <div class="form-group text-center me-4">
            <span>number of beds:</span>
            <input type="number" class="form-control styled-input" placeholder="1" v-model.number="minBeds"
              @change="applyFilters" min="1" max="15">
          </div>
          <div class="form-group text-center">
            <span>number of rooms:</span>
            <input type="number" class="form-control styled-input" placeholder="1" v-model.number="minRooms"
              @change="applyFilters" min="1" max="15">
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <h2>Results for {{ capitalizedDestination }}</h2>
        <p v-if="store.apartmentsFiltered.length === 0">No results for your search</p>
        <p v-else>The number of apartments for your search are: {{ store.apartmentsFiltered.length }}</p>
        <div class="col-12 col-xl-4 col-lg-6" v-for="(apartment, index) in store.apartmentsFiltered" :key="index">
          <CardComponent :card="apartment" :getOneImg="getOneImg" :viewCount="viewCount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store.js";
import CardComponent from "@/components/CardComponent.vue";
import SearchbarComponent from "@/components/SearchbarComponent.vue";

export default {
  name: "ResultComponent",
  components: {
    CardComponent,
    SearchbarComponent
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
    this.getApartmentsUltraFiltered();
  },
  methods: {
    viewCount(apartment) {
      console.log(apartment.id);
      const data = {
        apartment_id: apartment.id,
      };
      axios.post(`${this.store.apiBaseUrl}/views`, data).then((res) => {
        console.log(data.apartment_id);
      });
    },


    getServices() {
      axios.get(this.store.apiBaseUrl + '/services')
        .then((res) => {
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
      return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    },

    getOneImg(apartment) {
      if (apartment.image) {
        for (let key in apartment.image) {
          if (apartment.image.hasOwnProperty(key) && apartment.image[key]) {
            return `${this.store.imgBasePath}${apartment.image[key]}`;
          }
        }
      }
      return '';
    },

    applyFilters() {
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

      axios
        .get(`${this.store.apiBaseUrl}/apartments`, { params })
        .then((res) => {
          this.store.apartmentsUltraFiltered = res.data.results.map((apartment) => {
            if (apartment.image) {
              apartment.image = JSON.parse(apartment.image);
            }
            return apartment;
          });
          this.store.apartmentsFiltered = this.store.apartmentsUltraFiltered;
        })
        .catch((error) => {
          console.error('Error fetching apartments:', error);
        });
    },

    toggleService(serviceId) {
      const index = this.selectedServices.indexOf(serviceId);
      if (index > -1) {
        this.selectedServices.splice(index, 1);
      } else {
        this.selectedServices.push(serviceId);
      }
      this.applyFilters();
    },
  },
  computed: {
    capitalizedDestination() {
      return this.store.destination ? this.store.destination.charAt(0).toUpperCase() + this.store.destination.slice(1) : '';
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/variables.scss";
.filters-wrapper {
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: row;
  }
}
#results-container {
  margin-top: 200px;
  margin-bottom: 50px;
  animation: fadeIn 1s ease-out;

  @media (max-width: 768px) {
    margin-top: 250px;
  }
}

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
  animation: fadeIn 1s ease-out;
}

h1 {
  font-family: 'Arial', sans-serif;
  color: #333;
  margin-bottom: 20px;
  animation: fadeIn 1s ease-out 0.2s backwards;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  animation: fadeIn 1s ease-out 0.4s backwards;
}

.service-button {
  margin-bottom: 10px;
  background-color: $primary-bg;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.service-button.selected {
  background-color: #0056b3;
}

.service-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.form-group {
  margin-bottom: 15px;
  animation: fadeIn 1s ease-out 0.6s backwards;
}

.styled-input {
  height: 60px;
  width: 85px;
  padding: 10px;
  font-size: 16px;
  background-color: $primary-bg;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.styled-input:hover,
.styled-input:focus {
  background-color: #0056b3;
  transform: scale(1.05);
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

input::placeholder {
  color: white;
}


</style>