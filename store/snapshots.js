import Vue from "vue"

export const state = () => ({})

export const mutations = {
  INIT(state, { databases, snapshots }) {
    for (const database of databases) {
      Vue.set(state, database, {})
    }

    for (const snapshot of snapshots) {
      Vue.set(state[snapshot.database], snapshot.name, {
        search: "",
        data: [],
        total: 0,
        loading: false,
        sortField: "_id",
        sortOrder: "asc",
        page: 0,
        perPage: 30,
        snapshot
      })
    }
  },
  SET_SEARCH(state, { database, snapshot, search }) {
    state[database][snapshot].search = search
  },
  SET_DATA(state, { database, snapshot, data }) {
    state[database][snapshot].data = data
  },
  SET_TOTAL(state, { database, snapshot, total }) {
    state[database][snapshot].total = total
  },
  SET_LOADING(state, { database, snapshot, loading }) {
    state[database][snapshot].loading = loading
  },
  SET_SORT_FIELD(state, { database, snapshot, sortField }) {
    state[database][snapshot].sortField = sortField
  },
  SET_SORT_ORDER(state, { database, snapshot, sortOrder }) {
    state[database][snapshot].sortOrder = sortOrder
  },
  SET_PAGE(state, { database, snapshot, page }) {
    state[database][snapshot].page = page
  },
  SET_PER_PAGE(state, { database, snapshot, perPage }) {
    state[database][snapshot].perPage = perPage
  },
  REMOVE(state, { database, snapshot }) {
    Vue.delete(state[database], snapshot)
  }
}

export const actions = {
  async loadData({ commit, state }, { database, snapshot }) {
    commit("SET_LOADING", { database, snapshot, loading: true })

    const { search, sortField, sortOrder } = state[database][snapshot]
    const { page, perPage } = state[database][snapshot]
    const response = await this.$axios.get(
      `${database}/snapshots/${snapshot}`,
      {
        params: {
          search,
          sortField,
          sortOrder,
          page,
          perPage
        }
      }
    )

    commit("SET_LOADING", { database, snapshot, loading: false })
    commit("SET_DATA", {
      database,
      snapshot,
      data: response.data.data
    })
    commit("SET_TOTAL", {
      database,
      snapshot,
      total: response.data.total
    })
  },
  async remove({ commit }, { database, snapshot }) {
    await this.$axios.delete(`${database}/snapshots/${snapshot}`)
    commit("REMOVE", { database, snapshot })
  }
}
