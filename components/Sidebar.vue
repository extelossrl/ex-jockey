<template>
  <nav class="menu">
    <template v-for="(database, index) of databases">
      <p :key="'a' + index" class="menu-label">
        {{ database }}
      </p>
      <ul :key="'b' + index" class="menu-list">
        <li>
          <NuxtLink :to="`/${database}`">
            <BIcon icon="view-dashboard" size="is-small" />
            {{ $t("Riepilogo") }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/${database}/events`">
            <BIcon icon="history" size="is-small" />
            {{ $t("Registro eventi") }}
          </NuxtLink>
        </li>
        <li>
          <BCollapse :open="false">
            <template v-slot:trigger="{ open }">
              <a :href="`/${database}/snapshots`" @click.prevent="1">
                <BIcon icon="nas" size="is-small" />
                {{ $t("Istantanee") }}
                <BIcon
                  :icon="`chevron-${open ? 'up' : 'down'}`"
                  size="is-small"
                />
              </a>
            </template>
            <ul>
              <li v-for="snapshot of getSnapshots(database)" :key="snapshot">
                <NuxtLink :to="`/${database}/snapshots/${snapshot}`">
                  {{ snapshot }}
                </NuxtLink>
              </li>
            </ul>
          </BCollapse>
        </li>
      </ul>
    </template>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
  computed: {
    databases() {
      return this.$store.getters.getDatabases
    }
  },
  methods: {
    getSnapshots(database) {
      return this.$store.getters.getSnapshots(database)
    }
  }
}
</script>

<style lang="scss" scoped></style>
