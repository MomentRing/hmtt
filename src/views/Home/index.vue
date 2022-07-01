<template>
  <div>
    <!-- 标题搜索S -->
    <van-nav-bar title="标题" fixed>
      <template #title>
        <van-button icon="search" class="search-btn">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 标题搜索E -->
    <!-- tab栏S -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <!-- tab栏E -->
    <!-- 弹出栏 -->
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '98%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChaneelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      ></ChaneelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChaneelPanel from './components/ChaneelPanel.vue'
import { getMyChannels } from '@/api/home'
import ArticleList from '@/components/ArticleList.vue'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          // console.log('res', res)
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: { ArticleList, ChaneelPanel }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
  font-size: 28px;
  font-weight: 400;
  color: #fff;
  border: none;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
  border-radius: 3px;
}
.menu {
  min-width: 66px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 66px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 92px;
  border-bottom: 1px solid #edeff3;
}
</style>
