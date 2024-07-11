<template>
  <div id="slider-container" class="container pt-5 pb-5 mt-5">
    <div id="slider-title" class="px-5 mb-4 mt-3">
      <h2 class="mx-5 pt-3">{{ item.title }}</h2>
    </div>
    <div class="slider-cont">
      <div id="slider">
        <div class="slider-wrapper" tabindex="0" @keyup.up="prevSlide" @keyup.down="nextSlide">
          <div class="item">
            <img :src="activeImage" :alt="item.title" />
          </div>
          <div class="thumbs">
            <div 
              v-for="(image, index) in images" 
              :key="index" 
              class="thumb" 
              :class="{ active: index === activeIndexSlide }" 
              @mouseover="goToSlide(index)"
            >
              <img :src="image" :alt="'Image ' + (index + 1)" />
            </div>
          </div>
        </div>
      </div>

    </div>
    <div id="slider-content" class="d-flex container mt-3">
      <div id="slider-info">
        <p class="address p-4 fs-4">{{ item.address }}</p>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span><b>Number of rooms:</b></span>
            <span>{{ item.rooms_num }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span><b>Number of beds:</b></span>
            <span>{{ item.beds_num }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span><b>Number of bathrooms:</b></span>
            <span>{{ item.bathrooms_num }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span><b>Square meters:</b></span>
            <span>{{ item.square_meters }}</span>
          </li>
        </ul>
        <div id="slider-services" class="border-top border-bottom p-4">
          <h3>Services</h3>
          <div v-for="(service, index) in item.services" :key="index">
            <ul class="d-flex">
              <li><i :class="service.icon"></i></li>
              <li class="mx-3">{{ service.name }}</li>
            </ul>
          </div>
        </div>
        <button id="show-contact-btn" class="btn mt-3 w-25 text-uppercase" @click="toggleContactForm">Contact</button>
        <transition name="fade">
          <div v-if="showContactForm" id="contacts" class="mt-5 border border-3 p-3">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" v-model="name">
            </div>
            <div class="mb-3">
              <label for="surname" class="form-label">Surname</label>
              <input type="text" class="form-control" id="surname" v-model="surname">
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address*</label>
              <input type="email" class="form-control" id="email" placeholder="name@example.com" required v-model="email">
              <p v-if="errors.email" class="text-danger">{{ errors.email }}</p>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">Content*</label>
              <textarea class="form-control" id="content" rows="3" required v-model="content"></textarea>
              <p v-if="errors.content" class="text-danger">{{ errors.content }}</p>
            </div>
            <button id="msg-btn" type="submit" class="btn" @click="sendForm">Send</button>
            <p v-if="messageSent" class="mt-3 text-success">Message sent!</p>
          </div>
        </transition>
      </div>
      <div id="slider-map">
        <h3 class="p-4">Where will you be</h3>
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
      name: '',
      surname: '',
      content: '',
      email: '',
      apartment_id: '',
      activeIndexSlide: 0,
      showContactForm: false,
      messageSent: false,
      errors: {},
      images: [], 
      activeImage: ''
    };
  },
  methods: {
    sendForm() {
      this.errors = {};
      if (!this.email) {
        this.errors.email = 'Email is a required field';
      } else if (!this.email.includes('@') || !this.email.includes('.')) {
        this.errors.email = 'This is not an email';
      }
      if (!this.content) {
        this.errors.content = 'You must insert a text';
      }
      if (!this.errors.email && !this.errors.content) {
        const data = {
          name: this.name,
          surname: this.surname,
          email: this.email,
          content: this.content,
          apartment_id: this.item.id,
        };
        axios.post(`${this.store.apiBaseUrl}/messages`, data).then((res) => {
          console.log(res.data.status);
          this.name = '';
          this.surname = '';
          this.email = '';
          this.content = '';
          this.messageSent = true;
          setTimeout(() => {
            this.messageSent = false;
          }, 3000);
        });
      }
    },
    showImg() {
      const imageString = this.item.image;
      const images = JSON.parse(imageString);
      this.images = images.map(img => this.store.imgBasePath + img);
      this.activeImage = this.images[0];
    },
    nextSlide() {
      this.activeIndexSlide = (this.activeIndexSlide + 1) % this.images.length;
      this.activeImage = this.images[this.activeIndexSlide];
    },
    prevSlide() {
      this.activeIndexSlide = (this.activeIndexSlide - 1 + this.images.length) % this.images.length;
      this.activeImage = this.images[this.activeIndexSlide];
    },
    goToSlide(index) {
      this.activeIndexSlide = index;
      this.activeImage = this.images[index];
    },
    showMap() {
      const initMap = () => {
        const mapElement = document.getElementById("map");
        if (mapElement) {
          const apiKey = TOMTOM_API_KEY;
          try {
            let map = tt.map({
              key: apiKey,
              container: "map",
              center: [this.item.longitude, this.item.latitude],
              zoom: 15,
            });
            let marker = new tt.Marker({ color: "#D98B2C" })
              .setLngLat([this.item.longitude, this.item.latitude])
              .setPopup(new tt.Popup().setHTML(`<h3>${this.item.address}</h3>`))
              .addTo(map);
            map.addControl(new tt.NavigationControl());
          } catch (error) {
            console.error("Errore durante l'inizializzazione della mappa:", error);
          }
        }
      };
      if (document.readyState === "complete") {
        initMap();
      } else {
        window.addEventListener("load", initMap);
      }
    },
    toggleContactForm() {
      this.showContactForm = !this.showContactForm;
    },
    handleImageError(event) {
      event.target.src = ""; // Fallback image URL
    }
  },
  mounted() {
    this.showMap();
    this.showImg();
  },
  watch: {
    email(newVal) {
      if (newVal) {
        this.errors.email = '';
      }
    },
    content(newVal) {
      if (newVal) {
        this.errors.content = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/variables" as *;

#slider-container {
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

#slider-info .card-body {
  padding: 2rem;
}

#slider-info .card-title {
  font-size: 1.5rem;
  color: #343a40;
}

#slider-info .list-group-item {
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
}
.slider-cont{
  width: 900px;
  height: 800px;
  margin: 0 auto;
}

#slider {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-wrapper {
  width: 100%;
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
  border-bottom: 0;
  border-radius: 10px 10px 0 0;
}

.item .text {
  position: absolute;
  right: 20px;
  top: 20px;
  text-align: right;
  color: white;
}

.thumbs {
  display: flex;
  width: 100%;
  background: #000;
  position: relative;
  justify-content: space-between;
}

.thumb {
  flex: 1;
  margin: 5px;
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

#slider-info {
  width: 90%;
}

#slider-services ul {
  list-style-type: none;
  padding-left: 0;
}

#slider-map {
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#map {
  width: 90%;
  height: 400px;
}

#contacts {
  background-color: #f8f9fa;
  padding: 30px;
  border: 2px solid #dee2e6;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
  transition: box-shadow 0.3s ease;
}

#contacts:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

#contacts .form-label {
  font-weight: bold;
  color: #495057;
}

#contacts .form-control {
  border-radius: 10px;
  border: 1px solid #ced4da;
  padding: 12px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

#contacts .form-control:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
}

#contacts .mb-3 {
  margin-bottom: 1.5rem;
}

#contacts input::placeholder,
#contacts textarea::placeholder {
  color: #6c757d;
}

#contacts textarea {
  resize: vertical;
}

#msg-btn,
#show-contact-btn {
  background-color: $secondary-gold;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

#msg-btn:hover {
  background-color: darken($secondary-gold, 10%);
  transform: translateY(-2px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  #contacts {
    padding: 20px;
    border-radius: 15px;
  }

  #contacts .form-control {
    font-size: 14px;
  }
}
</style>
