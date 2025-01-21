<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'

const site = inject('site')
</script>

<template>
	<footer class="py-4 mt-4 px-3 m-0  d-flex flex-column  border-top border-uibg">
		
		<!--  <nav class="nav text-muted col-12 col-md-auto mx-auto p-0 d-flex mb-1">
			<div class="nav-item">
				<RouterLink to="/unsubscribe" class="nav-link text-muted ps-0 py-0">Unsubscribe</RouterLink>
			</div>
			<div class="nav-item">
				<RouterLink to="/contact" class="nav-link text-muted py-0">Contact us</RouterLink>
			</div>
			<div class="nav-item">
				<RouterLink to="/terms" class="nav-link text-muted py-0">Terms</RouterLink>
			</div>
			<div class="nav-item">
				<RouterLink to="/privacy" class="nav-link text-muted py-0">Privacy</RouterLink>
			</div>
			<div class="nav-item">
				<RouterLink to="/ccpa" class="nav-link text-muted py-0">Do Not Sell My Info</RouterLink>
			</div>
		</nav>
		  -->
		<div class="col-12 col-md-auto flex-grow-1 align-self-center  mt-2 text-muted">
			<span class="logo text-uppercase text-dark me-1">
        <!-- <img src="/logo-icon-dark.png" class="img-fluid" style="max-width:32px" alt="" /> -->
				<span>{{site.first_name}}</span>
				<span class="accent">{{site.last_name}}</span>
			</span> 
			&copy;{{ new Date().getFullYear() }} All rights reserved
		</div>
		
	</footer>
</template>
