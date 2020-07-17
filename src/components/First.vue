<template>
  <div class="navigation_bar">
    <div>
      <div class="title">欢迎{{ obj.username }}来到小爱后台管理系统</div>
    </div>
    <div style="display:flex">
      <div v-if="this.hours >= 6 && hours < 12">
        早上好，亲爱的{{ obj.username }}
      </div>
      <div v-else-if="this.hours >= 12 && hours < 14">
        中午好，亲爱的{{ obj.username }}
      </div>
      <div v-else-if="this.hours >= 14 && hours < 18">
        下午好，亲爱的{{ obj.username }}
      </div>
      <div v-else-if="this.hours >= 18 && hours < 24">
        晚上好，亲爱的{{ obj.username }}
      </div>
      <div v-else-if="this.hours < 6 && hours >= 0">
        您该睡觉了，亲爱的{{ obj.username }}
      </div>
      <div>上次登录时间：{{ obj.time }}</div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: '',
  props: {
    obj: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {
      hours: '',
    }
  },
  methods: {},
  mounted() {
    this.hours = dayjs().hour()
    console.log(this.hours)
  },
  watch: {},
  computed: {},
}
</script>

<style scoped lang="scss">
.navigation_bar {
  width: 100%;
  background-color: rgb(46, 94, 133);
  display: flex;
  justify-content: space-between;
  & div {
    color: white;
    font-size: 14px;
    padding: 8px 5px;
  }
}
</style>
