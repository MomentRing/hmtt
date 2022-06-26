<template>
  <div>
    <router-view />

    <!-- 导航栏S -->
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">
        首页
        <i slot="icon" class="toutiao toutiao-shouye"></i>
      </van-tabbar-item>

      <van-tabbar-item replace to="/video" icon="search">
        视频
        <i slot="icon" class="toutiao toutiao-shipin"></i>
      </van-tabbar-item>

      <van-tabbar-item replace to="/question" icon="search">
        问答
        <i slot="icon" class="toutiao toutiao-wenda"></i>
      </van-tabbar-item>

      <van-tabbar-item replace to="/my" icon="search">
        我的
        <i slot="icon" class="toutiao toutiao-wode"></i>
      </van-tabbar-item>
    </van-tabbar>
    <!-- 导航栏E -->
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 40px;
  color: #707070;
}
/deep/.van-tabbar-item__text {
  font-size: 20px;
}

</style>
