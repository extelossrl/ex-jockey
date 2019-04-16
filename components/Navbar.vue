<template>
  <nav class="navbar has-shadow">
    <div class="navbar-menu">
      <div class="navbar-start">
        <span class="navbar-item">
          {{ mongodb }}
        </span>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <NuxtLink to="/" class="button is-danger" replace>
              <BIcon icon="power" />
              <span>{{ $t("Esci") }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import muri from "muri"

function mongodb() {
  try {
    const data = muri(localStorage.getItem("mongodb"))
    return `${data.auth.user}@${data.hosts[0].host}:${data.hosts[0].port}`
  } catch (error) {
    return "localhost"
  }
}

export default {
  data() {
    return {
      mongodb: process.client ? mongodb() : ""
    }
  }
}
</script>

<style lang="scss" scoped></style>
