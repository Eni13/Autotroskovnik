<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div
          class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-80"
        >
          <a
            href="/"
            class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span class="fs-5 d-none d-sm-inline">Troškovnik</span>
          </a>
          <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li class="nav-item">
              <a href="#" class="nav-link align-middle px-0">
                <i class="fs-4 bi-house"></i>
                <span class="ms-1 d-none d-sm-inline">Dodaj</span>
              </a>
            </li>
            <li>
              <a
                href="#submenu1"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle"
              >
                <i class="fs-4 bi-speedometer2"></i>
                <span class="ms-1 d-none d-sm-inline">Uredi</span>
              </a>
              <ul
                class="collapse show nav flex-column ms-1"
                id="submenu1"
                data-bs-parent="#menu"
              ></ul>
            </li>

            <li>
              <a
                href="#submenu2"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle"
              >
                <i class="fs-4 bi-grid"></i>
                <span class="ms-1 d-none d-sm-inline">Briši</span>
              </a>
              <ul
                class="collapse nav flex-column ms-1"
                id="submenu2"
                data-bs-parent="#menu"
              ></ul>
            </li>
          </ul>

          <li>
            <a class="dropdown-item" href="#" @click.prevent="logout"
              >Odjavi se</a
            >
          </li>
        </div>
      </div>
      <div class="col py-3">Content area...</div>
    </div>
  </div>
</template>
<script>
import { auth } from "@/firebase"; // Importajte auth instancu iz vaše inicijalizacijske datoteke
import { signOut } from "firebase/auth";

export default {
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
