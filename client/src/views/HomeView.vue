<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <Diagram></Diagram>
      <!-- <div class="card mb-0">
        
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import Diagram from "../components/Diagram.vue"

export default {
    components: {
        Diagram
    }
}

</script>