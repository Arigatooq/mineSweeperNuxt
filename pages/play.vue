<script setup lang="ts">
import { COMPLEXITY_DATA } from '~/components/complexity.data';

  
</script>



<template>
  <div >
      <NuxtLink
      v-for="item in COMPLEXITY_DATA"
      :key="item.mode"
      :to="item.url"
      class="flex justify-center items-center mt-10">
        <UiButton  class="btn">{{ item.mode }}</UiButton>
      </NuxtLink>
  </div>
</template>

<style scoped>
  .btn{
    width: 325px;
  }
</style>