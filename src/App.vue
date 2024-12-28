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
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Prijavi se</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link"
              >Registriraj se</router-link
            >
          </li>
        </ul>

        <a href="#" @click.prevent="logout">Odjavi se</a>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import { auth } from "@/firebase"; // Importajte `auth` iz inicijalizacijske datoteke
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.email);
  } else {
    console.log("Nema korisnika");
  }
});

export default {
  name: "App",

  name: "logout",
  methods: {
    logout() {
      signOut(auth).then(() => {
        this.$router.push("/login");
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
