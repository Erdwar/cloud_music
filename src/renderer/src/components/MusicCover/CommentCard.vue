<template>
  <div class="comment-card">
    <div class="avatar">
      <el-avatar :size="35" :src="comments.user.avatarUrl" />
      <img
        v-if="comments.user.avatarDetail?.identityIconUrl"
        :src="comments.user.avatarDetail?.identityIconUrl"
        class="identity"
      />
    </div>
    <div class="comment-detail">
      <div class="main-comment">
        <span class="nickname">{{ comments.user.nickname }}</span>
        <img
          v-if="comments.user.vipRights?.associator"
          :src="comments.user.vipRights.associator.iconUrl"
          class="associator"
        />

        <img
          v-if="comments.user.vipRights?.musicPackage"
          :src="comments.user.vipRights.musicPackage.iconUrl"
          class="musicPackage"
        />
        <span> : {{ comments.content }}</span>
      </div>
      <div v-if="comments.beReplied.length" class="beReplied">
        <span class="beReplied-nickname">@{{ comments.beReplied[0].user.nickname }}</span> :
        {{ comments.beReplied[0].content }}
      </div>
      <div class="other">
        <div>{{ dayjs(comments.time).format('YYYY年MM月DD日 HH:mm') }}</div>
        <div class="caozuo">
          <span class="report">举报</span>
          <span class="iconfont icon-good">{{ comments.likedCount }}</span>
          <span class="iconfont icon-fenxiang1"></span>
          <span class="iconfont icon-Reply"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CommentType } from './type'
import dayjs from 'dayjs'
defineProps<{
  comments: CommentType
}>()
defineEmits(['update:commentValue'])
</script>
<style lang="less" scoped>
.comment-card {
  width: 100%;
  margin: 5px 0;
  padding: 5px 0;
  display: flex;
  font-size: 1.2rem;
  border-bottom: 1px solid #f2f2f2;
  &:hover .report {
    color: #507daf;
  }
  img {
    object-fit: fill;
    object-position: center;
    vertical-align: middle;
  }
  .avatar {
    position: relative;
    padding: 0 10px;
    .identity {
      width: 18px;
      height: 18px;
      position: absolute;
      top: 21px;
      right: 8px;
    }
  }
  .comment-detail {
    flex: 1;
    & > div {
      margin-bottom: 10px;
    }
    .main-comment {
      span {
        position: relative;
        margin: 0 1px;
        line-height: 1.5;
        vertical-align: middle;
      }
      .nickname {
        cursor: pointer;
        color: #507daf;
      }
      .associator {
        width: 45px;
        height: 15px;
      }
      .musicPackage {
        width: 15px;
        height: 15px;
      }
    }
    .beReplied {
      background-color: #f5f5f5;
      line-height: 1.5;
      .beReplied-nickname {
        color: #507daf;
      }
    }
    .other {
      color: #d0cfcf;
      display: flex;
      justify-content: space-between;
      .caozuo {
        & > span {
          border-right: 2px solid #f2f2f2;
          padding: 0 8px;
          font-weight: 400;
          font-size: 1.2rem;
          color: rgba(0, 0, 0, 0.6);
          cursor: pointer;
          &:hover {
            color: #ff6666;
          }
          &:last-child {
            border-right: none;
          }
        }
        .report {
        }
      }
    }
  }
}
</style>
