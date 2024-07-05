<template>
  <div class="mt-5 pt-5 container" id="results">
    <h1 class="mt-2">Results</h1>
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
import { store } from "../store.js";
import CardComponent from "@/components/CardComponent.vue";

export default {
  name: "ResultComponent",
  // props: {
  //   card: {
  //     type: Object,
  //     required: true
  //   },
  //   getOneImg: {
  //     type: Function,
  //     required: true
  //   }
  // },
  components: { 
    CardComponent,
  },
  data() {
    return {
      store,
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
  }
};
</script>

<style lang="scss" scoped></style>