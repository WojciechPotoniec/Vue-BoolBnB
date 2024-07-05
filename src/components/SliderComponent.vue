<template>
  <div class="container pt-5 pb-5 mt-5">
    <div id="slider-title" class="px-5 mb-4 mt-3">
      <h2>
        {{ item.title }}
      </h2>
    </div>
    <div id="slider">
      <div
        class="slider-wrapper"
        tabindex="0"
        @keyup.up="prevSlide"
        @keyup.down="nextSlide"
      >
        <div class="item">
          <img
            :src="slides[activeIndexSlide].image"
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
      </div>
    </div>
    <div id="slider-content" class="d-flex container mt-3">
      <div id="slider-info">
        <p class="address p-4 fs-4">{{ item.address }}</p>
        <!-- <div id="host" class="p-4 border-top border-bottom">
          <h3>Host</h3>
          <img class="host-image" :src="slides.hostImage" :alt="slides[activeIndexSlide].hostName" />
          <p>{{ slides[activeIndexSlide].hostName }} host name
          <p>{{ slides[activeIndexSlide].hostDescription }} host description</p>
          </p>
        </div> -->
        <ul class="list-unstyled p-4">
          <li><b>Number of rooms:</b> {{ item.rooms_num }}</li>
          <li><b>Number of beds:</b> {{ item.beds_num }}</li>
          <li><b>Number of bathrooms:</b> {{ item.bathrooms_num }}</li>
          <li><b>Square meters:</b> {{ item.square_meters }}</li>
        </ul>
        <!-- //** SERVIZI */ -->
        <div id="slider-services" class=" border-top border-bottom p-4">
          <h3>Services</h3>
          <div v-for="(item, index) in item.services" :key="index">
            <ul class="d-flex">
              <li><i :class="item.icon"></i></li>
              <li class="mx-3">{{ item.name }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div id="slider-map">
        <h3 class="p-4"> Where will you be</h3>
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
  props: ["item"],
  data() {
    return {
      store,
      // apartment: null,
      //* array di prova */
      slides: [
        {
          image: "/public/img/appartamento1.jpg",
        },
        {
          image: "/public/img/appartamento2.jpg",
        },
        {
          image: "/public/img/appartamento3.jpg",
        },
        {
          image: "/public/img/salotto.jpg",
        },
        {
          image: "/public/img/letto.jpg",
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
  },
  mounted() {
    this.showMap();
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
