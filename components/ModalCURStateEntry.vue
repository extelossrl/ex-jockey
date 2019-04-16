<template>
  <form @submit.prevent="submit()">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" @click.prevent="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <BField v-if="action !== 'CREATE'" :label="$t('ID elemento')">
          <BInput
            v-model="form.aggregateId"
            :placeholder="$t('Inserisci l\'ID')"
            required
          />
        </BField>
        <BField :label="$t('Input')">
          <JsonEditor
            v-model="form.payload"
            :is-editable="action !== 'REMOVE'"
          />
        </BField>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" type="submit">{{ button }}</button>
      </footer>
    </div>
  </form>
</template>

<script>
import JsonEditor from "@/components/JsonEditor"

export default {
  name: "ModalCURStateEntry",
  components: {
    JsonEditor
  },
  props: {
    database: { type: String, default: "", required: true },
    aggregateName: { type: String, default: "", required: true },
    action: {
      type: String,
      default: "CREATE",
      validator: (value) => ["CREATE", "UPDATE", "REMOVE"].includes(value)
    }
  },
  data() {
    return {
      form: {
        aggregateId: "",
        payload: {}
      }
    }
  },
  computed: {
    title() {
      const title = {
        CREATE: this.$t("Nuovo elemento"),
        UPDATE: this.$t("Modifica elemento"),
        REMOVE: this.$t("Rimuovi elemento")
      }

      return title[this.action]
    },
    button() {
      const button = {
        CREATE: this.$t("Crea"),
        UPDATE: this.$t("Salva"),
        REMOVE: this.$t("Elimina")
      }

      return button[this.action]
    }
  },
  watch: {
    "form.aggregateId": function(newValue, oldValue) {
      const aggregateNames = this.$store.state.snapshots[this.database]
      const selected = aggregateNames[this.aggregateName].selected
      const data = aggregateNames[this.aggregateName].snapshots[selected].data
      const entry = data.find((entry) => entry._id === newValue)

      this.form.payload = entry ? JSON.parse(JSON.stringify(entry)) : {}
    }
  },
  methods: {
    submit() {
      const type = {
        CREATE: "CREATE",
        UPDATE: "UPDATE",
        REMOVE: "DELETE"
      }

      this.$store.dispatch("snapshots/createEvent", {
        database: this.database,
        event: {
          type: type[this.action],
          aggregateName: this.aggregateName,
          aggregateId: this.form.aggregateId,
          timestamp: new Date(),
          payload: this.form.payload,
          user: {
            username: "exjockey",
            role: "ADMIN"
          }
        }
      })

      this.$emit("close")
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-card-foot {
  justify-content: flex-end;
}

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
