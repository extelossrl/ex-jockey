<template>
  <div class="page">
    <EventsToolbar :database="database" />
    <EventsTable :database="database" />
  </div>
</template>

<script>
import EventsToolbar from "@/components/EventsToolbar"
import EventsTable from "@/components/EventsTable"

export default {
  layout: "dashboard",
  components: {
    EventsToolbar,
    EventsTable
  },
  async asyncData({ store, route }) {
    const database = route.params.database
    await store.dispatch("events/loadData", { database })

    return {
      database
    }
  }
}
</script>

<style lang="scss" scoped></style>
