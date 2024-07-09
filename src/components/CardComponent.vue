<template>
  <RouterLink :to="{ name: 'apartment', params: { slug: card.slug } }">
    <div class="container stack">
      <div class="card">
        <div class="image">
          <img :src="getOneImg(card)" class="card-img-top" :alt="card.title" @error="handleImageError" />
          <div class="text">{{ card.title }}</div>
        </div>
        <div class="card-body mt-3">
          <p class="address text-dark">{{ card.address }}</p>
          <div class="details">
            <span class="rooms">{{ card.rooms_num }} rooms</span>
            <span class="beds">{{ card.beds_num }} beds</span>
            <span class="bathrooms">{{ card.bathrooms_num }} bathrooms</span>
            <span class="area">{{ card.square_meters }} m²</span>
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
  },
  methods: {
    handleImageError(event) {
      event.target.src = "public/img/appartamento2.jpg"; // Fallback image URL
    }
  }
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/variables" as *;
a{
  text-decoration: none;
}
img {
  display: block;
  max-width: 100%;
  object-fit: cover;
}

.stack {
  width: 85%;
  max-width: 350px;
  padding: 20px;
  transition: 0.3s ease;
  margin: 20px auto;

  // &:hover {
  //   transform: rotate(3deg);

  //   .card:before {
  //     transform: translateY(-2%) rotate(-3deg);
  //   }

  //   .card:after {
  //     transform: translateY(2%) rotate(3deg);
  //   }
  // }
}

.card {
  color: $white;
  aspect-ratio: 3 / 2;
  //border: 2px solid $secondary-gold;
  border-radius: 15px;
  box-shadow: 10px 10px 20px $primary-bg;
  //background: linear-gradient(to bottom, rgba(grey, 0.9), rgba(rgba(198, 193, 193, 0.731), 0.9));
  position: relative;
  transition: 0.2s ease;
  cursor: pointer;
  padding: 15px;
  width: 400px;
  height: 350px;

  &:hover {
    transform: scale(1.05);
    transition: 1s;
    .text {
      color: $secondary-gold;
      transition: 0.2s ease;
    }
  }

  // &:before,
  // &:after {
  //   content: "";
  //   display: block;
  //   position: absolute;
  //   height: 100%;
  //   width: 100%;
  //   border: 2px solid $secondary-gold;
  //   border-radius: 15px;
  //   background-color: black;
  //   background-size: cover;
  //   background-position: center;
  //   background-repeat: no-repeat;
  //   opacity: 0.4;
  //   transform-origin: center center;
  //   z-index: -1;
  //   transition: 0.2s ease;
  //   top: 0;
  //   left: 0;
  // }

  // &:before {
  //   transform: translateY(-3%) rotate(-4deg);
  // }

  // &:after {
  //   transform: translateY(3%) rotate(4deg);
  // }
}

.image {
  width: 100%;
  //border: 2px solid $secondary-gold;
  border-radius: 15px;
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;
  background: $white;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.text {
  color: $white;
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 5px 10px;
  background: rgba($black, 0.6);
  border-radius: 5px;
}

.card-body {
  padding: 10px 0;

  .address {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .details {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    span {
      font-size: 0.85em;
      padding: 5px 10px;
      border: 2px solid $secondary-gold;
      border-radius: 5px;
      color: $secondary-gold;
    }
  }
}
</style>
