export default ({ $axios }) => {
  $axios.onRequest((config) => {
    config.headers.mongodb = localStorage.getItem("mongodb")
  })
}
