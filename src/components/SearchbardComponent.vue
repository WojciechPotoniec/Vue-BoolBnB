<template>
    <div id="searchbar" class="mt-3">
      <div class="d-flex container justify-content-between pt-2">
        <div id="searchbar_input" class="px-3">
          <label for="destination">Dove</label>
          <input type="text" aria-label="Destination" class="form-control" placeholder="Cerca Destinazione"
            v-model="searchQuery.destination">
        </div>
        <div>
          <label for="checkin">Data Check-in</label>
          <input type="date" class="form-control" placeholder="Aggiungi data" v-model="searchQuery.checkin">
        </div>
        <div>
          <label for="checkout">Data Check-out</label>
          <input type="date" class="form-control" placeholder="Aggiungi data" v-model="searchQuery.checkout">
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
import { store } from '../store';
import { router } from '../router';

export default {
  name: 'SearchbarComponent',
  data() {
    return {
      store: {
        apiKey: store.apiKey
      },
      router: router,
      searchQuery: {
        destination: '',
        checkin: '',
        checkout: '',
        guests: ''
      },
      searchResults: []
    };
  },
  methods: {
    async search() {
      if (!this.searchQuery.destination) {
        alert('Per favore inserisci una destinazione.');
        return;
      }
      // Replace with your API endpoint URL
      const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(this.searchQuery.destination)}.json?key=${this.store.apiKey}`;      try {
        const response = await fetch(url);
        const data = await response.json();
        this.searchResults = data.apartments; // Assuming data structure has apartments key

        // Redirect to results page with search results data
        this.$router.push({ path: '/results', query: this.searchQuery });
      } catch (error) {
        console.error('Errore durante la ricerca:', error);
      }
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
