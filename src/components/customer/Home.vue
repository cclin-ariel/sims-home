<template>
  <div class="w-screen flex flex-col items-center">
    <ShopNav/>
    <!-- section fo INSPIRATION DELIVERED -->
    <ShopFooter/>
  </div>
</template>
<script>
import ShopNav from './ShopNav.vue'
import ShopFooter from './ShopFooter.vue'
export default {
    components:{ShopNav, ShopFooter}
}

</script>
