<template>
  <button @click="onClick" :class="disabled ? 'disabled' : ''" class="button">
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
    disabled: {
      type: Boolean,
      required: false,
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

.button:not(.disabled):hover {
  background-color: #45a049;
}

.disabled {
  background-color: #ff6347;
  pointer-events: none;
}
</style>
