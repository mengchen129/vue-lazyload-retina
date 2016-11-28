<template>
  <div>
    <img v-lazy="banner" data-rjs="3" class="banner-image" @load="imageOnload($event)">
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      banner: 'http://img.ishequ360.com/images/test/join@2x.jpg'
    }
  },
  methods: {
    imageOnload: function(e) {
      var src = e.target.src;
      console.log('image on load... src=' + src);
    }
  }
}
</script>

<style>
  .banner-image {
    width: 100%;
    height: auto;
  }
</style>
