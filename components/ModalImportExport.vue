<template>
  <form @submit.prevent="submit()">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" @click.prevent="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <BField v-if="action.includes('DATA')" :label="$t('Gruppo')">
          <BInput
            v-model="form.aggregateName"
            :placeholder="$t('Inserisci il gruppo')"
            required
          />
        </BField>
        <BField v-if="action.includes('IMPORT')">
          <BUpload v-model="form.file">
            <a class="button is-primary">
              <BIcon icon="upload"></BIcon>
              <span>{{ $t("Carica file") }}</span>
            </a>
          </BUpload>
          <span v-if="form.file" class="file-name">
            {{ form.file.name }}
          </span>
        </BField>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" type="submit">{{ button }}</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: "ModalImportExport",
  props: {
    database: { type: String, default: "", required: true },
    action: {
      type: String,
      default: "IMPORT_EVENTS",
      validator: (value) =>
        ["IMPORT_EVENTS", "IMPORT_DATA", "EXPORT_DATA"].includes(value)
    }
  },
  data() {
    return {
      form: {
        aggregateName: null,
        file: null
      }
    }
  },
  computed: {
    title() {
      const titles = {
        IMPORT_EVENTS: this.$t("Importazione eventi"),
        IMPORT_DATA: this.$t("Importazione dati"),
        EXPORT_DATA: this.$t("Esportazione dati")
      }

      return titles[this.action]
    },
    button() {
      const buttons = {
        IMPORT_EVENTS: this.$t("Importa"),
        IMPORT_DATA: this.$t("Importa"),
        EXPORT_DATA: this.$t("Esporta")
      }

      return buttons[this.action]
    }
  },
  methods: {
    submit() {
      switch (this.action) {
        case "IMPORT_EVENTS":
          this.$store.dispatch("importEvents", {
            database: this.database,
            file: this.form.file
          })
          break
        case "IMPORT_DATA":
          this.$store.dispatch("importData", {
            database: this.database,
            aggregateName: this.form.aggregateName,
            file: this.form.file
          })
          break

        case "EXPORT_DATA":
          this.$store.dispatch("exportData", {
            database: this.database,
            aggregateName: this.form.aggregateName
          })
          break
      }

      this.$emit("close")
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-card-foot {
  justify-content: flex-end;
}
</style>
