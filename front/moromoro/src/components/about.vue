<template>
  <div class="abWrap">
    <img src="https://cdn.imweb.me/thumbnail/20220510/02acf36547bd4.png" alt="aboutimg">
    <div class="abkotext">
      <p><Strong>아무로나미에, 히로스에료코, 우타다히카루, 케미스트리, 스맙, 모닝구무스메… 아시나요? </Strong></p>
      <p><strong>10대 시절, 일본문화 특유의 서툴고 미숙한 것들을 따뜻하게 바라봐주는 분위기가 좋았답니다.</strong></p>
      <p><strong>모로모로도 누군가에게 이런 브랜드가 되려고 합니다.</strong></p>
      <p><strong>일상적이면서도 따뜻함을 주는 모로모로만의 ‘마음이 닿는 오브제’를 소개합니다.</strong></p>
      <p><strong></strong></p>
    </div>
    <div class="abjatext">
      <p><strong>安室奈美恵、広末涼子、宇多田ヒカル、ケミストリー、SMAP、モーニング娘... ご存知ですか？</strong></p>
      <p><strong>十代の頃、日本文化特有の下手で未熟なところを暖かく眺めてくれる雰囲気が良かったです。</strong></p>
      <p><strong>モロモロも誰かにこのようなブランドになろうとしています。</strong></p>
      <p><strong>日常的でありながら暖かさを与えるモロモロだけの「心に触れるオブジェ」をご紹介します。</strong></p>
    </div>
  </div>
  
</template>

<script>
export default {
name: 'abouT',
data() {
  return {
    
  }
},
mounted() {
  window.scrollTo( 0, 0 ) ;
   this.$emit("mainC" ,0);
},
}
</script>

<style>
.abWrap{display: flex;flex-direction: column;align-items: center;margin: 100px 0;font-size: 18px;text-align: center;}
.abWrap img {width: 25vw;}
.abWrap >*{margin: 25px 0;}



</style>