<template>
  <div>
    <h1>Registriraj se</h1>
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="email">Unesi e-mail</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Unesi e-mail"
              />
              <small id="emailHelp" class="form-text text-muted">
                E-mail se neće dijeliti s drugima
              </small>
            </div>
            <div class="form-group">
              <label for="password">Lozinka</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="password"
                placeholder="Unesi lozinku"
              />
            </div>
            <div class="form-group">
              <label for="passwordRepeat">Potvrdi lozinku</label>
              <input
                type="password"
                v-model="passwordRepeat"
                class="form-control"
                id="passwordRepeat"
                placeholder="Potvrdi lozinku"
              />
            </div>
            <button type="button" @click="signup" class="btn btn-primary mt-5">
              Potvrdi
            </button>
          </form>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase";
// iz firebase.js gdje smo ga exportali

export default {
  name: "signup",
  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
    };
  },

  methods: {
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //provjeravanje valjanosti maila
      return emailRegex.test(email);
    },
    async signup() {
      const auth = getAuth(app);

      if (!this.isValidEmail(this.email)) {
        alert("Unesite ispravnu email adresu!");
        return;
      }
      if (this.password !== this.passwordRepeat) {
        alert("Lozinke se ne podudaraju");
      }
      if (this.password <= 6) {
        alert("Lozinka mora imati šest ili više slova");
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password,
          this.passwordRepeat
        ).then(() => {
          alert("Uspješna registracija");
          this.$router.push("/login");
        });
      } catch (error) {
        console.error("Greška prilikom registracije:", error.message);
        alert("Greška: " + error.message);
      }
    },
  },
};
</script>
