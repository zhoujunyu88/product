<template>
  <div>
    <First :obj="obj" class="first"></First>
    <div style="display:flex">
      <Aside class="as"></Aside>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import First from '../../components/First'
import Aside from '../../components/Aside'
export default {
  name: '',
  props: {},
  components: {
    First,
    Aside
  },
  data() {
    return {
      obj: {}
    }
  },
  methods: {},
  mounted() {
    this.obj = JSON.parse(localStorage.getItem('user'))
    this.$router.push('/Images')
  },
  watch: {},
  computed: {}
}
</script>

<style scoped lang='scss'>
.as {
  height: 100vh;
}
</style>