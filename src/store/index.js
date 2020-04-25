import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { allRunningTimers, create } from "@/services/timeTracking";

Vue.use(Vuex);

const SET_TIMERS = "SET_TIMERS";
const SET_INCLUDED = "SET_INCLUDED";
const SET_OPTIONS = "SET_OPTIONS";
const state = {
  options: {
    corsProxy: "",
    teamworkDomain: "",
    apiKey: "",
    includeCompletedItems: true,
    includeArchiveProjects: false
  },
  timers: [],
  included: null
};

const mutations = {
  [SET_OPTIONS](state, options) {
    state.options = options;
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
  },
  async createEntry({ dispatch }, { id, projectId }) {
    const payload = {
      timer: {
        taskId: id,
        projectId,
        isBillable: true
      }
    };
    await create(payload);
    dispatch("fetchTimers");
  },
  setOptions({ commit }, options) {
    commit(SET_OPTIONS, options);
  }
};

const getters = {
  parsedTimers(state) {
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
  },
  isRequiredOptionsProvided(state) {
    return state.options.teamworkDomain && state.options.apiKey;
  },
  options(state) {
    return state.options;
  }
};

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["options"]
    })
  ],
  state,
  mutations,
  actions,
  getters
});
