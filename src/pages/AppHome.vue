<template>
  <JumboComponent />
  <MainComponent />
</template>

<script>
import JumboComponent from "../components/JumboComponent.vue";
import MainComponent from "../components/MainComponent.vue";
export default {
  name: "AppHome",
  components: {
    MainComponent,
    JumboComponent,
  },
};
</script>

<style lang="scss" scoped></style>
