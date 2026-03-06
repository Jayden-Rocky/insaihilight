<template>
  <div class="switch-field">
    <!-- 标题行：标题和开关在同一行 -->
    <div class="switch-header">
      <span class="switch-title">{{ title }}</span>
      <button
        type="button"
        role="switch"
        :aria-checked="modelValue"
        class="switch-btn"
        :class="{ 'is-on': modelValue }"
        @click="$emit('update:modelValue', !modelValue)"
      >
        <span class="switch-handle"></span>
      </button>
    </div>
    <p class="switch-hint" v-if="hint">{{ hint }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.switch-field {
  width: 100%;
  margin-bottom: 32px;
}

.switch-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.switch-title {
  font-size: 20px;
  font-weight: 700;
  color: rgba(250, 251, 255, 0.95);
}

.switch-btn {
  position: relative;
  width: 44px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.switch-btn.is-on {
  background: rgba(43, 209, 215, 0.25);
  border-color: rgba(43, 209, 215, 0.5);
}

.switch-handle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background: rgba(250, 251, 255, 0.9);
  border-radius: 50%;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.switch-btn.is-on .switch-handle {
  left: 22px;
  background: #2bd1d7;
}

.switch-hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: rgba(229, 233, 250, 0.45);
  letter-spacing: 0.01em;
}
</style>
