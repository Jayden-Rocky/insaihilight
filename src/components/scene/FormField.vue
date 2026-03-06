<template>
  <div class="form-field">
    <div class="field-title" v-if="title">
      <span class="required" v-if="required">*</span>
      <span class="label">{{ title }}</span>
      <span class="optional" v-if="!required">(选填)</span>
    </div>
    
    <div class="field-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.form-field {
  margin-bottom: 32px;
}

.field-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.required {
  color: #ef4444;
  font-size: 14px;
}

.label {
  font-size: 16px;
  font-weight: 600;
  color: rgba(250, 251, 255, 0.95);
}

.optional {
  font-size: 14px;
  color: rgba(229, 233, 250, 0.5);
}

.field-content {
  width: 100%;
}
</style>
