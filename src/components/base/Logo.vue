<script setup>

import { ref,inject,computed } from 'vue'
import { RouterLink } from 'vue-router'

const site = inject('site')

defineProps(['site','icon'])

const hover = ref(false)
const logoIcon = computed(()=>{
	return hover.value? 'fa-horse text-accent' : 'fa-horse'
	//return hover.value? 'fa-question' : 'fa-question'
})

</script>

<template>
	<RouterLink to="/" class="logo m-0 p-0" @mouseover="hover=true" @mouseout="hover=false">
		
    <i :class="`fa ${logoIcon} pe-2`" :title="site.site_name + ' - ' + site.site_tagline"></i>
    <!-- <span>{{ site }}</span> -->
    <!-- <img src="/logo-icon-light.png" class="img-responsive" alt="" />
		<span>{{site.site_first_name}}</span>
		<span class="accent">{{site.site_last_name}}</span> -->
		
  </RouterLink>
</template>
