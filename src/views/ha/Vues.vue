<template>
  <div>
    <Radarmap style="width:100vw;height:100vh;"></Radarmap>
    <Bodybottom></Bodybottom>
  </div>
</template>

<script>
import Radarmap from '../../components/Radarmap'
import Bodybottom from '../../components/Bodybottom'
export default {
  name: '',
  props: {},
  components: {
    Radarmap,
    Bodybottom
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
}
</script>

<style scoped lang='scss'>
</style>