<template>
  <div class="page">
    <form class="card" @submit.prevent="submit()">
      <div class="card-content">
        <p class="title">{{ $t("Benvenuto in Ex-Jockey") }}</p>
        <p class="subtitle">{{ $t("Un gestionale equino al 100%") }}</p>
        <BField :label="$t('Stringa di connessione')">
          <BInput
            v-model="connection"
            :placeholder="$t('Inserisci la stringa di connessione')"
            required
          />
        </BField>
        <button class="button is-primary is-fullwidth" type="submit">
          {{ $t("Connettiti") }}
        </button>
      </div>
    </form>

    <BLoading :is-full-page="true" :active="loading" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      connection: process.client ? localStorage.getItem("mongodb") || "" : "",
      loading: false
    }
  },
  methods: {
    async submit() {
      this.loading = true

      localStorage.setItem("mongodb", this.connection)

      const { data } = await this.$axios.get("bootstrap")

      this.$store.commit("events/INIT", { databases: data.databases })
      this.$store.commit("snapshots/INIT", {
        databases: data.databases,
        snapshots: data.snapshots
      })
      this.$store.commit("INIT")

      this.loading = false

      this.$router.replace(`/${data.databases[0]}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  max-width: 500px;
}
</style>
