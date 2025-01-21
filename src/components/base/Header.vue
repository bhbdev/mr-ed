<script setup>
import { ref,inject,computed,watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
// import { useStreak } from '@/stores'
import Logo from '@/components/base/Logo.vue'
import MainNav from '@/components/base/MainNav.vue'


</script>

<template>

<header class="bg-header xsticky-top">
	<main-nav>
		<template #logo>
			<logo />
		</template>
		
		<template #fixed-nav>
      <!-- <RouterLink to="/" class="nav-link link-light"><i class="fa fa-envelope"></i></RouterLink> -->
      <!-- <RouterLink to="/" class="nav-link link-light"><i class="fa fa-user"></i></RouterLink> -->
			<!-- <DarkModeSwitch class="nav-link link-warning" /> -->
		</template>
		
		<template #toggle-nav>
			<ul class="navbar-nav xmx-auto">
			    <li class="nav-item">
		            <RouterLink to="/" class="nav-link">
					  Home
		            </RouterLink>
				</li>
                <li class="nav-item">
                    <RouterLink to="/quizmaker" class="nav-link">
                      Quiz Maker
                    </RouterLink>
                </li>
			</ul>
		</template>
	</main-nav>
  <div class="btop"></div>
</header>
</template>
