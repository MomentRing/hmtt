<template>
  <div>
    <router-view class="main" />

    <!-- 导航栏S -->
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">
        首页
        <!-- <i slot="icon" class="toutiao toutiao-shouye"></i> -->
        <MyIcon name="shouye" slot="icon"></MyIcon>
      </van-tabbar-item>

      <van-tabbar-item replace to="/video" icon="search">
        视频
        <!-- <i slot="icon" class="toutiao toutiao-shipin"></i> -->
        <MyIcon name="shipin" slot="icon"></MyIcon>
      </van-tabbar-item>

      <van-tabbar-item replace to="/question" icon="search">
        问答
        <!-- <i slot="icon" class="toutiao toutiao-wenda"></i> -->
        <MyIcon name="wenda" slot="icon"></MyIcon>
      </van-tabbar-item>

      <van-tabbar-item replace to="/my" icon="search">
        我的
        <!-- <i slot="icon" class="toutiao toutiao-wode"></i> -->
        <MyIcon name="wode" slot="icon"></MyIcon>
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
.main {
  padding-bottom: 100px;
  background-color: #f5f7f9;
}
</style>
