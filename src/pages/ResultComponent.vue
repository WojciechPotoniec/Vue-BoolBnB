<template>
  <div class="mt-5 pt-5 container" id="results">
    <h1 class="mt-2">Results</h1>
    <div class="d-flex">
    <input type="checkbox" v-model="wifi" name="wifi">
    <label for="wifi">wifi</label>
    <input type="checkbox" v-model="parking"  name="parking">
    <label for="parking">parking</label>
    <input type="checkbox" v-model="seaview"  name="seaview">  
    <label for="seaview">seaview</label>
    <input type="checkbox" v-model="pool"  name="pool">  
    <label for="pool">pool</label>
    <input type="checkbox" v-model="reception"  name="reception">  
    <label for="reception">reception</label>
    <input type="checkbox" v-model="sauna"  name="sauna">  
    <label for="sauna">sauna</label>
    <button>add filter</button>
    <button @click="console">console</button>
  </div>
    <div class="row">
      <h2>results for {{ this.store.destination }}</h2>
      <p>the number of apartment for your search are: {{ this.store.apartmentsFiltered.length }}</p>
      <!-- <div class="col-12 col-xl-4 col-lg-6" v-for="(apartment, i) in this.store.apartmentsFiltered" :key="i">
      </div> -->
       <div class="col-12 col-xl-4 col-lg-6" v-for="(apartment, index) in this.store.apartmentsFiltered" :key="index">
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
      params: {},
      wifi:false,
      sauna: false,
      parking: false,
      seaview: false,
      pool: false,
      reception: false,
      
    };
  },
  methods: {


    getOneImg(apartment) {
      if (apartment.image) {
        // Itera sugli elementi dell'array associativo
        for (let key in apartment.image) {
          if (apartment.image.hasOwnProperty(key)) {
            // Verifica se l'immagine associata a questo indice esiste e non è vuota
            if (apartment.image[key]) {
              return this.store.imgBasePath + apartment.image[key];
            }
          }
        }
      }
      // Se non ci sono immagini valide nell'array, gestisci il caso mostrando un'immagine di default o un messaggio vuoto
      return ''; // o this.store.imgBasePath + 'default.jpg' per un'immagine di default
    },

    setParams() {
      if (this.wifi) {
        this.params.wifi = true;  
      } if (this.pool){
        this.params.pool = true;
      } if (this.parking){
        this.params.parking = true;
      } if (this.sauna){
        this.params.sauna = true;
      } if (this.seaview){
        this.params.seaview= true;
      } if (this.reception){
        this.params.reception= true;
      }
      this.params.lat = this.store.latitude,
      this.params.lon = this.store.longitude,
      this.params.radius = this.store.radius
      
    },
    console() {
      this.setParams();
      console.log(this.params.wifi);
      console.log(this.params.pool);
      console.log(this.params.sauna);
      console.log(this.params.parking);
      console.log(this.params.key);
      console.log(this.store.destination);
      console.log(this.store.radius);
      console.log(this.store.apartmentsFiltered)
      this.getApartmentsUltraFiltered();
    },
    getApartmentsUltraFiltered() {
      axios
        .get(store.apiBaseUrl + "/apartments", { params: this.params })
        .then((res) => {
          this.store.apartmentsUltraFiltered = res.data.results.map(apartment => {
            apartment.image = JSON.parse(apartment.image);
                    return apartment;
          });
          this.params = null;
          console.log(this.store.apartmentsUltraFiltered);
        })
        .catch(error => {
          console.error('Error fetching apartments:', error);
        });
    },

  }
};
</script>

<style lang="scss" scoped></style>