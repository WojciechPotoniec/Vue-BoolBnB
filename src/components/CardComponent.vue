<template>
  <RouterLink :to="{ name: 'apartment', params: { slug: card.slug } }" @click="viewCount(card)">
    <div class="container">
      <div class="apartments-card">
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
            <span class="area" v-if="isValidDistance(card.distance)">Distance: {{ formatDistance(card.distance) }} km</span>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script>
import { store } from "../store";
import SearchbarComponent from "./SearchbarComponent.vue";
export default {
  name: "CardComponent",
  components: {
    SearchbarComponent
  },
  props: {
    card: {
      type: Object,
      required: true
    },
    getOneImg: {
      type: Function,
      required: true
    },
    viewCount: {
      type: Function,
      required: true
    },
  },
  methods: {
    handleImageError(event) {
      event.target.src = "public/img/appartamento2.jpg"; // Fallback image URL
    },
    formatDistance(value) {
      if (value == null || isNaN(value)) {
        return "N/A";
      }
      return parseFloat(value).toFixed(2);
    },
    isValidDistance(value) {
      return value != null && !isNaN(value);
    }
  }
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/variables" as *;

a {
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
  object-fit: cover;
}

.apartments-card {
  color: $white;
  transition: 0.2s ease;
  cursor: pointer;
  padding: 10px;
  border-radius: 15px;
  border: 1px solid transparent;

  &:hover,
  &:focus {
    transition: 0.2s ease;
    border-color: $primary-bg;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.image {
  width: 100%;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  background: $white;

  img {
    display: block;
    width: 100%;
    height: 300px;
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
