<template>
  <div>
    <!-- 已登录S -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            fit="cover"
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userInfo.fans_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 已登录E -->
    <!-- 未登录S -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <!-- 未登录E -->
    <!-- 宫格S -->
    <van-grid :column-num="2" clickable>
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 宫格E -->
    <!-- 单元格S -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <!-- 单元格E -->
    <!-- 退出按钮 -->
    <van-button
      class="logout"
      type="default"
      block
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log('res', res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗？' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  // opacity: 0.7;
  background: rgba(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  .inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    p {
      font-family: MicrosoftYaHei;
      font-size: 28px;
      color: #ffffff;
    }
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 55px;
    padding-right: 33px;
    padding-left: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      width: 116px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: normal;
      color: #666666;
    }
    .left {
      display: flex;
      align-items: center;
      .van-image {
        border: solid 2px #ffffff;
      }
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: normal;
        color: #ffffff;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #ffffff;
        font-weight: 400;
        &:first-child {
          font-size: 36px;
        }
        &:last-child {
          font-size: 23px;
        }
      }
    }
  }
}
/deep/.toutiao {
  font-size: 45px;
  &.toutiao-shoucang {
    color: #eb5253;
  }
  &.toutiao-lishi {
    color: #ff9d1d;
  }
}
/deep/.van-grid-item__text {
  font-size: 28px;
  color: #333;
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #d86262;
  font-size: 30px;
}
</style>
