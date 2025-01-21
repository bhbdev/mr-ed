<script setup>
import { ref,watch } from 'vue'
import { RouterLink,useRoute } from 'vue-router'


const route = useRoute()
const mainnav = ref()
const navbar = ref()

watch(route, ()=>{
  if (mainnav.value.classList.contains('show'))
    navbar.value.click() // hide
})


</script>

<template>
	<nav id="mainnav" class="navbar navbar-dark navbar-expand-lg">
	  <div class="container-fluid d-flex">
			
			<div class="navbar-brand">
				<slot name="logo">
					<!--
					Logo | Site Name
					-->
				</slot>
			</div>
			
			<nav class="order-md-3 nav d-flex flex-row">
				<slot name="fixed-nav">
					<!--
						Fixed nav items
						-->
				</slot>
		        <button 
					class="navbar-toggler border-0 ms-auto" 
					type="button" 
					data-bs-toggle="collapse" 
					data-bs-target="#mainnav-nav" 
					aria-controls="mainnav-nav" 
					aria-expanded="false" 
					aria-label="Toggle navigation"
                    ref="navbar"
				 >
				    <i class="fa fa-bars"></i><!-- <span class="navbar-toggler-icon"></span> -->
		        </button>
			</nav>
	    
	        <div id="mainnav-nav" ref="mainnav" class="collapse navbar-collapse">
				<slot name="toggle-nav">
					<!--
					<ul class="navbar-nav">
						<li class="nav-item">
							<a href="/" class="nav-link">Home</a>
						</li>
					</ul>
					-->
				</slot>
			</div>
			
		</div>
	</nav>
</template>
