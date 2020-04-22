<template>
  <section class="section has-background-white">
    <b-field label="Teamwork domain">
      <b-input v-model="form.teamworkDomain"></b-input>
    </b-field>
    <b-field label="Api key">
      <b-input v-model="form.apiKey"></b-input>
    </b-field>
    <div class="field">
      <b-checkbox v-model="form.includeArchiveProjects">
        Search - Include archived projects
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="form.includeCompletedItems">
        Search - Include completed Items
      </b-checkbox>
    </div>
    <div class="field has-text-right">
      <b-button type="is-primary" @click="saveOptions">
        Save
      </b-button>
    </div>
  </section>
</template>

<script>
import store from "@/store";
import { reactive } from "@vue/composition-api";
export default {
  setup() {
    const form = reactive({ ...store.getters.options });

    const saveOptions = () => {
      store.dispatch("setOptions", form);
      store.dispatch("fetchTimers");
    };

    return { form, saveOptions };
  }
};
</script>
