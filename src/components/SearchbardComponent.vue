<template>
    <div id="searchbar" class="mt-3">
      <div class="d-flex container justify-content-between pt-2">
        <div id="searchbar_input" class="px-3">
          <label for="destination">Dove</label>
          <input type="text" aria-label="Destination" class="form-control" placeholder="Cerca Destinazione"
            v-model="searchQuery.destination">
        </div>
        <div>
          <select name="" id="" v-model="radius">
            <option value="20">20 km</option>
            <option value="25">25 km</option>
            <option value="30">30 km</option>
          </select>
          
          </div>
        <div>
          <label for="guests">Ospiti</label>
          <input type="text" aria-label="Guests" class="form-control" placeholder="Aggiungi ospiti"
            v-model="searchQuery.guests">
        </div>
        <button class="btn" @click="search"> <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  </template>


<script>
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';
import { TOMTOM_API_KEY } from '../../config';

export default {
  name: 'SearchbarComponent',
  data() {
    return {
      router: router,
      searchQuery: {
        destination: '',
      
      },
      params: {
      radius: '',
      latitude: '',
      longitude: '',},
    
      result: []
    };
  },
  methods: {
    async search() {
      if (!this.searchQuery.destination) {
        alert('Per favore inserisci una destinazione.');
        return;
      }
      // Replace with your API endpoint URL
      const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(this.searchQuery.destination)}.json?key=${TOMTOM_API_KEY}`;
      // console.log(url);   
       try {
        const response = await fetch(url);
        const data = await response.json();
        this.latitude = data.results[0].position.lat;
        this.longitude = data.results[0].position.lon;
        this.result = data.results;
        // console.log(this.longitude);
        // Redirect to results page with search results data
        this.$router.push({ path: '/results', query: this.searchQuery.destination });
      } catch (error) {
        console.error('Errore durante la ricerca:', error);
      }
      const myurl = `${store.apiBaseUrl}/apartments?lat=${this.latitude}&lon=${this.longitude}&radius=${this.radius}`
      console.log(myurl)
    }
  },
  
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/partials/variables.scss';

#searchbar {
  border-top: 5px solid #D98B2C;
  border-bottom: 5px solid #D98B2C;
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
