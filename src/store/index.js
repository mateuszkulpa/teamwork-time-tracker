import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { allRunningTimers } from "@/services/timeTracking";
const SET_TIMERS = "SET_TIMERS";
const SET_INCLUDED = "SET_INCLUDED";
const UPDATE_API_KEY = "UPDATE_API_KEY";
const UPDATE_TEAMWORK_DOMAIN = "UPDATE_TEAMWORK_DOMAIN";

Vue.use(Vuex);

const state = {
  options: {
    teamworkDomain: "",
    apiKey: ""
  },
  timers: [],
  included: null
};

const mutations = {
  [UPDATE_TEAMWORK_DOMAIN](state, value) {
    state.options.teamworkDomain = value;
  },
  [UPDATE_API_KEY](state, value) {
    state.options.apiKey = value;
  },
  [SET_TIMERS](state, timers) {
    state.timers = timers;
  },
  [SET_INCLUDED](state, included) {
    state.included = included;
  }
};

const actions = {
  async fetchTimers({ commit }) {
    const response = await allRunningTimers();
    commit(SET_TIMERS, response.timers);
    commit(SET_INCLUDED, response.included);
  }
};

const getters = {
  parsedTimers: state => {
    return state.timers.map(entry => {
      let result = Object.assign({}, entry);
      if (state.included) {
        const project = state.included.projects[entry.projectId];
        const task = state.included.tasks[entry.taskId];
        result.project = project;
        result.task = task;
      }
      return result;
    });
  }
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  mutations,
  actions,
  getters
});
