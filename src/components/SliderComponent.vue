<template>
  <div class="container">
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
</template>

<script>
import { slides } from "../data";
export default {
  name: "CardComponent",
  data() {
    return {
      slides,
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
.item {
  float: left;
  width: 100%;
  height: 400px;
  position: relative;
}

.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 3px solid $secondary-gold;
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
</style>
