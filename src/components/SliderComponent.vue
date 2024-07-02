<template>
  <div class="container pt-5 pb-5">
    <div id="slider-title" class="px-5 mb-4">
      <h2>
        {{ slides[activeIndexSlide].title }}
        Title
      </h2>
    </div>
    <div id="slider">
      <div class="slider-wrapper " tabindex="0" @keyup.up="prevSlide" @keyup.down="nextSlide">
        <div class="item">
          <img :src="slides[activeIndexSlide].image" :alt="slides[activeIndexSlide].title" />
          <div class="text">
            <h3>{{ slides[activeIndexSlide].title }}</h3>
          </div>
        </div>

        <div class="thumbs">
          <div class="prev" @click="prevSlide"></div>
          <div class="next" @click="nextSlide"></div>
          <div class="thumb" :class="{ active: index === activeIndexSlide }" v-for="(slide, index) in slides"
            :key="index" @mouseover="goToSlide(index)">
            <img :src="slide.image" :alt="slide.title" />
          </div>
        </div>
      </div>
    </div>
    <div id="slider-content" class="d-flex container mt-3">
      <div id="slider-info">
        <p class="address p-4 fs-4">{{ slides[activeIndexSlide].address }} La via va inserita qua: Intero alloggio:
          unità in affitto
          <br>
        <p class="fs-6">
          {{ slides[activeIndexSlide].description }} descrizione
          <br>
          <i class="fa-solid fa-star"></i>
          <span>{{ slides[activeIndexSlide].rating }} .ratings</span>
        </p>
        </p>
        <div id="host" class="p-4 border-top">
          img
          <img :src="slides[activeIndexSlide].hostImage" :alt="slides[activeIndexSlide].hostName" />
          <p>{{ slides[activeIndexSlide].hostName }} host name</p>
        </div>

      </div>

      <div id="slider-reservation">
        <ReservationComponent />
      </div>

    </div>
  </div>
</template>

<script>
import ReservationComponent from "./ReservationComponent.vue";
export default {
  name: "CardComponent",
  components: {
    ReservationComponent,
  },
  data() {
    return {
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
      autoPlayId: null,
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
  width: 65%;
}
</style>
