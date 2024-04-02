<template>
  <div class="songlist-detail-content">
    <el-table :data="SongSimInfo" stripe style="width: 100%; font-size: 1.2rem" lazy>
      <el-table-column type="index" min-width="10" />
      <el-table-column label="操作" width="50">
        <template #default="scope">
          <span class="caozuo iconfont icon-xihuan"></span>
          &nbsp;
          <span class="caozuo iconfont icon-xiazai1"></span>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="180">
        <template #default="scope">
          <span class="songname">{{ scope.row.name }}</span>
          <span v-if="scope.row.hr" class="tag">Hi-Res</span>
          <span v-else-if="scope.row.sq" class="tag">SQ</span>
          <span v-if="scope.row.fee === 8" class="tag">VIP</span>
          <span v-else-if="scope.row.fee === 1" class="tag">VIP</span>
          <span v-if="scope.row.fee === 8" class="tag">试听</span>
          <span v-if="scope.row.mv" class="tag">mv</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手">
        <template #default="scope">
          <span v-for="(item, index) in scope.row.ar" :key="item.id" class="singer"
            ><span v-if="index !== 0" class="split"> / </span>{{ item.name }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="专辑">
        <template #default="scope">
          <span class="zhuanji">{{ scope.row.al.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" fixed="right" width="60">
        <template #default="scope">
          {{ dayjs(scope.row.dt).format('mm:ss') }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { usePlaylistStore } from '@renderer/store/playlist'
import dayjs from 'dayjs'

const store = usePlaylistStore()
const { SongSimInfo } = storeToRefs(store)
</script>
<style lang="less" scoped>
.songlist-detail-content {
  width: 100%;
  :deep(.el-table .el-table__cell) {
    padding: 0;
  }
  :deep(.el-table .cell) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 3px 0;
  }
  .songname {
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .caozuo {
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
  .tag {
    font-size: 0.8rem;
    padding: 0 2px;
    margin: 0 2px;
    border-radius: 2px;
    border: 1px solid #ff6666;
    color: #ff6666;
    font-weight: 400;
  }
  .singer,
  .zhuanji {
    cursor: pointer;
    &:hover {
      color: #ff6666;
    }
  }
  .singer {
    .split {
      cursor: default;
      color: #000 !important;
    }
  }
}
</style>
