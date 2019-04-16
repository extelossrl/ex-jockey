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
    detailed
    @page-change="onPageChange"
    @sort="onSort"
  >
    <template v-slot="{ row }">
      <BTableColumn :label="$t('Tipo')" field="type" sortable>
        {{ row.type }}
      </BTableColumn>
      <BTableColumn :label="$t('Gruppo')" field="aggregateName" sortable>
        {{ row.aggregateName }}
      </BTableColumn>
      <BTableColumn :label="$t('Data')" field="timestamp" sortable>
        {{ $d(new Date(row.timestamp), "full") }}
      </BTableColumn>
      <BTableColumn :label="$t('Utente')" field="username" sortable>
        {{ row.user.username }}
      </BTableColumn>
    </template>

    <template v-slot:detail="{ row }">
      <div class="columns">
        <div class="column is-6">
          <div class="panel">
            <p class="panel-heading">
              {{ $t("Input") }}
            </p>
            <div
              class="panel-block has-background-white is-block is-paddingless"
            >
              <JsonEditor v-model="row.payload" />
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="panel">
            <p class="panel-heading">
              {{ $t("Autore") }}
            </p>
            <div
              class="panel-block has-background-white is-block is-paddingless"
            >
              <JsonEditor v-model="row.user" />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="buttons">
            <button class="button is-warning is-fullwidth" @click="update(row)">
              <BIcon icon="pencil" size="is-small" />
              <span>{{ $t("Modifica") }}</span>
            </button>
            <button class="button is-danger is-fullwidth" @click="remove(row)">
              <BIcon icon="delete" size="is-small" />
              <span>{{ $t("Rimuovi") }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <div class="tags has-addons">
            <span class="tag is-dark">{{ $t("ID evento:") }}</span>
            <span class="tag is-info">{{ row._id }}</span>
          </div>
        </div>
        <div class="control">
          <div class="tags has-addons">
            <span class="tag is-dark">{{ $t("ID aggregazione:") }}</span>
            <span class="tag is-warning">{{ row.aggregateId }}</span>
          </div>
        </div>
      </div>
    </template>
  </BTable>
</template>

<script>
import JsonEditor from "@/components/JsonEditor"

export default {
  name: "EventsTable",
  components: {
    JsonEditor
  },
  props: {
    database: { type: String, default: "", required: true }
  },
  computed: {
    data() {
      return this.$store.state.events[this.database].data
    },
    loading() {
      return this.$store.state.events[this.database].loading
    },
    total() {
      return this.$store.state.events[this.database].total
    },
    sortField: {
      get() {
        return this.$store.state.events[this.database].sortField
      },
      set(value) {
        this.$store.commit("events/SET_SORT_FIELD", {
          database: this.database,
          sortField: value
        })

        this.refresh()
      }
    },
    sortOrder: {
      get() {
        return this.$store.state.events[this.database].sortOrder
      },
      set(value) {
        this.$store.commit("events/SET_SORT_ORDER", {
          database: this.database,
          sortOrder: value
        })

        this.refresh()
      }
    },
    page: {
      get() {
        return this.$store.state.events[this.database].page
      },
      set(value) {
        this.$store.commit("events/SET_PAGE", {
          database: this.database,
          page: value
        })

        this.refresh()
      }
    }
  },
  methods: {
    refresh() {
      this.$store.dispatch("events/loadData", { database: this.database })
    },
    update(row) {
      this.$modal.open({
        parent: this,
        component: require("@/components/ModalUpsertEvent").default,
        hasModalCard: true,
        canCancel: false,
        props: {
          database: this.database,
          id: row._id,
          type: row.type,
          aggregateName: row.aggregateName,
          aggregateId: row.aggregateId,
          timestamp: new Date(row.timestamp),
          payload: row.payload,
          user: row.user
        }
      })
    },
    remove(row) {
      this.$dialog.confirm({
        message: this.$t("Sei sicuro di voler rimuovere questo evento?"),
        cancelText: this.$t("No"),
        confirmText: this.$t("Si"),
        onConfirm: () => {
          this.$store.dispatch("events/remove", {
            database: this.database,
            _id: row._id
          })
        }
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

<style lang="scss" scoped>
/deep/ .jsoneditor-vue {
  .jsoneditor-outer {
    height: 200px;
    min-height: auto !important;
  }

  div.jsoneditor-tree {
    min-height: auto !important;
  }
}
</style>
