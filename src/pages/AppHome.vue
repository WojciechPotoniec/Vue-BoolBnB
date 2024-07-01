<template>
    <HeaderComponent />
    <JumboComponent />
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import JumboComponent from "../components/JumboComponent.vue";
export default {
  name: "AppHome",
  components: {
    HeaderComponent,
    JumboComponent,
  },
};
</script>

<style lang="scss" scoped></style>
