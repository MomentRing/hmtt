<template>
  <div>
    <!-- 我的频道S -->
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          type="danger"
          size="small"
          round
          plain
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            class="inner"
            :style="{ color: index === active ? 'red' : '' }"
            @click="onClick(index)"
          >
            {{ item.name }}
            <!-- 关闭按钮 -->
            <van-icon
              name="close"
              v-if="index !== 0"
              :style="{ color: index === active ? 'red' : '' }"
              v-show="isCloseShow"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 我的频道E -->
    <!-- 推荐频道S -->
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 推荐频道E -->
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'

export default {
  name: 'ChannelPanel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      //   filter筛选 every 每一个要符合条件就是true,否则就是false
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        // 删除
        if (index === 0) return // 推荐不能删除所以排除
        const obj = this.channels[index]
        this.recommendChannels.push(obj)
        this.channels.splice(index, 1)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 高亮
        this.$emit('change-active', index)
      }
    }

  },
  computed: {},
  watch: {
    channels: {
      deep: true,
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) {
          // 登录过
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log('arr', arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else { // 未登录
          setItem(CHANNELS, newVal)
        }
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 16px;
  margin-top: 52px;
  margin-bottom: 16px;
  h3 {
    font-size: 32px;
    font-weight: normal;
    line-height: 36px;
    color: #333333;
  }
  .van-button {
    width: 104px;
    height: 48px;
    border-radius: 20px;
  }
}
.inner {
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  font-weight: normal;
  line-height: 86px;
  color: #222222;
  text-align: center;
  margin-left: 14px;
  position: relative;
  .van-icon-close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }
}
.van-col {
  margin-bottom: 22px;
}
</style>
