<template>
  <header :class="{ 'fixed-header': isFixed }">
    <div class="d-flex justify-content-between align-items-center" id="header-nav">
      <div class="d-flex align-items-center">
        <div id="logo">
          <img :src="logo" alt="Logo">
        </div>
        <div id="header_links" class="d-flex" ref="navLinks">
          <ul>
            <li v-for="(link, index) in links" :key="index">
              <router-link :to="{ name: link.routeName }" class="nav-link" active-class="active">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div id="header_logins" class="d-flex">
        <ul>
          <li>
            <a href="http://localhost:8000/login" class="nav-link">
              <i class="fa-solid fa-user"></i>
              <span class="mx-2">Admin Login</span>
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
          //da sistemare assolutamente!!!
        { label: "Home", routeName: "home" }
      ],
      isFixed: false, // Stato per tracciare se l'header è fisso
    };
  },
  methods: {
    handleScroll() {
      // Controlla se la pagina è stata scrollata più di 50px
      this.isFixed = window.scrollY > 50;
    },
    toggleMenu() {
      // Add logic to toggle visibility of navigation links on click
      this.$refs.navLinks.classList.toggle('show');
    }
  },
  mounted() {
    // Aggiungi un listener per l'evento di scroll quando il componente è montato
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    // Rimuovi il listener per l'evento di scroll quando il componente è distrutto
    window.removeEventListener('scroll', this.handleScroll);
  },
  toggleMenu() {
    this.$refs.navLinks.classList
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/partials/variables.scss';

.hamburger-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  .bar {
    width: 30px;
    height: 3px;
    background-color: $secondary-gold;
    margin-bottom: 5px;
  }
}

#header_links ul {
  display: flex;
  /* Show links on larger screens */

  &.show {
    /* Hide links by default on small screens */
    display: none;
  }
}

#header-nav {
  height: 100px;
  width: 100%;
}

header {
  background-color: $primary-bg;
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  z-index: 5000;
  transition: all 0.3s ease-in-out;

  img {
    width: 100%;
    height: 90px;
  }

  &.fixed-header {
    width: 70%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    margin: 0 15%;
    top: 10px;
    height: 100px;

    & img {
      height: 80%;
    }
  }

  #logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

#header_links,
#header_logins {
  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;

    li {
      padding: 0 0.5rem;
      margin: 0 0.5rem;
      color: $secondary-gold;
    }
  }
}
</style>
