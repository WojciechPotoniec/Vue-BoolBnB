<template>
  <div class="mt-5 pt-5">
     {{ apartment.title }} 
  </div>
  <div>
     {{ apartment.address }} 
  </div>
  <div>
     {{ apartment.bathrooms_num }} 
  </div>
  <div>
     {{ apartment.beds_num }} 
  </div>
  <div>
     {{ apartment.rooms_num }} 
  </div>
  <div>
     {{ apartment.latitude }} 
  </div>
  <div>
     {{ apartment.longitude }} 
  </div>
  <div>
     {{ apartment.visibility }}
  </div>

  <div class="container pt-5 pb-5 mt-5">
    <!-- <div id="slider-title" class="px-5 mb-4 mt-3">
      <h2>
        {{ apartment.title }}
      </h2>
    </div> -->
    <div id="slider">
      <!-- <div
        class="slider-wrapper"
        tabindex="0"
        @keyup.up="prevSlide"
        @keyup.down="nextSlide"
      >
        <div class="item">
          <img
            src="https://picsum.photos/200/200"
            :alt="slides[activeIndexSlide].title"
          />
          <div class="text">
            <h3>{{ slides[activeIndexSlide].title }}</h3>
          </div>
        </div>

        <div class="thumbs">
          <div class="prev" @click="prevSlide"></div>
          <div class="next" @click="nextSlide"></div>
          <div
            class="thumb"
            :class="{ active: index === activeIndexSlide }"
            v-for="(slide, index) in slides"
            :key="index"
            @mouseover="goToSlide(index)"
          >
            <img :src="slide.image" :alt="slide.title" />
          </div>
        </div>
      </div> -->
    </div>
    <div id="slider-content" class="d-flex container mt-3">
      <div id="slider-info">
        <!-- <p class="address p-4 fs-4">{{ apartment.address }}</p> -->
        <!-- <div id="host" class="p-4 border-top border-bottom">
          <h3>Host</h3>
          <img class="host-image" :src="slides.hostImage" :alt="slides[activeIndexSlide].hostName" />
          <p>{{ slides[activeIndexSlide].hostName }} host name
          <p>{{ slides[activeIndexSlide].hostDescription }} host description</p>
          </p>
        </div> -->

        <!-- //** SERVIZI */ -->
        <!-- <div id="slider-services" class="border-bottom p-4">
          <h3>Servizi</h3>
          <ul class="d-flex">
            <li><i class="fa-solid fa-wifi"></i></li>
            <li class="mx-3">Wifi{{ apartment.services[0].name }}
            </li>
          </ul>
          <ul class="d-flex">
            <li><i class="fa-solid fa-square-parking"></i></li>
            <li class="ms-3">Parking{{ slides[activeIndexSlide].parking }}
            </li>
          </ul>
          <ul class="d-flex">
            <li><i class="fa-solid fa-person-swimming"></i></li>
            <li class="ms-3">Pool{{ slides[activeIndexSlide].pool }}
            </li>
          </ul>
        </div> -->
      </div>
      <div id="slider-map">
        <h3 class="p-4">Dove sarai</h3>
        <div id="map" class="p-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
import axios from "axios";
import { TOMTOM_API_KEY } from "../../config";
export default {
  name: "CardComponent",
  data() {
    return {
      store,
      // apartment: null,
      //* array di prova */
      slides: [
        {
          image: "public/img/appartamento_480.jpg",
        },
        {
          image: "public/img/appartamento2_480.jpg",
        },
        {
          image: "public/img/appartamento3_360.jpg",
        },
        {
          image: "public/img/salotto_720.jpg",
        },
        {
          image: "public/img/letto.jpg",
        },
      ],
      activeIndexSlide: 0,
    };
  },
  methods: {
    nextSlide() {
      if (this.activeIndexSlide < this.slides.length - 1) {
        this.activeIndexSlide++;
      } else {
        this.activeIndexSlide = 0;
      }
    },
    prevSlide() {
      if (this.activeIndexSlide > 0) {
        this.activeIndexSlide--;
      } else {
        this.activeIndexSlide = this.slides.length - 1;
      }
    },
    goToSlide(index) {
      this.activeIndexSlide = index;
    },
    showMap() {
      // Funzione per inizializzare la mappa
      const initMap = () => {
        // Verifica che l'elemento con id "map" esista
        const mapElement = document.getElementById("map");
        if (mapElement) {
          // Chiave API di TomTom Maps
          const apiKey = TOMTOM_API_KEY;

          try {
            // Crea la mappa all'interno del div con id 'map'
            let map = tt.map({
              key: apiKey,
              container: "map",
              center: [9.6629, 45.6945], // Centro della mappa (Bergamo)
              zoom: 15, // Livello di zoom iniziale
            });

            // Aggiunge un marker per la via Borgo Palazzo 132A, Bergamo
            let marker = new tt.Marker({ color: "#D98B2C" })
              .setLngLat([9.6629, 45.6945]) // Longitudine, latitudine
              .setPopup(
                new tt.Popup().setHTML(
                  "<h3>Via Borgo Palazzo 132A, Bergamo</h3>"
                )
              )
              .addTo(map);

            // Aggiunge i controlli di zoom alla mappa
            map.addControl(new tt.NavigationControl());
          } catch (error) {
            console.error(
              "Errore durante l'inizializzazione della mappa:",
              error
            );
          }
        }
      };
      // Esegui l'inizializzazione della mappa quando il DOM è pronto
      if (document.readyState === "complete") {
        initMap();
      } else {
        window.addEventListener("load", initMap);
      }
    },
    getApartment() {
      console.log(this.$route);
      axios
        .get(`${this.store.apiBaseUrl}/apartments/${this.$route.params.slug}`)
        .then((res) => {
          console.log(res.data.result, "ciao res");
          this.apartment = res.data.result;
        })
        .catch((error) => {
          this.$router.push({ name: "not-found" });
        })
        .finally();
    },
  },
  mounted() {
    // this.showMap();
    this.getApartment();
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // react to route changes...
        this.getApartment();
      }
    );
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/variables" as *;

#slider {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-wrapper {
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item {
  float: left;
  width: 100%;
  height: 500px;
  position: relative;
}

.item img {
  width: 100%;
  height: 490px;
  object-fit: cover;
  // border: 3px solid $secondary-gold;
  border-bottom: 0;
  border-radius: 10px 10px 0 0;
}

.item .text {
  position: absolute;
  right: 20px;
  top: 20px;
  text-align: right;
  color: white;
  object-fit: cover;
}

.thumbs {
  display: flex;
  width: 100%;
  height: 100px;
  background: #000;
  position: relative;
}

.thumb {
  width: calc((100%) / 5);
  opacity: 0.5;
  cursor: pointer;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb.active {
  border: 3px solid $secondary-gold;
  opacity: 1;
}

.debug {
  border: 2px solid black;
}

#slider-info {
  width: 90%;
}

#host {
  img {
    width: 60px;
    height: 60px;
    background-color: black;
    border-radius: 50%;
  }
}

#slider-services {
  ul {
    list-style-type: none;
    padding-left: 0;
  }
}

#slider-map {
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;

  #map {
    width: 90%;
    height: 400px;
  }
}
</style>
