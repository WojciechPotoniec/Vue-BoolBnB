<template>
    <div id="searchbar" class="mt-3">
        <div class="d-flex container justify-content-between pt-2">
            <div id="searchbar_input">
                <label for="text">Dove</label>
                <input type="text" aria-label="First name" class="form-control" placeholder="Cerca Destinazione">
            </div>
            <div class="">
                <label for="text">Data</label>
                <input type="date" class="form-control" placeholder="Aggiungi data">
            </div>
            <div>
                <label for="text">Data</label>
                <input type="date" class="form-control" placeholder="Aggiungi data">
            </div>
            <div>
                <label for="text">Ospiti</label>
                <input type="text" aria-label="First name" class="form-control" placeholder="Aggiungi ospiti">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchbarComponent',
}
</script>

<style lang="scss" scoped>
#searchbar {
    border-top: 5px solid #D98B2C;
    border-bottom: 5px solid #D98B2C;
    width: 80%;
    height: 85px;
    margin: 0 auto;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: white;
    border-radius: 100px;
}

    input{
        border: none;
        outline: none;
    }

</style>