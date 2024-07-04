<template>
    <div v-if="apartment">
        <SliderComponent :item="apartment"/>
    </div>
    <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store";
import SliderComponent from "../components/SliderComponent.vue";
export default {
  name: "ShowComponent",
  components: {
    SliderComponent,
  },
  data() {
    return {
      store,
      apartment: null,
    };
  },

  methods: {
    getApartment() {
      console.log(this.$route);
      axios
        .get(`${ this.store.apiBaseUrl }/apartments/${ this.$route.params.slug }`)
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

<style lang="scss" scoped></style>
