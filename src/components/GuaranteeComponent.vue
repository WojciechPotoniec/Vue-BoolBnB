<template>
    <div id="guarantee-container" class="container mt-5">
        <div id="guarantee" class="text-center">
            <h3 class="title-guarantee">Boolbnb's Guarantee Policy</h3>
            <p class="w-50 mx-auto">Booking with Boolbnb is easy and secure. We personally verify all properties to
                ensure that the service provided is always top-notch! <br>
                <strong>Book today and guarantee yourself a fantastic experience!</strong>
            </p>
        </div>
        <div class="row mt-5">
            <div class="col-12 col-xl-3 col-lg-6  text-center">
                <i class="fa-solid fa-award mb-3"></i>
                <p class="sub-guarantee">Secure booking
                <p>Our Booking Guarantee
                    <br>
                    Sicuro offers 24/7 support
                </p>
                </p>
            </div>
            <div class="col-12 col-xl-3 col-lg-6 text-center">
                <i class="fa-solid fa-suitcase mb-3"></i>
                <p class="sub-guarantee">Better quality of time
                <p>
                    From booking to stay, the journey is simple and pleasant
                </p>
                </p>
            </div>
            <div class="col-12 col-xl-3 col-lg-6 text-center">
                <i class="fa-solid fa-mug-hot mb-3"></i>
                <p class="sub-guarantee">With the intimacy of a home
                <p>
                    All the comforts at your disposal, swimming pool, free parking, Wi-fi, and much more
                </p>
                </p>
            </div>
            <div class="col-12 col-xl-3 col-lg-6 text-center">
                <i class="fa-solid fa-piggy-bank mb-3"></i>
                <p class="sub-guarantee">Much more than a holiday home 
                <p>
                    More space, more privacy, more services.. better quality
                </p>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GuaranteeComponent',
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;
#guarantee-container {
    padding: 50px 0;
}

.title-guarantee{
    font-size: 30px;
    font-weight: bold;
    color: $primary-bg;
}
.fa-solid{
    font-size: 50px;
    color: $primary-bg;
}
.sub-guarantee{
    font-size: 20px;
    font-weight: bold;
    color: $primary-bg;
}
</style>