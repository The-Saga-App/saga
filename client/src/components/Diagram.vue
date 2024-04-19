<template>
  <canvas ref="canvasEl" width="800" height="450" style="border: 1px solid gray;"></canvas>
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

      diagram.nodes.add(new Node(2, 2))
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