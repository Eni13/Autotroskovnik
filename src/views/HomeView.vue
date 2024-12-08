<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-7">
        <Recepti />
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Recepti from "@/components/Recepti.vue";

export default {
  name: "HomeView",
  components: {
    Recepti,
  },
};
</script>
