<template>
  <div class="columns">
    <div class="column">
      <BField>
        <BInput
          v-model="search"
          :placeholder="$t('Cerca (MongoDB Query)...')"
          type="search"
          icon="magnify"
          @input="doSearch()"
        />
      </BField>
    </div>
    <div class="column is-narrow">
      <p class="buttons">
        <button class="button is-info" @click="refresh()">
          <BIcon icon="refresh" />
        </button>
        <button class="button is-danger" @click="remove()">
          <BIcon icon="delete" />
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash"

export default {
  name: "SnapshotToolbar",
  props: {
    database: { type: String, default: "", required: true },
    snapshot: { type: String, default: "", required: true }
  },
  computed: {
    search: {
      get() {
        return this.$store.state.snapshots[this.database][this.snapshot].search
      },
      set(value) {
        this.$store.commit("snapshots/SET_SEARCH", {
          database: this.database,
          snapshot: this.snapshot,
          search: value
        })
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
    doSearch: debounce(function() {
      this.refresh()
    }, 500),
    remove() {
      this.$dialog.confirm({
        message: this.$t("Sei sicuro di voler rimuovere questo snapshot?"),
        cancelText: this.$t("No"),
        confirmText: this.$t("Si"),
        onConfirm: () => {
          this.$store.dispatch("snapshots/remove", {
            database: this.database,
            snapshot: this.snapshot
          })
          this.$router.replace(`/${this.database}`)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
