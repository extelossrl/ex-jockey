<template>
  <div class="page">
    <h1 class="title">{{ database }}</h1>
    <div class="columns">
      <div class="column">
        <SquaredButton
          :label="$t('Importa eventi')"
          icon="cloud-upload"
          @click="importEvents()"
        />
      </div>
      <div class="column">
        <SquaredButton
          :label="$t('Esporta eventi')"
          icon="cloud-download"
          @click="exportEvents()"
        />
      </div>
      <div class="column">
        <SquaredButton
          :label="$t('Importa dati')"
          icon="database-import"
          @click="importData()"
        />
      </div>
      <div class="column">
        <SquaredButton
          :label="$t('Esporta dati')"
          icon="database-export"
          @click="exportData()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SquaredButton from "@/components/SquaredButton"

export default {
  layout: "dashboard",
  components: {
    SquaredButton
  },
  data() {
    return {
      database: this.$route.params.database
    }
  },
  methods: {
    modal(props) {
      this.$modal.open({
        parent: this,
        component: require("@/components/ModalImportExport").default,
        hasModalCard: true,
        canCancel: false,
        props
      })
    },
    importEvents() {
      this.modal({ database: this.database, action: "IMPORT_EVENTS" })
    },
    exportEvents() {
      this.$store.dispatch("exportEvents", {
        database: this.database
      })
    },
    importData() {
      this.modal({ database: this.database, action: "IMPORT_DATA" })
    },
    exportData() {
      this.modal({ database: this.database, action: "EXPORT_DATA" })
    }
  }
}
</script>

<style lang="scss" scoped></style>
