<template>
   <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    :style="{ height: '95%' }"
  />
</template>

<script>
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    // handleInput (e) {
    //   console.log('handleInput => s',e)
    //   this.$emit('input',e)
    // }
  }
}
</script>

<style lang="less" scoped>
</style>
