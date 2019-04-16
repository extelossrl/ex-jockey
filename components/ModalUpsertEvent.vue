<template>
  <form @submit.prevent="submit()">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" @click.prevent="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <BField :label="$t('Tipo')">
          <BSelect
            v-model="form.type"
            :placeholder="$t('Seleziona il tipo')"
            expanded
            required
          >
            <option value="CREATE">{{ $t("CREATE") }}</option>
            <option value="UPDATE">{{ $t("UPDATE") }}</option>
            <option value="PATCH">{{ $t("PATCH") }}</option>
            <option value="REMOVE">{{ $t("REMOVE") }}</option>
          </BSelect>
        </BField>
        <BField :label="$t('Gruppo')">
          <BInput
            v-model="form.aggregateName"
            :placeholder="$t('Inserisci il gruppo')"
            required
          />
        </BField>
        <BField :label="$t('ID di aggregazione')">
          <BInput
            v-model="form.aggregateId"
            :placeholder="$t('Inserisci l\'ID di aggregazione')"
            :disabled="!!id"
            required
          />
        </BField>
        <BField :label="$t('Data')">
          <BDatepicker
            v-model="form.timestamp"
            :placeholder="$t('Seleziona la data')"
            required
          />
        </BField>
        <BField :label="$t('Input')">
          <JsonEditor v-model="form.payload" is-editable />
        </BField>
        <BField :label="$t('Autore')">
          <JsonEditor v-model="form.user" is-editable />
        </BField>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" type="submit">{{ button }}</button>
      </footer>
    </div>
  </form>
</template>

<script>
import ObjectID from "bson-objectid"
import JsonEditor from "@/components/JsonEditor"

export default {
  name: "ModalUpsertEvent",
  components: {
    JsonEditor
  },
  props: {
    database: { type: String, default: "", required: true },
    id: { type: String, default: "" },
    type: { type: String, default: null },
    aggregateName: { type: String, default: "" },
    aggregateId: { type: String, default: new ObjectID().toString() },
    timestamp: { type: Date, default: () => new Date() },
    payload: { type: Object, default: () => ({}) },
    user: {
      type: Object,
      default: () => ({
        username: "carmhack",
        role: "AGENT"
      })
    }
  },
  data() {
    return {
      form: {
        type: this.type,
        aggregateName: this.aggregateName,
        aggregateId: this.aggregateId,
        timestamp: new Date(this.timestamp),
        payload: JSON.parse(JSON.stringify(this.payload)),
        user: JSON.parse(JSON.stringify(this.user))
      }
    }
  },
  computed: {
    title() {
      return this.id ? this.$t("Modifica evento") : this.$t("Nuovo evento")
    },
    button() {
      return this.id ? this.$t("Salva") : this.$t("Crea")
    }
  },
  methods: {
    submit() {
      this.$store.dispatch(`events/${this.id ? "update" : "create"}`, {
        database: this.database,
        id: this.id,
        event: this.form
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
  }
}
</style>
