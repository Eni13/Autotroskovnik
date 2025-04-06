<template>
  <div class="container">
    <h2>Dodaj Trošak</h2>
    <form @submit.prevent="dodajTrosak">
      <div class="mb-3">
        <label for="naziv" class="form-label">Naziv troška</label>
        <input
          type="text"
          id="naziv"
          v-model="noviTrosak.naziv"
          class="form-control"
          placeholder="Unesite naziv troška"
          required
        />
      </div>

      <div class="mb-3">
        <label for="iznos" class="form-label">Iznos</label>
        <input
          type="number"
          id="iznos"
          v-model="noviTrosak.iznos"
          class="form-control"
          placeholder="Unesite iznos"
          step="0.01"
          required
        />
      </div>

      <div class="mb-4">
        <label for="datum" class="form-label">Datum</label>
        <input
          type="date"
          id="datum"
          v-model="noviTrosak.datum"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Dodaj</button>
    </form>

    <h3 class="mt-5">Popis Troškova</h3>
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="(trosak, index) in troskovi"
        :key="index"
      >
        <span>{{ trosak.naziv }} - {{ trosak.iznos.toFixed(2) }} EUR</span>

        <div>
          <button
            class="btn btn-warning btn-sm"
            @click="prikaziUrediTrosak(trosak)"
          >
            Uredi
          </button>

          <button
            class="btn btn-danger btn-sm"
            @click="ukloniTrosak(trosak.id)"
          >
            Obriši
          </button>
        </div>
      </li>
    </ul>

    <!-- Gumbi za otvaranje modala -->
    <div class="mt-4">
      <button class="btn btn-info" @click="otvoriModal('mjesečni')">
        Mjesečni troškovi
      </button>
      <button class="btn btn-info" @click="otvoriModal('godišnji')">
        Godišnji troškovi
      </button>
    </div>

    <!-- Modal za uređivanje troska -->
    <div
      v-if="urediTrosakModal"
      class="modal d-block"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Uredi Trošak</h5>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="naziv" class="form-label">Naziv troška</label>
                <input
                  v-model="urediTrosakPodaci.naziv"
                  type="text"
                  class="form-control"
                  id="naziv"
                  placeholder="Unesite naziv troška"
                />
              </div>
              <div class="mb-3">
                <label for="iznos" class="form-label">Iznos</label>
                <input
                  v-model="urediTrosakPodaci.iznos"
                  type="number"
                  class="form-control"
                  id="iznos"
                  placeholder="Unesite iznos"
                />
              </div>
              <div class="mb-3">
                <label for="datum" class="form-label">Datum</label>
                <input
                  v-model="urediTrosakPodaci.datum"
                  type="date"
                  class="form-control"
                  id="datum"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="urediTrosakModal = false"
            >
              Zatvori
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="spremiIzmjeneTroska"
            >
              Spremi izmjene
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- prozor za mjesečne troškove -->
    <div v-if="modalMjesečni" class="modal">
      <div class="modal-content">
        <h4>Mjesečni Troškovi</h4>
        <div class="form-group mb-3">
          <label for="mjesec">Odaberite Mjesec:</label>
          <select v-model="selectedMjesec" class="form-control" id="mjesec">
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="index"
            >
              {{ month }}
            </option>
          </select>
        </div>

        <div class="form-group mb-3">
          <label for="godina">Unesite Godinu:</label>
          <input
            type="number"
            id="godina"
            v-model="selectedGodina"
            class="form-control"
            placeholder="Unesite godinu"
            required
          />
        </div>

        <h5>{{ odabraniMjesecGodina }}</h5>
        <ul class="list-group">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="(trosak, index) in filtriraniTroskovi"
            :key="index"
          >
            <span>{{ trosak.naziv }} - {{ trosak.iznos.toFixed(2) }} EUR</span>
          </li>
        </ul>
        <h5 class="mt-3">
          Ukupni troškovi: {{ ukupniMjesečni.toFixed(2) }} EUR
        </h5>
        <button class="btn btn-secondary mt-3" @click="zatvoriModal">
          Zatvori
        </button>
      </div>
    </div>

    <!-- prozor za godišnje troškove -->
    <div v-if="modalGodišnji" class="modal">
      <div class="modal-content">
        <h4>Godišnji Troškovi</h4>
        <div class="form-group mb-3">
          <label for="godina">Unesite Godinu:</label>
          <input
            type="number"
            id="godina"
            v-model="selectedGodina"
            class="form-control"
            placeholder="Unesite godinu"
            required
          />
        </div>

        <h5>{{ selectedGodina }} Godina</h5>
        <ul class="list-group">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="(trosak, index) in filtriraniTroskoviGodina"
            :key="index"
          >
            <span>{{ trosak.naziv }} - {{ trosak.iznos.toFixed(2) }} EUR</span>
          </li>
        </ul>
        <h5 class="mt-3">
          Ukupni troškovi: {{ ukupniGodišnji.toFixed(2) }} EUR
        </h5>
        <button class="btn btn-secondary mt-3" @click="zatvoriModal">
          Zatvori
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export default {
  data() {
    return {
      noviTrosak: {
        naziv: "",
        iznos: "",
        datum: "",
      },
      troskovi: [],
      urediTrosakModal: false,
      urediTrosakPodaci: {
        id: null,
        naziv: "",
        iznos: "",
        datum: "",
      },
      selectedMjesec: new Date().getMonth(),
      selectedGodina: new Date().getFullYear(),
      months: [
        "Siječanj",
        "Veljača",
        "Ožujak",
        "Travanj",
        "Svibanj",
        "Lipanj",
        "Srpanj",
        "Kolovoz",
        "Rujan",
        "Listopad",
        "Studeni",
        "Prosinac",
      ],
      modalMjesečni: false,
      modalGodišnji: false,
    };
  },
  computed: {
    odabraniMjesecGodina() {
      const mjesec = this.months[this.selectedMjesec];
      const godina = this.selectedGodina;
      return `${mjesec} ${godina}`;
    },
    filtriraniTroskovi() {
      // troskovi za mjesec
      return this.troskovi.filter((trosak) => {
        const datum = new Date(trosak.datum);
        const mjesec = datum.getMonth();
        const godina = datum.getFullYear();
        /*  console.log(
          `Provjera: datum: ${datum}, mjesec: ${mjesec}, godina: ${godina}`
        ); */
        return mjesec === this.selectedMjesec && godina === this.selectedGodina;
      });
    },
    filtriraniTroskoviGodina() {
      //troskovi za godinu
      return this.troskovi.filter((trosak) => {
        const datum = new Date(trosak.datum);
        const godina = datum.getFullYear();
        return godina === this.selectedGodina;
      });
    },
    ukupniMjesečni() {
      return this.filtriraniTroskovi.reduce(
        (sum, trosak) => sum + trosak.iznos,
        0
      );
    },
    ukupniGodišnji() {
      return this.filtriraniTroskoviGodina.reduce(
        (sum, trosak) => sum + trosak.iznos,
        0
      );
    },
  },
  methods: {
    async dodajTrosak() {
      try {
        if (
          !this.noviTrosak.naziv ||
          !this.noviTrosak.iznos ||
          !this.noviTrosak.datum
        ) {
          alert("Potrebno je ispuniti sve podatke!");
          return;
        }

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          alert("Morate biti prijavljeni kako biste dodali trošak.");
          return;
        }

        const userEmail = user.email;

        const docRef = await addDoc(collection(db, "troskovi"), {
          naziv: this.noviTrosak.naziv,
          iznos: parseFloat(this.noviTrosak.iznos),
          datum: this.noviTrosak.datum,
          createdAt: serverTimestamp(),
          korisnikEmail: userEmail,
        });

        this.troskovi.push({
          id: docRef.id,
          naziv: this.noviTrosak.naziv,
          iznos: parseFloat(this.noviTrosak.iznos),
          datum: this.noviTrosak.datum,
        });

        this.noviTrosak = { naziv: "", iznos: "", datum: "" };
      } catch (error) {
        console.error("Greška prilikom dodavanja troška:", error);
      }
    },
    async dohvatiTroskove() {
      try {
        const querySnapshot = await getDocs(collection(db, "troskovi"));
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          alert("Morate biti prijavljeni kako biste vidjeli troškove.");
          return;
        }

        const userEmail = user.email;

        this.troskovi = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

          .filter((trosak) => trosak.korisnikEmail === userEmail);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja troškova:", error);
      }
    },
    prikaziUrediTrosak(trosak) {
      this.urediTrosakModal = true;
      this.urediTrosakPodaci = { ...trosak };
    },

    async spremiIzmjeneTroska() {
      try {
        // Validacija podataka
        if (
          !this.urediTrosakPodaci.naziv ||
          isNaN(parseFloat(this.urediTrosakPodaci.iznos)) ||
          !this.urediTrosakPodaci.datum
        ) {
          throw new Error("Molimo popunite sva polja ispravno!");
        }

        // Priprema ažuriranja
        const docRef = doc(db, "troskovi", this.urediTrosakPodaci.id);
        if (!docRef) {
          throw new Error("Nije moguće pronaći dokument s navedenim ID-om.");
        }

        // Ažuriranje u bazi
        await updateDoc(docRef, {
          naziv: this.urediTrosakPodaci.naziv,
          iznos: parseFloat(this.urediTrosakPodaci.iznos),
          datum: this.urediTrosakPodaci.datum,
        });

        // Ažuriranje u lokalnom nizu
        const index = this.troskovi.findIndex(
          (trosak) => trosak.id === this.urediTrosakPodaci.id
        );
        if (index !== -1) {
          this.troskovi.splice(index, 1, { ...this.urediTrosakPodaci });
        }

        // Resetiranje podataka i zatvaranje modala
        this.urediTrosakModal = false;
        this.urediTrosakPodaci = { id: null, naziv: "", iznos: "", datum: "" };
      } catch (error) {
        console.error("Greška prilikom spremanja izmjena:", error);
      }
    },

    async ukloniTrosak(id) {
      try {
        const trošakZaBrisanje = this.troskovi.find(
          (trosak) => trosak.id === id
        );

        if (!trošakZaBrisanje) {
          console.log("Odabrani trošak nije pronađen.");
          return;
        }
        await deleteDoc(doc(db, "troskovi", id));
        this.troskovi = this.troskovi.filter((trosak) => trosak.id !== id);
        console.log("Trošak izbrisan", trošakZaBrisanje);
      } catch (error) {
        console.error("Greška prilikom brisanja troška:", error);
      }
    },

    zatvoriModal() {
      this.urediTrosakModal = false;
      this.urediTrosakPodaci = { id: null, naziv: "", iznos: "", datum: "" };
    },

    zatvoriModal() {
      this.modalMjesečni = false;
      this.modalGodišnji = false;
    },
    otvoriModal(tip) {
      if (tip === "mjesečni") {
        this.modalMjesečni = true;
      } else {
        this.modalGodišnji = true;
      }
    },
  },
  mounted() {
    this.dohvatiTroskove();
  },
};
</script>

<style scoped>
.modal {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}
</style>
