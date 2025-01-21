<script setup>
import { ref,reactive,onMounted } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps(['id','size'])
const state = reactive({ dialog: null })

onMounted(() => {
	state.dialog = new Modal('#'+props.id, {})
})

function show() {
  state.dialog.show()
}

function hide() {
  state.dialog.hide()
}

defineExpose({ show, hide })

</script>

<template>
  <!-- /* example trigger
  <a href="#" data-bs-toggle="modal" data-bs-target="#subscribeModal" class="nav-link">
    <i class="fa fa-envelope"></i> Subscribe
  </a> 
   */-->
    <div :class="`modal modal-${props.size||'md'} fade z-4`" :id="props.id" data-bs-backdrop="true" data-bs-keyboard="true" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body d-flex flex-column">
            <slot name="body">
                <div class="text-center">
                    Hello, this is a Modal
                </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
</template>
