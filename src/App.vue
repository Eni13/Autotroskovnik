<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light">
      <!-- kod iz Bootstrapa -->

      <a class="navbar-brand" href="#">
        <img
          src="@/assets/images.jpeg"
          alt="Logo"
          height="80"
          class="d-inline-block align-text-top"
          loading="lazy"
        />
        <!--širinu smo makli da bude automatska-->
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li v-if="!authenticated" class="nav-item">
            <router-link to="/login" class="nav-link">Prijavi se</router-link>
          </li>
          <li v-if="!authenticated" class="nav-item">
            <router-link to="/signup" class="nav-link"
              >Registriraj se</router-link
            >
          </li>

          <li v-if="authenticated" class="nav-item">
            <a href="#" @click.prevent="logout()" class="nav-link">Odjavi se</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import router from "@/router";

export default {
  name: "App",
  data() {
    return {
      authenticated: false, // Status korisnika
      userData: null, // Podaci o korisniku iz Firestore-a
    };
  },
  mounted() {
    this.checkUser(); // provjera korisnika
  },
  methods: {
    async checkUser() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.authenticated = true; // Korisnik je prijavljen
          console.log("Korisnik prijavljen:", user.email);

          try {
            // pozovi dokument u kolekciji troskovi
            const docRef = doc(db, "troskovi", user.email); //kreiranje reference
            const docSnap = await getDoc(docRef); //dohvaćanje dokumenta iz firestora koristeći referecu

            if (docSnap.exists()) {
              this.userData = docSnap.data(); // Postavljamo podatke
              console.log("Podaci korisnika:", this.userData);
            }
          } catch (error) {
            //console.error("Pogreška", error);
          }
        } else {
          this.authenticated = false; // Korisnik nije prijavljen
          console.log("Korisnik nije prijavljen.");
        }
      });
    },

    logout() {
      signOut(auth)
        .then(() => {
          this.authenticated = false;
          this.userData = null;
          router.push("/login");
        })
        .catch((error) => {
          //console.error("Pogreška pri odjavi:", error);
        });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: lightblue;
  padding-bottom: 100px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
