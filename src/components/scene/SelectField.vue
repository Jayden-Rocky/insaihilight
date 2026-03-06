<template>
  <div class="select-field">
    <label class="select-label" v-if="label">
      <span class="required-mark" v-if="required">*</span>
      <span class="label-text">{{ label }}</span>
    </label>
    
    <div class="select-wrapper" :class="{ 'is-disabled': disabled }">
      <select
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        class="select-input"
        :disabled="disabled"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      
      <svg class="select-arrow" viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M7 10l5 5 5-5z"/>
      </svg>
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
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.select-field {
  width: 100%;
}

.select-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
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

.select-wrapper {
  position: relative;
  width: 100%;
}

.select-wrapper.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.select-input {
  width: 100%;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0 40px 0 16px;
  color: rgba(250, 251, 255, 0.95);
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.select-input:focus {
  outline: none;
  border-color: rgba(43, 209, 215, 0.5);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(43, 209, 215, 0.1);
}

.select-input:disabled {
  cursor: not-allowed;
}

.select-arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(250, 251, 255, 0.5);
  pointer-events: none;
}
</style>
