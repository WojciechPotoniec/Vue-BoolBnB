<template>
    <HeaderComponent />
    <JumboComponent />
    <MainComponent />
    <FooterComponent />
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import JumboComponent from "../components/JumboComponent.vue";
import MainComponent from "../components/MainComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";

export default {
  name: "AppHome",
  components: {
    HeaderComponent,
    MainComponent,
    JumboComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss" scoped></style>
