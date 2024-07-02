<template>
    <main>
        TEST SLIDER
        <CardComponent />
        <SliderComponent />
    </main>
</template>

<script>
import CardComponent from './CardComponent.vue';
import SliderComponent from './SliderComponent.vue';
    export default {
        name: 'MainComponent',
        components: {
            CardComponent,
            SliderComponent
        }
    }
</script>

<style lang="scss" scoped>

</style>