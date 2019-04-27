<template>
    <div class="movie-items">
	<div class="container">
		<div class="row ipad-width">
			<div class="col-md-8">
                <appTheater />
			</div>
			<div class="col-md-4">
				<div class="sidebar">
					<appCelebrities />
				</div>
			</div>
		</div>
	</div>
</div>    
</template>

<script>
    
    import InTheater from '@/components/layout/HomePage/InTheater.vue'
    import Celebrities from '@/components/layout/HomePage/Celebrities.vue'
    
    export default {
        components: {
            appTheater : InTheater,
            appCelebrities : Celebrities
        }
    }
</script>

<style>

</style>
