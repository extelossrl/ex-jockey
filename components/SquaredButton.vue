<template>
  <div class="image is-square" @click="$emit('click')">
    <button class="button is-primary is-large">
      <BIcon :icon="icon" size="is-large" />
      <span>{{ label }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "SquaredButton",
  props: {
    label: { type: String, default: "" },
    icon: { type: String, default: "" }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: block;
  margin: auto !important;
  width: auto !important;
  height: auto !important;
}

.button {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}
</style>
