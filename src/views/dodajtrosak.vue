<template>
  <div class="container">
    <!-- Dodavanje troška -->
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

    <!-- Popis svih troškova -->
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
            class="btn btn-warning btn-sm me-2"
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

    <!-- Modal za uređivanje troška -->
    <div v-if="urediTrosakModal" class="modal">
      <div class="modal-content">
        <h4>Uredi Trošak</h4>
        <div class="mb-3">
          <label for="editNaziv" class="form-label">Naziv troška</label>
          <input
            type="text"
            id="editNaziv"
            v-model="urediTrosakPodaci.naziv"
            class="form-control"
            required
          />
        </div>

        <div class="mb-3">
          <label for="editIznos" class="form-label">Iznos</label>
          <input
            type="number"
            id="editIznos"
            v-model="urediTrosakPodaci.iznos"
            class="form-control"
            step="0.01"
            required
          />
        </div>

        <div class="mb-3">
          <label for="editDatum" class="form-label">Datum</label>
          <input
            type="date"
            id="editDatum"
            v-model="urediTrosakPodaci.datum"
            class="form-control"
            required
          />
        </div>

        <button class="btn btn-primary" @click="spremiPromjene">Spremi</button>
        <button class="btn btn-secondary" @click="zatvoriUrediModal">
          Zatvori
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    async dodajTrosak() {
      try {
        if (
          !this.noviTrosak.naziv ||
          !this.noviTrosak.iznos ||
          !this.noviTrosak.datum
        ) {
          alert("Molimo ispunite sve podatke!");
          return;
        }

        const docRef = await addDoc(collection(db, "troskovi"), {
          naziv: this.noviTrosak.naziv,
          iznos: parseFloat(this.noviTrosak.iznos),
          datum: this.noviTrosak.datum,
          createdAt: serverTimestamp(),
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
        this.troskovi = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Greška prilikom dohvaćanja troškova:", error);
      }
    },
    async ukloniTrosak(id) {
      try {
        await deleteDoc(doc(db, "troskovi", id));
        this.troskovi = this.troskovi.filter((trosak) => trosak.id !== id);
      } catch (error) {
        console.error("Greška prilikom brisanja troška:", error);
      }
    },
    prikaziUrediTrosak(trosak) {
      this.urediTrosakPodaci = { ...trosak };
      this.urediTrosakModal = true;
    },
    async spremiPromjene() {
      try {
        const trosakRef = doc(db, "troskovi", this.urediTrosakPodaci.id);
        await updateDoc(trosakRef, {
          naziv: this.urediTrosakPodaci.naziv,
          iznos: parseFloat(this.urediTrosakPodaci.iznos),
          datum: this.urediTrosakPodaci.datum,
        });

        const index = this.troskovi.findIndex(
          (trosak) => trosak.id === this.urediTrosakPodaci.id
        );
        if (index !== -1) {
          this.troskovi[index] = { ...this.urediTrosakPodaci };
        }

        this.zatvoriUrediModal();
      } catch (error) {
        console.error("Greška prilikom spremanja promjena:", error);
      }
    },
    zatvoriUrediModal() {
      this.urediTrosakPodaci = { id: null, naziv: "", iznos: "", datum: "" };
      this.urediTrosakModal = false;
    },
  },
  mounted() {
    this.dohvatiTroskove();
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
}

.form-control {
  max-width: 100%;
}
</style>
