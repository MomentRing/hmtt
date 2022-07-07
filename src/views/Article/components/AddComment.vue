<template>
  <van-field
    class="add-field"
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    ref="field"
  >
    <template #extra>
      <van-button
        type="default"
        class="btn"
        :disabled="message.length === 0"
        @click="onClick"
      >
        发布
      </van-button>
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  created () { },
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    art_id: {
      type: [String.Number]
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
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
.add-field {
  align-items: center;
  .btn {
    border: none;
  }
}
</style>
