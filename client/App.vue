<template>
  <div class="App">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#">Amazone</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/basket" class="nav-link">My Basket</router-link>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view />
  </div>
</template>
