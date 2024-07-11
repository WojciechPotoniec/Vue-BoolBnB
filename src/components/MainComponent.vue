<template>
  <main>
    <div class="container">
      <div class="m-3 pt-4 mx-5 ">
        <h3 id="main-title">La Selezione di Boolbnb</h3>
        <div class="d-flex flex-wrap">
          <div class="reservation-info w-50">
            <p>Che sia al mare, in Montagna o in città, dai un'occhiata alle <strong>proposte di questa
                settimana,</strong>
              innamorati di un luogo dove puoi passare le tue vacanze e contatta il proprietario</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-xl-4 col-lg-6" v-for="(apartment, index) in store.apartments" :key="index">
          <CardComponent :card="apartment" :getOneImg="getOneImg" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { store } from '../store';
import axios from 'axios';
import CardComponent from './CardComponent.vue';
export default {
  name: 'MainComponent',
  components: {
    CardComponent
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
    console.log(this.store.apartments)
  }
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/variables" as *;

img {
  display: block;
  max-width: 100%;
  object-fit: cover;
}

.stack {
  width: 85%;
  max-width: 300px;
  padding: 30px;
  transition: 0.25s ease;

  &:hover {
    transform: rotate(5deg);

    .card:before {
      transform: translatey(-2%) rotate(-4deg);
    }

    .card:after {
      transform: translatey(2%) rotate(4deg);
    }
  }
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

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    border: 2px solid $secondary-gold;
    border-radius: 10px;
    background-image: url("https://picsum.photos/seed/picsum/200/200");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.75;
    transform-origin: center center;
    z-index: -1;
    transition: 0.15s ease;
    top: 0;
    left: 0;
  }

  &:before {
    transform: translatey(-2%) rotate(-6deg);
  }

  &:after {
    transform: translatey(2%) rotate(6deg);
  }
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
</style>