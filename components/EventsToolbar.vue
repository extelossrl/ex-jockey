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
        <button class="button is-success" @click="create()">
          <BIcon icon="plus" />
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash"

export default {
  name: "EventsToolbar",
  props: {
    database: { type: String, default: "", required: true }
  },
  computed: {
    search: {
      get() {
        return this.$store.state.events[this.database].search
      },
      set(value) {
        this.$store.commit("events/SET_SEARCH", {
          database: this.database,
          search: value
        })
      }
    }
  },
  methods: {
    refresh() {
      this.$store.dispatch("events/loadData", { database: this.database })
    },
    doSearch: debounce(function() {
      this.refresh()
    }, 500),
    create() {
      this.$modal.open({
        parent: this,
        component: require("@/components/ModalUpsertEvent").default,
        hasModalCard: true,
        canCancel: false,
        props: {
          database: this.database
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
