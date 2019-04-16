<template>
  <BTable
    :data="data"
    :loading="loading"
    :total="total"
    :per-page="20"
    :default-sort="[sortField, sortOrder]"
    backend-pagination
    backend-sorting
    paginated
    striped
    @page-change="onPageChange"
    @sort="onSort"
  >
    <template v-slot="{ row }">
      <BTableColumn
        v-for="column of columns"
        :key="column"
        :label="column"
        :field="column"
        sortable
      >
        {{ row[column] }}
      </BTableColumn>
    </template>
  </BTable>
</template>

<script>
export default {
  name: "SnapshotTable",
  props: {
    database: { type: String, default: "", required: true },
    snapshot: { type: String, default: "", required: true }
  },
  computed: {
    columns() {
      return Object.keys(
        this.$store.state.snapshots[this.database][this.snapshot].data[0]
      )
    },
    data() {
      return this.$store.state.snapshots[this.database][this.snapshot].data
    },
    loading() {
      return this.$store.state.snapshots[this.database][this.snapshot].loading
    },
    total() {
      return this.$store.state.snapshots[this.database][this.snapshot].total
    },
    sortField: {
      get() {
        return this.$store.state.snapshots[this.database][this.snapshot]
          .sortField
      },
      set(value) {
        this.$store.commit("snapshots/SET_SORT_FIELD", {
          database: this.database,
          snapshot: this.snapshot,
          sortField: value
        })

        this.refresh()
      }
    },
    sortOrder: {
      get() {
        return this.$store.state.snapshots[this.database][this.snapshot]
          .sortOrder
      },
      set(value) {
        this.$store.commit("snapshots/SET_SORT_ORDER", {
          database: this.database,
          snapshot: this.snapshot,
          sortOrder: value
        })

        this.refresh()
      }
    },
    page: {
      get() {
        return this.$store.state.snapshots[this.database][this.snapshot].page
      },
      set(value) {
        this.$store.commit("snapshots/SET_PAGE", {
          database: this.database,
          snapshot: this.snapshot,
          page: value
        })

        this.refresh()
      }
    }
  },
  methods: {
    refresh() {
      this.$store.dispatch("snapshots/loadData", {
        database: this.database,
        snapshot: this.snapshot
      })
    },
    onPageChange(page) {
      this.page = page - 1
    },
    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order
    }
  }
}
</script>

<style lang="scss" scoped></style>
