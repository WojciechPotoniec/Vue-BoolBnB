<template>
    <div id="jumbo">
        <div class="slider-container">
            <img v-for="(image, index) in images" :key="index" :src="image" :alt="'Image ' + (index + 1)" :class="{ active: index === currentImageIndex }">
        </div>
    </div>
    <div id="searchbar-container">
        <SearchbarComponent />
    </div>
</template>

<script>
import SearchbarComponent from './SearchbarComponent.vue';

export default {
    name: 'JumboComponent',
    components: {
        SearchbarComponent
    },
    data() {
        return {
            images: [
                "https://traveltriangle.com/blog/wp-content/uploads/2016/12/shutterstock_190886390.jpg",
                "https://pyt-images.imgix.net/Bali_6eebf60dd3.jpg?auto=format&fit=crop&w=1152&h=440&crop=entropy",
                "https://worldwildschooling.com/wp-content/uploads/2024/02/Most-Beautiful-Places-in-the-World-to-Add-to-Your-Bucket-List-Bali-Indonesia-tawatchai1990-Adobe-Stock-Photo-146567837.jpg",
                "https://img.traveltriangle.com/blog/wp-content/uploads/2023/03/A-Beautiful-view-of-Istanbul.jpg",
                "https://studyinginswitzerland.com/wp-content/uploads/2022/02/Lugano-city.jpg"
            ],
            currentImageIndex: 0
        }
    },
    mounted() {
        this.startSlideshow();
    },
    methods: {
        startSlideshow() {
            setInterval(() => {
                this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
            }, 5000); 
        }
    }
}
</script>

<style lang="scss" scoped>
#jumbo {
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: relative;
}

.slider-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.slider-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 600px;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1s ease-in-out;
}

.slider-container img.active {
    opacity: 1;
}
</style>
