<template>
  <div class="comment-content">
    <el-input
      ref="comment"
      v-model="commentValue"
      :autofocus="true"
      type="textarea"
      maxlength="140"
      resize="none"
      rows="3"
      show-word-limit
      class="comment"
    />
    <div class="caozuo">
      <div class="left">
        <span @click="topic">#</span>
        <span @click="at">@</span>
      </div>
      <div class="right"><el-button size="small" round>提交</el-button></div>
    </div>
    <div class="comment-detail">
      <div v-if="topComments.length">
        <div class="title">置顶评论</div>
        <CommentCard
          v-for="item in topComments"
          :key="item.commentId"
          :comments="item"
        ></CommentCard>
      </div>
      <div v-if="hotComments.length">
        <div class="title">精彩评论</div>
        <CommentCard
          v-for="item in hotComments"
          :key="item.commentId"
          :comments="item"
        ></CommentCard>
      </div>
      <div v-if="hotComments.length">
        <div class="title">最新评论({{ commentsTotal }})</div>
        <CommentCard v-for="item in comments" :key="item.commentId" :comments="item"></CommentCard>
      </div>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="commentsTotal"
        @prev-click="prevPage"
        @next-click="nextPage"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePlaylistStore } from '@renderer/store/playlist'
import CommentCard from './CommentCard.vue'
const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})
const limit = ref(40)
const offset = ref(0)
const store = usePlaylistStore()
const { hotComments, topComments, comments, commentsTotal } = storeToRefs(store)
await store.getComments({ id: props.id, limit: limit.value, offset: offset.value })
const commentValue = ref('')
const comment = ref()
const at = () => {
  commentValue.value += '@'
  comment.value.focus()
}
const topic = () => {
  commentValue.value += '#输入你想说的话题#'
  comment.value.focus()
  console.log(comment.value.textarea)

  nextTick(() => {
    // comment.value.select()
    comment.value.textarea.setSelectionRange(
      commentValue.value.length - 9,
      commentValue.value.length - 1
    )
  })
}
const prevPage = () => {
  offset.value -= limit.value
  store.getComments({ id: props.id, limit: limit.value, offset: offset.value })
}
const nextPage = () => {
  offset.value += limit.value
  store.getComments({ id: props.id, limit: limit.value, offset: offset.value })
}
onMounted(() => {})
</script>
<style lang="less" scoped>
.comment-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .comment {
    font-size: 1.2rem;
    :deep(.el-textarea__inner:focus) {
      outline: none;
      box-shadow: 0 0 0 1px #de5555 inset;
    }
  }
  .caozuo {
    width: 100%;
    margin: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 1.8rem;
      color: #dcdfe6;
      font-weight: 700;
      & > span {
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          color: #ff6666;
        }
      }
    }
  }
  .comment-detail {
    width: 100%;
    .title {
      font-size: 1.6rem;
      font-weight: 700;
    }
  }
  :deep(.el-pager li) {
    height: 2.5rem;
    width: 2.5rem;
  }
  :deep(.el-pagination button) {
    height: 2.5rem;
    width: 2.5rem;
  }
}
</style>
