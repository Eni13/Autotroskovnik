<template>
  <div>
    <h1>Registriraj se</h1>
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="emailField">Unesi e-mail</label>
              <input
                type="email"
                class="form-control"
                id="emailField"
                aria-describedby="emailHelp"
                placeholder="Unesi e-mail"
              />
              <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <label for="passwordField">Password</label>
              <input
                type="password"
                class="form-control"
                id="passwordField"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <label for="confirmPasswordField">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirmPasswordField"
                placeholder="Confirm password"
              />
            </div>
            <button type="submit" class="btn btn-primary mt-5">Submit</button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>
