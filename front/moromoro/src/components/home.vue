<template>
  <div class="homeWrap">

    <div class="slide">
      <div class="slides" :class="{Tslide:moveX==0}" :style="`transform: translateX(${(test + moveX) * 100}%);` ">
        <div class="slideinner" v-for="i in 3" :key="i">
          <!-- <div class="imgbox"><img src="../assets/1111.jpeg" alt="슬라이드이미지1"><img src="../assets/2.jpeg" alt="슬라이드이미지1" :style="`opacity:${opacityS};`"></div>
          <div class="imgbox"><img src="../assets/2.jpeg" alt="슬라이드이미지1"><img src="../assets/1111.jpeg" alt="슬라이드이미지1" :style="`opacity:${opacityS};`"></div> -->

          <div class="imgbox"><div class="img slidBackImg1"></div><div class="img slidBackImg2" :style="`opacity:${opacityS};`"></div></div>
          <div class="imgbox"><div class="img slidBackImg2"></div><div class="img slidBackImg1" :style="`opacity:${opacityS};`"></div></div>

        </div>
      </div>
    </div>


  </div>
  <div class="space"  @mousedown="clickslid" @mousemove="moveslid" @mouseup="upslide" @mouseout="upslide">

  </div>

      
</template>

<script>
export default {
name: "hoMe",
data() {
  return {
    test:0,
    clickX:0,
    moveX:0,
    opacityS:0,
  }
},
methods: {
  clickslid(event){
    this.clickX = event.screenX;
  },

  moveslid(event){
    if(this.clickX != 0){
      this.moveX =-(this.clickX - event.screenX) / 2500
    }
    
  },
  upslide(){
    if(this.moveX >= 0.05){
      this.test +=1 ;
    }
    if(this.moveX <= -0.05){
      this.test -=1 ;
    }
    
    this.clickX = 0
    this.moveX = 0
    setTimeout(() => {
      this.moveX = 0.000000000000000000000001;
      if(this.test==3||this.test==-1){
        this.test = 1;
      }
      if(this.test==-2||this.test==2){
        this.test = 0;
      }
      

    }, 700);
    
  }

},
mounted() {
   window.scrollTo( 0, 0 ) ;
   this.$emit("mainC" ,0);

   setInterval(() => {
    if(this.clickX == 0){
    if(this.opacityS==0){
      this.opacityS = 1;
    }else{
      this.opacityS = 0;
    }
  }
   }, 6000);
},
}
</script>

<style>
.homeWrap{position:absolute;top: 0;left: 0;width: 100%;height: 100vh;overflow: hidden;}
.slide{width: 100%;height: 100vh; }
.space{width: 100%;height: 100vh; position: relative; top: -18vh;}
.slideinner{display: flex; width: 200%;}
.imgbox{width: 100vw; height: 100vh;overflow: hidden;position: relative;}
.imgbox .img:nth-child(2){position: absolute;left: 0;top: 0;transition:opacity 1.5s; }
.slideinner .img{width: 100vw;height: 100vh;background-position: center; background-size: cover;}
/* .imgbox img:nth-child(2){position: absolute;left: 0;top: 0;transition:opacity 1.5s;}
.slideinner img{width: 110vw;} */
.slides{position: relative; left:-200% ;display: flex;transition: transform 0s;}
.Tslide{transition: 0.7s;}
.slidBackImg1{background-image: url(../assets/1111.jpeg);}
.slidBackImg2{background-image: url(../assets/2.jpeg);}


</style>