<template>
    <!--
    v-model 是：
      v-bind:value="数据"
      v-on:input="数据 = $event"
    lazy-render 关闭懒加载
    -->
   <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    get-container="body"
    :style="{ height: '95%' }"
   >
   <!-- 我的频道 -->
   <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            size="mini"
          >编辑</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for = "(item, index) in userChannels"
          :key="item.id"
          text="文字">
          <span class="text" :class="{ active: index === activeIndex }">{{ item.name }}</span>
          <van-icon class="close-icon" name="close" />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- /我的频道 -->

    <!-- 推荐频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          @click="handleAddChannel(item)"
          text="文字">
          <div class="info">
            <span class="text">{{ item.name }}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- /推荐频道 -->
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userChannels: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannels: []
    }
  },
  computed: {
    // 该计算属性用于处理获取推荐数据（也就是不包含用户频道列表的其他所有频道列表）
    // 计算属性其实也拥有watch的功能 但他的作用是用于当数据改变之后重更新计算返回一些数据供我们使用
    recommendChannels () {
      const duplicates = this.userChannels.map(item => item.id)
      return this.allChannels.filter(item => !duplicates.includes(item.id))
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      try {
        const data = await getAllChannels()
        this.allChannels = data.channels
      } catch (err) {
        console.log(err)
      }
    },
    handleAddChannel (item) {
      // userChannels 是props数据
      // props数据有个原则：单项数据流
      // 数据只受父组件影响 但是反之不会
      // 但是引用类型除外 即便是这样：也最好不要利用这个特点
      // 建议做法就是讲数据传递给父组件，让组件自己去修改
      this.userChannels.push(item)
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-left: 5px;
    }
    .desc {
      font-size: 12px;
    }
    .action {}
  }
  .channel-content {
    .text {
      font-size: 24px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 40px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
