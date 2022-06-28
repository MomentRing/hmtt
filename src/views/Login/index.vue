<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <!-- 表单S -->
    <van-form @submit="onSubmit" ref="form">
      <!-- 手机S -->
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入正确手机号' },
        ]"
      >
        <!-- <i class="toutiao toutiao-shouji" slot="left-icon"></i> -->
        <MyIcon name="shouji" slot="left-icon"></MyIcon>
      </van-field>
      <!-- 手机E -->
      <!-- 验证码S -->
      <van-field
        v-model.trim="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须是6位' },
        ]"
      >
        <!-- <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i> -->
        <MyIcon name="yanzhengma" slot="left-icon"></MyIcon>
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            type="primary"
            class="yzm"
            native-type="button"
            v-else
            @click="onSendSms"
          >
            获取验证码
          </van-button>
        </template>
      </van-field>
      <!-- 验证码E -->
      <div style="margin: 16px">
        <van-button round block class="login-btn" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!-- 表单E -->
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'

export default {
  created () { },
  data () {
    return {
      mobile: '13911111111',
      code: '246810',
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push({
          name: 'my'
        })
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        // this.$toast.success('校验通过')
        this.isCountDownShow = true
        try {
          const res = await getSmsCode(this.mobile)
          console.log(res)
          this.$toast.success('发送成功')
        } catch (error) {
          console.log(error)
          this.$toast.fail('发送失败，请重试')
        }
      } catch (error) {
        this.$toast.fail(error.message)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  position: fixed;
  right: 10px;
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  border-style: none;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #fff;
  font-size: 30px;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
</style>
