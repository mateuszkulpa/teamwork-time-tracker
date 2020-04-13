<template>
  <section class="section has-background-white">
    <b-field label="Teamwork domain">
      <b-input v-model="teamworkDomain"></b-input>
    </b-field>
    <b-field label="Api key">
      <b-input v-model="apiKey"></b-input>
    </b-field>
    <div class="field">
      <b-checkbox v-model="includeArchiveProjects">
        Search - Include archived projects
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="includeCompletedItems">
        Search - Include completed Items
      </b-checkbox>
    </div>
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
    },
    includeCompletedItems: {
      get() {
        return this.$store.state.options.includeCompletedItems;
      },
      set(value) {
        this.$store.commit("UPDATE_INCLUDE_COMPLETED_ITEMS", value);
      }
    },
    includeArchiveProjects: {
      get() {
        return this.$store.state.options.includeArchiveProjects;
      },
      set(value) {
        this.$store.commit("UPDATE_INCLUDE_ARCHIVE_PROJECTS", value);
      }
    }
  }
};
</script>
