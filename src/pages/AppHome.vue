<template>
    <HeaderComponent />
    <MainComponent />
    <JumboComponent />
    <FooterComponent />
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import MainComponent from "../components/MainComponent.vue";
import JumboComponent from "../components/JumboComponent.vue";
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
