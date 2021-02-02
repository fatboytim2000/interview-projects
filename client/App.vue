<template>
  <div class="App">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="/">Amazone</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/basket" class="nav-link">My Basket ({{ basketItemCount }})</router-link>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
     <b-alert v-if="error" show variant="danger">{{ error }}</b-alert>

    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['basketItemCount', 'error']),
  }
}
</script>