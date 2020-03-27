<template>
  <div class="stat">
    <g-header />
    <div class="stat-head">
      <div class="stat-content">
        <img
          src="@/assets/img/statistics.png"
          alt="DAO JAM DATA STATISTICS"
          class="head-figure"
        >
        <div class="fl meter">
          <div class="meter-tag">
            <svg-icon
              class="meter-tag-icon"
              icon-class="lamination"
            />
            DAOs: 125
          </div>
          <div class="meter-tag">
            <svg-icon
              class="meter-tag-icon"
              icon-class="voted_users"
            />
            Voted Users：7853
          </div>
          <div class="meter-tag widen">
            <svg-icon
              class="meter-tag-icon"
              icon-class="voted_times"
            />
            Voted Times：14653
          </div>
          <div class="meter-tag">
            <svg-icon
              class="meter-tag-icon"
              icon-class="days_left"
            />
            Days Left：14
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import statistics from '@/assets/img/statistics.png'

export default {
  components: {
  },
  data() {
    return {
    }
  },
  // async asyncData({ $axios }) {},
  created() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.stat {
  padding-top: 60px;
  background-color: #0e2144;
  align-content: center;
}

.stat-head {
  min-height: 1120px;
  .stat-content {
    max-width: 1160px;
    padding: 40px 20px;
    margin: 0 auto;
    color: white;
  }
}
.head-figure {
  width: 100%;
  margin-bottom: 40px;
}
.meter{
  margin-bottom: 40px;
  &-tag {
    margin-right: 40px;  
    &:nth-child(4n) {
      margin-right: 0;
    }
    &.widen {
      flex: 1;
    }
    &-icon {
      margin-right: 5px;
    }
  }
}
</style>
