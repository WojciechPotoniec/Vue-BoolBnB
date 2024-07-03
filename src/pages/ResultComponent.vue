<template>
    <div class="mt-5 pt-5 container" id="results">
        <h1 class="mt-2">Results</h1>
        
        <CardComponent />
    </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue';

    export default {
        name: 'ResultComponent',
        components: {
            CardComponent
        }
    }
</script>

<style lang="scss" scoped>

</style>