<template>
  <header>
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        <div id="logo">
          <img
            :src="logo"
            alt="Logo">
        </div>
        
        <div id="header_links" class="d-flex">
          <ul>
            <li v-for="(link, index) in links" :key="index">
              <router-link :to="{ name: link.routeName }" class="nav-link" active-class="active">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div id="header_logins" class="d-flex ">
        <ul>
          <li>
            <a href="http://localhost:8000/login" class="nav-link">
              <span>Login</span>
            </a>
          </li>
          <li class="">
            <a href="http://localhost:8000/register" class="nav-link">
              <span>Registrati</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      logo: "../public/img/logo.png",
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

<style lang="scss" scoped>
@import '../assets/styles/partials/variables.scss';

header {
  background-color: $primary-bg;
  width: 100%;
  height: 90px;
}

.debug {
  border: 2px solid black;
}

#header_links {
  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5%;

    li {
      padding: 0 0.5rem;
      margin: 0 0.5rem;
      color: $secondary-gold;

    }
  }
}

#header_logins {
  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
    margin-right: 5%;
    color: $secondary-gold;

    li {
      padding: 0 0.5rem;
      margin: 0 0.5rem;
    }
  }
}
</style>
