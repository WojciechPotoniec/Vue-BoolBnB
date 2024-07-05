<template>
  <div class="mt-5 pt-5 container" id="results">
    <h1 class="mt-2">Results</h1>
    <div class="row">
      <h2>results for {{ this.store.destination }}</h2>
      <p>the number of apartment for your search are: {{ this.store.apartmentsFiltered.length }}</p>
      <div
        class="col-12 col-xl-4 col-lg-6"
        v-for="(apartment, i) in this.store.apartmentsFiltered"
        :key="i"
      >
        <CardComponent :card="apartment" />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";
import CardComponent from "@/components/CardComponent.vue";

export default {
  name: "ResultComponent",
  components: {
    CardComponent,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped></style>