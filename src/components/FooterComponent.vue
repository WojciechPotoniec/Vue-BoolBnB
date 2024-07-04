<template>
    <footer>
        <div class="container pt-3">
            <div class="d-flex justify-content-between">
                <ul id="footer_links" class="d-flex">
                    <li><a href="http://localhost:5173">
                        &copy; Boolbnb, Inc
                    </a></li>
                    <li><a href="#">
                        Privacy Policy
                    </a></li>
                    <li><a href="#">
                        Contact
                    </a></li>
                    <li><a href="http://localhost:5173/about">
                        About Us
                    </a></li>
                </ul>
                <div id="socials">
                    <ul class="d-flex">
                        <li><a href="#">
                            <i class="fa-brands fa-facebook-f"></i>
                        </a></li>
                        <li><a href="#">
                            <i class="fa-brands fa-twitter"></i>
                        </a></li>
                        <li><a href="#">
                            <i class="fa-brands fa-instagram"></i>
                        </a></li>
                        <div id="arrow">
                            <i id="scrollToTop" class="fa-solid fa-arrow-up mx-5"></i>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>


<script>
export default {
  name: 'FooterComponent',
  mounted() {
    // Seleziona l'elemento con l'ID 'scrollToTop'
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    // Aggiungi un event listener per il click sull'icona
    if (scrollToTopButton) {
      scrollToTopButton.addEventListener('click', () => {
        // Esegue lo scroll verso l'alto con una transizione fluida
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;

footer {
  width: 100%;
  height: 100px;
  background-color: $primary-bg;
  
  ul {
    list-style-type: none;
    li a {
      color: $secondary-gold;
      text-decoration: none;
      font-size: 0.9rem;
      padding: 0 0.5rem;
    }
  }
}

#arrow {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  i{
    background-color: white;
    border-radius: 50%;
    padding: 0.5rem;
    border: 3px solid $secondary-gold;
  }
}

#scrollToTop {
  color: $secondary-gold;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

#scrollToTop:hover {
  transform: scale(1.2);
}
</style>
