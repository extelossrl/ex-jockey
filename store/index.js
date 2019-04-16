function openURL(url) {
  const link = document.createElement("a")
  document.body.appendChild(link)
  link.href = url
  link.click()
}

export const state = () => ({
  init: false
})

export const mutations = {
  INIT(state) {
    state.init = true
  }
}

export const actions = {
  async importEvents(context, { database, file }) {
    const formData = new FormData()

    formData.append("file", file)

    await this.$axios.post(`${database}/imports/events`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  },
  exportEvents(context, { database }) {
    const beUrl = this.$axios.defaults.baseURL
    const mongodb = btoa(localStorage.getItem("mongodb"))
    openURL(`${beUrl}${database}/exports/events?mongodb=${mongodb}`)
  },
  async importData(context, { database, file, aggregateName }) {
    const formData = new FormData()

    formData.append("file", file)

    await this.$axios.post(
      `${database}/imports/data/${aggregateName}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
  },
  exportData(context, { database, aggregateName }) {
    const beUrl = this.$axios.defaults.baseURL
    const mongodb = btoa(localStorage.getItem("mongodb"))
    openURL(
      `${beUrl}${database}/exports/snapshot/${aggregateName}?mongodb=${mongodb}`
    )
  }
}

export const getters = {
  getDatabases: (state) => Object.keys(state.snapshots),
  getSnapshots: (state) => (database) => {
    return Object.keys(state.snapshots[database])
  }
}
