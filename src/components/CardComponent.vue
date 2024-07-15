<template>
  <RouterLink :to="{ name: 'apartment', params: { slug: card.slug } }" @click="viewCount(card)">
    <div class="container">
      <div class="apartments-card">
        <div class="image">
          <img :src="getOneImg(card)" class="card-img-top" :alt="card.title" @error="handleImageError" />
          <div class="text">{{ card.title }}</div>
        </div>
        <div class="card-body">
          <p class="address text-dark">{{ card.address }}</p>
          <div class="details">
            <span class="rooms">
              <i class="fa fa-door-open"></i> {{ card.rooms_num }} rooms
            </span>
            <span class="beds">
              <i class="fa fa-bed"></i> {{ card.beds_num }} beds
            </span>
            <span class="bathrooms">
              <i class="fa fa-bath"></i> {{ card.bathrooms_num }} bathrooms
            </span>
            <span class="area">
              <i class="fa fa-ruler-combined"></i> {{ card.square_meters }} m²
            </span>
            <span class="area" v-if="isValidDistance(card.distance)">
              <i class="fa fa-map-marker-alt"></i> Distance: {{ formatDistance(card.distance) }} km
            </span>
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
    margin-bottom: 5px;
  }

  .details {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;

    span {
      font-size: 0.85em;
      padding: 3px 2px;

      color: grey;
      display: flex;
      align-items: center;

      i {
        margin-right: 5px;
      }
    }
  }
}
</style>
