<template>
  <main>
    <div class="container">
      <div class="row">
        <div
          class="col-12 col-xl-4 col-lg-6"
          v-for="(apartment, i) in apartments"
          :key="i"
        >
          <CardComponent :card="apartment" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { store } from "../store";
import axios from "axios";
import CardComponent from "./CardComponent.vue";
export default {
  name: "MainComponent",
  components: {
    CardComponent,
  },
  data() {
    return {
      store,
      apartments: [],
    };
  },
  methods: {
    getAllApartments() {
      axios.get(this.store.apiBaseUrl + "/apartments").then((res) => {
        console.log(res.data);
        this.apartments = res.data.results;
        // console.log(this.apartments, 'test main');
        //se paginazione
        //this.projects = res.data.results.data;
        //this.currentPage = res.data.results.current_page;
      });
    },
  },
  //**! METODO PER PRENDERE TUTTI GLI APARTMENT CON L'IMMAGINE IN FORMATO ARRAY SPLITTATO */
  // methods: {
  //     getAllApartments(){
  //         axios.get(this.store.apiBaseUrl + '/apartments', { params: this.params }).then((res)=>{
  //             this.store.apartments = res.data.results.map(apartment => {
  //                 apartment.image = JSON.parse(apartment.image);
  //                 return apartment;
  //             });
  //             this.params = null;
  //             console.log(this.store.apartments)
  //         })
  //     }
  // },
  mounted() {
    this.getAllApartments();
  },
};
</script>

<style lang="scss" scoped></style>
