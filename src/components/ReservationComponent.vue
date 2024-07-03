<template>
    <div id="reservation-container" class="m-3">
        <div id="reservation-price">
            <h3>Prezzo</h3>
            <p>€ 75.00</p>
        </div>
        <div id="reservation-form" class="d-flex mb-4">
            <input type="date" class="form-select">
            <input type="date" class="form-select">
            <select name="Ospiti" id="" class="form-select w-100">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
        </div>
        <button class="w-100 btn btn-primary">Prenota</button>
        <p class="text-center mt-3">Non puoi modificare questa prenotazione</p>
        <div id="reservation-info">
            <div class="d-flex justify-content-between">
                <div class="text-decoration-underline m-2">50€ x notte</div>
                <div>75€</div>
            </div>
            <div class="d-flex justify-content-between">
                <div class="text-decoration-underline m-2">Costi di servizio</div>
                <div>30€</div>
            </div>
            <div class="d-flex justify-content-between">
                <div class="text-decoration-underline m-2">Tasse</div>
                <div>20€</div>
            </div>
            <div class="d-flex justify-content-between border-top ">
                <div class="text-decoration-underline m-2">Totale</div>
                <div>125€</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ReservationComponent',
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/variables" as *;

#reservation-container {
    border: 3px solid $secondary-gold;
    border-radius: 15px;
    padding: 1rem;
    width: 350px;


}
</style>