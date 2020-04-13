<template>
  <section class="section has-background-white">
    <b-field label="Teamwork domain">
      <b-input v-model="teamworkDomain"></b-input>
    </b-field>
    <b-field label="Api key">
      <b-input v-model="apiKey"></b-input>
    </b-field>
  </section>
</template>

<script>
export default {
  computed: {
    teamworkDomain: {
      get() {
        return this.$store.state.options.teamworkDomain;
      },
      set(value) {
        this.$store.commit("UPDATE_TEAMWORK_DOMAIN", value);
      }
    },
    apiKey: {
      get() {
        return this.$store.state.options.apiKey;
      },
      set(value) {
        this.$store.commit("UPDATE_API_KEY", value);
      }
    }
  }
};
</script>
