<template>
  <div class="container stack">
    <div class="card">
      <div class="image">
        <!-- Place image here -->
        <div class="text">appartment title</div>
      </div>
      <p>description</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/variables" as *;

img {
  display: block;
  max-width: 100%;
}

.stack {
  width: 85%;
  max-width: 250px;
  transition: 0.25s ease;
  &:hover {
    transform: rotate(5deg);
    .card:before {
      transform: translatey(-2%) rotate(-4deg);
    }
    .card:after {
      transform: translatey(2%) rotate(4deg);
    }
  }
}

.card {
  aspect-ratio: 3 / 2;
  border: 2px solid $secondary-gold;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  transition: 0.15s ease;
  cursor: pointer;
  padding: 10% 10% 10%;
  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    border: 2px solid $secondary-gold;;
    border-radius: 10px;
    background-color: #fff;
    transform-origin: center center;
    z-index: -1;
    transition: 0.15s ease;
    top: 0;
    left: 0;
  }

  &:before {
    transform: translatey(-2%) rotate(-6deg);
  }

  &:after {
    transform: translatey(2%) rotate(6deg);
  }
}
.image {
  width: 100%;
  border: 2px solid $secondary-gold;
  border-radius: 10px;
  // background-color: #EEE;
  aspect-ratio: 1 / 1;
  position: relative;
}
.text {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 10px 5px 0;
}
</style>
