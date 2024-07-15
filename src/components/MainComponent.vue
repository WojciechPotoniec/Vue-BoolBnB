<template>
  <main>
    <div class="container">
      <div class="m-3 pt-4 ">
        <h3 id="main-title" class="text-center">The Boolbnb Selection</h3>
        <div class="d-flex flex-wrap">
          <div class="reservation-info w-50 text-center">
            <p>Whether at the seaside, in the mountains or in the city, take a look at the <strong>proposals here
                week</strong>
              fall in love with a place where you can spend your holidays and contact the owner</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-xl-4 col-lg-6 mt-5" v-for="(apartment, index) in store.apartments" :key="index">
          <CardComponent :card="apartment" :getOneImg="getOneImg" :viewCount="viewCount" />
        </div>
      </div>
    </div>
    <div class="guarantee"> 
      <GuaranteeComponent />
    </div>
  </main>
</template>

<script>
import { store } from '../store';
import axios from 'axios';
import CardComponent from './CardComponent.vue';
import GuaranteeComponent from './GuaranteeComponent.vue';
export default {
  name: 'MainComponent',
  components: {
    CardComponent,
    GuaranteeComponent
  },
  data() {
    return {
      store,
    }
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
      return ''; // o this.store.imgBasePath + 'default.jpg' per un'immagine di default
    },
    viewCount(apartment) {
      console.log(apartment.id);
      const data = {
        apartment_id: apartment.id,
      };
      axios.post(`${this.store.apiBaseUrl}/views`, data).then((res) => {
        console.log(data.apartment_id);
      });
    },

    getAllApartments() {
      axios.get(this.store.apiBaseUrl + '/apartments').then((res) => {
        console.log(res.data);
        this.store.apartments = res.data.results.map(apartment => {
          apartment.image = JSON.parse(apartment.image);
          return apartment;
        });
        console.log(this.store.apartment);
        //se paginazione
        this.projects = res.data.results.data;
        this.currentPage = res.data.results.current_page;
      });
    },
  },
  mounted() {
    this.getAllApartments();
    console.log(this.store.apartments)
  }
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/variables" as *;
.reservation-info {
  margin: 0 auto;
}

img {
  display: block;
  max-width: 100%;
  object-fit: cover;
}


.card {
  color: $white;
  aspect-ratio: 3 / 2;
  border: 2px solid $secondary-gold;
  border-radius: 10px;
  background-color: rgba($primary-bg, 0.8);
  position: relative;
  transition: 0.15s ease;
  cursor: pointer;
  padding: 10% 10% 10%;
}

.image {
  width: 100%;
  // border: 2px solid $secondary-gold;
  border-radius: 10px;
  // background-color: #EEE;
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;
}

.text {
  color: $white;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 10px 5px 0;
}

#main-title {
  color: $secondary-gold;
}
.guarantee {
  background-color: rgba(29, 60, 76, 0.3);
}

.debug{
  border: 2px solid black;
}
</style>