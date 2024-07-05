<template>
  <RouterLink :to="{ name: 'apartment', params: { slug: card.slug } }">
    <div class="container stack">
      <div class="card">
        <div class="image">
          <img :src="getOneImg(card)" class="card-img-top" alt="" /> 
          <div class="text">{{ card.title }}</div>
          <div class="card-body">
           
          </div>
        </div>
      </div>
    </div>
    
  </RouterLink>

 
</template>

<script>
import { store } from "../store";
export default {
  name: "CardComponent",
  props: {
    card: {
      type: Object,
      required: true
    },
    getOneImg: {
      type: Function,
      required: true
    }
  }
};
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
</style>
