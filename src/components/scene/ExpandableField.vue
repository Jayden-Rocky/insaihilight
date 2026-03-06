<template>
  <div class="expandable-field" v-if="visible">
    <div class="field-header">
      <div class="field-title">
        <span class="label">{{ title }}</span>
        <span class="optional">(选填)</span>
      </div>
      <button type="button" class="remove-btn" @click="$emit('remove')">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
        <span>移除</span>
      </button>
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
    required: true
  },
  visible: {
    type: Boolean,
    default: true
  }
})

defineEmits(['remove'])
</script>

<style scoped>
.expandable-field {
  margin-bottom: 32px;
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.field-title {
  display: flex;
  align-items: center;
  gap: 8px;
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

.remove-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: transparent;
  border: none;
  color: rgba(250, 251, 255, 0.6);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.remove-btn:hover {
  color: #ef4444;
}

.field-content {
  width: 100%;
}
</style>
