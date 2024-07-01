<template>
  HEADER
  <ul>
    <li v-for="(link, index) in links" :key="index">
      <router-link
        :to="{ name: link.routeName }"
        class="nav-link"
        active-class="active"
      >
        {{ link.label }}
      </router-link>
    </li>
    <li class="ms-auto">
      <a href="http://localhost:8000/login" class="nav-link">
        <span>Login</span>
      </a>
    </li>
    <li class="ms-auto">
      <a href="http://localhost:8000/register" class="nav-link">
        <span>Registrati</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      links: [
        {
          label: "Home",
          routeName: "home",
        },
        {
          label: "Contattaci",
          routeName: "contact",
        },
        {
          label: "Chi Siamo",
          routeName: "about",
        },
        // {
        //   label: "Login",
        //   routeName: "login",
        // },
        // {
        //   label: "Registrati",
        //   routeName: "register",
        // },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
