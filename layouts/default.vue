<script setup lang="ts">
import { NAVBAR_DATA } from '~/components/layout/navbar.data';

</script>


<template>
    <div class="flex items-center justify-center " >
        <NuxtLink v-for="item in NAVBAR_DATA" :key="item.name" :to="item.url">
        <UiButton class="m-5">   
                {{ item.name }}
            <slot/>
        </UiButton>
        </NuxtLink>
    </div>
</template>