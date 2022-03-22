<template>
  <div class="comment">
    <div class="comment-info">
      <n-link
        :to="{name: 'user-id', params: {id : comment.uid}}"
        class="comment-avatar"
        target="_blank"
      >
        <avatar
          :src="avatar"
          size="30px"
        />
      </n-link>
      <div class="comment-head">
        <router-link
          :to="`/user/${comment.uid}`"
          class="comment-author"
          target="_blank"
        >
          {{ friendlyDisplayName }}
        </router-link>
        
        <!-- <p class="comment-timestamp"> -->
        <span class="comment-timestamp">commented {{ friendlyDate }}</span>
        <!-- </p> -->
        <span v-if="isMine" class="delete">
          <el-button class="delete-button" type="text" @click="deleteMyComment">
            Delete</el-button>
        </span>
      </div>
    </div>
    <p class="comment-message">
      <span class="wrap-open">{{ displayMessage }}</span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import avatar from '@/components/avatar/index'

export default {
  name: 'CommentCard',
  components: {
    avatar
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo']),
    isMine() {
      return this.comment.uid === this.currentUserInfo.id
    },
    friendlyDisplayName() {
      if (this.isMine) return 'Me'
      return this.comment.nickname || this.comment.username
    },
    displayMessage() {
      return this.comment.content !== '' ? this.comment.content : this.$t('p.commentNotContent')
    },
    friendlyDate() {
      const time = this.$moment(this.comment.createdAt)
      return this.$utils.isNDaysAgo(2, time) ? time.format('MMMDo HH:mm') : time.fromNow()
    },
    avatar() {
      if (this.comment.avatar) return this.$ossProcess(this.comment.avatar)
      return ''
    }
  },
  methods: {
    async deleteMyComment() {
      try {
        await this.$API.deleteComment(this.comment.id)
        this.$notify({
          title: 'Comment Deleted',
          message: 'You just delete your comment.',
          type: 'success'
        })
        this.$parent.getComments()
      } catch (error) {
        this.$notify({
          title: 'Comment Deletion Failed',
          message: 'Something bad just happened: ' + error.message,
          type: 'error'
        })
      }

    }
  },
}
</script>

<style scoped lang="less">
.comment {
  margin: 20px 0;
  text-align: left;
}

.comment-info {
  display: flex;
  align-items: flex-start;
}
.comment-head {
  font-size: 14px;
  font-weight: 400;
  color: #b2b2b2;
  line-height: 20px;
  letter-spacing: 1px;
}
.comment-avatar {
  margin-right: 10px;
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50%;
  background: #eee;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.comment-author {
  color: #fafafa;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 1px;
  word-break: break-word;
}
.comment-quantity {
  font-weight: 700;
  color: @purpleDark;
  line-height: 20px;
  letter-spacing: 1px;
}
.comment-timestamp {
  font-size: 12px;
  font-weight: 400;
  color: #b2b2b2;
  line-height: 17px;
  letter-spacing: 0px;
  padding: 0;
  margin: 6px 0;
}
.comment-message {
  color: #d9d9d9;
  /* height: 60px; */
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 5px 0 20px 40px;
  word-break: break-all;
}
.comment-line {
  height: 1px;
  margin-left: 44px;
  background-color: rgba(241, 241, 241, 1);
  box-sizing: border-box;
}
.wrap-open {
  white-space: pre-wrap;
}
.delete-button {
  color: #ff4d4f;
  font-size: 12px;
}
</style>
