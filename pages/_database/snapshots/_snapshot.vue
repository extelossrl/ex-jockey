<template>
  <div class="page">
    <SnapshotToolbar :database="database" :snapshot="snapshot" />
    <SnapshotTable :database="database" :snapshot="snapshot" />
  </div>
</template>

<script>
import SnapshotToolbar from "@/components/SnapshotToolbar"
import SnapshotTable from "@/components/SnapshotTable"

export default {
  layout: "dashboard",
  components: {
    SnapshotToolbar,
    SnapshotTable
  },
  computed: {
    data() {
      return this.$store.state.snapshots[this.database][this.snapshot].data
    },
    isLoading() {
      return this.$store.state.snapshots[this.database][this.snapshot].loading
    }
  },
  async asyncData({ store, route }) {
    const database = route.params.database
    const snapshot = route.params.snapshot

    await store.dispatch("snapshots/loadData", {
      database,
      snapshot
    })

    return {
      database,
      snapshot
    }
  }
}
</script>

<style lang="scss" scoped></style>
