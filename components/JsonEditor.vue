<template>
  <div class="component">
    <NoSsr>
      <VueJsonEditor
        :value="value"
        :show-btns="false"
        :mode="mode"
        @input="$emit('input', $event)"
      />
    </NoSsr>
    <BLoading :is-full-page="false" :active="loading" />
  </div>
</template>

<script>
export default {
  name: "JsonEditor",
  props: {
    value: { type: null, default: () => ({}) },
    isEditable: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },
  computed: {
    mode() {
      return this.isEditable ? "tree" : "view"
    }
  }
}
</script>

<style lang="scss" scoped>
.component {
  position: relative;
}
</style>
