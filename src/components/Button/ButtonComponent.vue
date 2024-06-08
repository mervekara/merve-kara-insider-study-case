<template>
  <button @click="onClick" class="button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonComponent",
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
});
</script>

<style scoped>
.button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ff6347;
  color: white;
}

.button:hover {
  background-color: #45a049;
}
</style>
