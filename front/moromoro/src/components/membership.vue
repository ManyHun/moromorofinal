<template>
  <div class="mabershipWrap">
    <div class="mbGrade">

      <div class="grade">
        <div>Bronze</div>
        <div>Silver</div>
        <div>Gold</div>
        <div>Platinum</div>
      </div>

      <div class="Benefit">
        <div class="Benefits">
          <p>가입쿠폰 5%</p>
        </div>
        <div class="Benefits">
          <p>매월 1회 5% 쿠폰</p>
          <p>생일 10,000 할인쿠폰</p>
        </div>
        <div class="Benefits">
          <p>매월 1회 7% 쿠폰</p>
          <p>생일 12,000 할인쿠폰</p>
        </div>
        <div class="Benefits">
          <p>매월 1회 10% 쿠폰</p>
          <p>생일 15,000 할인쿠폰</p>
        </div>
      </div>

    </div>


    <div class="coupon">
      <div>
        <div>쿠폰이름</div>
        <div>혜택</div>
        <div>사용가간</div>
      </div>

      <div class="coupons" v-for="(a,i) in 2" :key="i">
        <p>{{  }}신규가입쿠폰</p>
        <p>{{  }}20%</p>
        <p>{{  }}23.03.02 ~ 23.05.31</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name:'membershipLevel',
data() {
    return {
        
    }
},
mounted() {
    window.scrollTo( 0, 0 ) ;
     this.$emit("mainC" ,1);
    },
}
</script>

<style>
.mabershipWrap{width: 100%;}
.mabershipWrap >div {position: relative;left: 21%;}
.mabershipWrap *{color: #404040;}

.mbGrade{border: 1px #5E5E5E solid; border-radius: 5px;background: #fff; width: 31.25vw; height: 10.41vw;}
.grade{border-bottom: 1px #5E5E5E solid;display: flex;  align-items: center; width: 28.65vw;height: 2.4vw;margin: auto;font-size: 0.78vw;font-weight: bolder;}
.grade div {border-left: 1px solid; width: 25%;height: 1.56vw;text-align: center;line-height: 1.56vw;}
.grade div:first-child{border: none;}

.Benefit{margin: auto; width: 28.65vw;display: flex;font-size: 0.625vw;}
.Benefits{width: 25%;}
.Benefits p {margin: 5px 0;}


.coupon{ border: 1px #5E5E5E solid; border-radius: 5px;background: #fff; width: 31.25vw; min-height: 10.41vw; margin: 1.56vw 0 4vw 0; }
.coupon > div:first-child{border-bottom: 1px #5E5E5E solid;display: flex;  align-items: center; width: 28.65vw;height: 2.4vw;margin: auto;font-size: 0.78vw;font-weight: bolder;}
.coupon div:first-child div{ width: calc(100%/3); text-align: center;}
.coupons {display: flex; width: 28.65vw;margin: 5px auto;}
.coupons p {width: calc(100%/3); text-align: center; font-size: 0.625vw;}
</style>