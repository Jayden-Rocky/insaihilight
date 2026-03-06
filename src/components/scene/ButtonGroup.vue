<template>
  <div class="button-group">
    <label class="group-label" v-if="label">
      <span class="required-mark" v-if="required">*</span>
      <span class="label-text">{{ label }}</span>
    </label>
    
    <div class="button-options">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="option-btn"
        :class="{ 
          'is-active': modelValue === option.value,
          'is-icon': option.icon
        }"
        @click="$emit('update:modelValue', option.value)"
      >
        <img v-if="option.icon" :src="option.icon" class="option-icon" :alt="option.label">
        <span class="option-label">{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.button-group {
  width: 100%;
}

.group-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(250, 251, 255, 0.85);
}

.required-mark {
  color: #f43f5e;
  font-size: 14px;
}

.label-text {
  letter-spacing: 0.02em;
}

.button-options {
  display: flex;
  gap: 12px;
}

.option-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: rgba(250, 251, 255, 0.75);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.option-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
  color: rgba(250, 251, 255, 0.9);
}

.option-btn.is-active {
  background: rgba(43, 209, 215, 0.08);
  border-color: rgba(43, 209, 215, 0.4);
  color: #2bd1d7;
}

.option-btn.is-active:hover {
  background: rgba(43, 209, 215, 0.12);
}

.option-icon {
  width: 36px;
  height: 36px;
  opacity: 0.7;
}

.option-btn.is-active .option-icon {
  opacity: 1;
}

.option-label {
  letter-spacing: 0.01em;
}

.option-btn.is-icon {
  padding: 12px;
}

@media (max-width: 480px) {
  .button-options {
    flex-direction: column;
  }
}
</style>
