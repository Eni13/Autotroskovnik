<template>
  <div class="about">
    <h1>Prijavite se</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">E-mail adresa:</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Lozinka</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <br />
            <button type="button" @click="login" class="btn btn-primary">
              Prijavi se
            </button>
          </form>
        </div>
        <div class="col-sm"></div>
        <!-- ovo je klasa od bootstrap-a -->
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        console.log("Prijavljen korisnik:", userCredential.user);
        alert("Prijava uspješna!");

        // Navigacija na Početnu stranicu
        this.$router.push("/menu");
      } catch (error) {
        console.error("Greška:", error.message);
        alert("Došlo je do greške: " + error.message);
      }
    },
  },
};
</script>
