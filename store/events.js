import Vue from "vue"

export const state = () => ({})

export const mutations = {
  INIT(state, { databases }) {
    for (const database of databases) {
      Vue.set(state, database, {
        search: "",
        data: [],
        total: 0,
        loading: false,
        sortField: "timestamp",
        sortOrder: "desc",
        page: 0,
        perPage: 30
      })
    }
  },
  SET_SEARCH(state, { database, search }) {
    state[database].search = search
  },
  SET_DATA(state, { database, data }) {
    state[database].data = data
  },
  SET_TOTAL(state, { database, total }) {
    state[database].total = total
  },
  SET_LOADING(state, { database, loading }) {
    state[database].loading = loading
  },
  SET_SORT_FIELD(state, { database, sortField }) {
    state[database].sortField = sortField
  },
  SET_SORT_ORDER(state, { database, sortOrder }) {
    state[database].sortOrder = sortOrder
  },
  SET_PAGE(state, { database, page }) {
    state[database].page = page
  },
  SET_PER_PAGE(state, { database, perPage }) {
    state[database].perPage = perPage
  }
}

export const actions = {
  async loadData({ commit, state }, { database }) {
    commit("SET_LOADING", { database, loading: true })

    const { search, sortField, sortOrder, page, perPage } = state[database]
    const response = await this.$axios.get(`${database}/events`, {
      params: {
        search,
        sortField,
        sortOrder,
        page,
        perPage
      }
    })

    commit("SET_LOADING", { database, loading: false })
    commit("SET_DATA", { database, data: response.data.data })
    commit("SET_TOTAL", { database, total: response.data.total })
  },

  async create({ commit, dispatch }, { database, event }) {
    commit("SET_LOADING", { database, loading: true })

    await this.$axios.post(`${database}/events`, event)
    await dispatch("loadData", { database })

    commit("SET_LOADING", { database, loading: false })
  },

  async update({ commit, dispatch }, { database, id, event }) {
    commit("SET_LOADING", { database, loading: true })

    await this.$axios.post(`${database}/events/${id}`, event)
    await dispatch("loadData", { database })

    commit("SET_LOADING", { database, loading: false })
  },

  async remove({ commit, dispatch }, { database, id }) {
    commit("SET_LOADING", { database, loading: true })

    await this.$axios.delete(`${database}/events/${id}`)
    await dispatch("loadData", { database })

    commit("SET_LOADING", { database, loading: false })
  }
}
