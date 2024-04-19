<template>
  <canvas ref="canvasEl" width="400" height="225" style="border: 1px solid red;"></canvas>
</template>

<script lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Diagram } from '@/lib/diagram/diagram'; 
import { Node } from '@/lib/diagram/node';

export default {
  setup() {
    let diagram
    const canvasEl = ref<HTMLCanvasElement>()

    onMounted(() => {
      if (!canvasEl.value) return
      diagram = new Diagram(canvasEl.value)

      diagram.nodes.add(new Node())
      // window.addEventListener('click', closeMenu);
    });

    onBeforeUnmount(() => {
      // window.removeEventListener('click', closeMenu);
    });

    return {
      canvasEl,
      diagram
    }
  }
}
</script>