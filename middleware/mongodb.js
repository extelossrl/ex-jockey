export default ({ store, route, redirect }) => {
  if (route.path !== "/" && !store.state.init) {
    redirect("/")
  }
}
