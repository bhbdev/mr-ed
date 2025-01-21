<script setup>
//import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import Header from '@/components/base/Header.vue'
import Footer from '@/components/base/Footer.vue'

</script>

<template>
	<div class="app-wrapper">
	  <Header />

		<RouterView v-slot="{ Component,route }" class="xcontainer-max">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
		</RouterView>
	
	  <Footer />
	</div>
</template>
