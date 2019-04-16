<template>
  <div class="layout">
    <header class="navbar">
      <Navbar />
    </header>
    <aside class="sidebar">
      <Sidebar />
    </aside>
    <main class="main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

export default {
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 52px 1fr;
  grid-template-areas: "navbar navbar" "sidebar main";
  min-height: 100vh;

  > .navbar {
    grid-area: navbar;
    display: block;
  }

  > .sidebar {
    grid-area: sidebar;
    padding: 1rem;
    width: 300px;
    overflow: auto;
    position: fixed;
    top: 52px;
    bottom: 0;
    left: 0;
  }

  > .main {
    grid-area: main;
    padding: 1rem;
  }
}
</style>
