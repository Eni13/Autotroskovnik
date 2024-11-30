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
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <br />
            <button type="submit" class="btn btn-primary">Potvrdi</button>
          </form>
        </div>
        <div class="col-sm"></div>
        <!-- ovo je klasa od bootstrap-a -->
      </div>
    </div>
  </div>
</template>
