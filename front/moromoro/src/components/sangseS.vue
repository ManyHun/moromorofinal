<template>
  <div class="sangse">
    <div class="sangseDisplay">
      <div class="leftBox sangseBox">

        <div class="itemImage">
          <img :src="prData.mainimage" alt="">
        </div>
      </div>
      <div class="rightBox sangseBox">
        <p class="itemName">{{prData.pr_name}}</p>
        <div class="rightboxLine"></div>
        <div class="rightboxText">
          {{prData.explanation}}
        </div>
        <div class="rightboxLine"></div>
        <!-- <div class="saleText">판매가 <span>{{prData.price}}원</span></div> -->
        <div class="saleText">판매가 <span>{{formattedPrice}}원</span></div>
        <div class="rightboxLine"></div>
        <div class="saleBox">
          <span>수량</span>
          <div class="sangsemBtn" @click="minusBtn">-</div>
          <div class="checkNum">{{ itemNum }}</div>
          <div class="sangsepBtn" @click="plusBtn">+</div>
          <div class="totalbox">
            <div>합계 <span>{{(prData.price * itemNum).toLocaleString()}}원</span></div>
          </div>
        </div>

        <div class="sangseBuy">
          <button class="buyBtn1 sangseB" @click="payment">구매하기</button>
          <button class="buyBtn2 sangseB" @click="cartSave">장바구니</button>
        </div>
      </div>
    </div>

  </div>
  
</template>

<script>
import axios from 'axios';
export default {
name: 'abouT',
data() {
  const value = 200000;
  const itemNum = 1;

  return {
    value: 200000,
    itemNum: 1,
    totalValue:  value * itemNum,
    itemName : "어쩌구 저쩌구 입니다",
    itemText : "으악 어쩌꾸~~~",
    
    prData:[],
  }
},
mounted() {
  window.scrollTo( 0, 0 ) ;
  this.$emit("mainC" ,0);

  axios.get('http://43.201.181.9:8080/productchoice?prId='+this.$route.params.num)
  .then(response => {
    this.prData = response.data
  } )
},

methods:{
  plusBtn(){
    this.itemNum ++
    if(this.itemNum > 10){
      this.itemNum = 10;
    }
    this.totalValue = this.itemNum * this.value;
  },
  minusBtn(){
    if(this.itemNum >1){
      this.itemNum --
      this.totalValue = this.itemNum * this.value;
    }
  },
  cartSave(){
    if(this.$store.state.login){    
      axios.post("http://43.201.181.9:8080/cart",{
      "quantity": this.itemNum,
      "product_productid": this.prData.productid,
      "member_member_id": this.$store.state.userData[0].memberId
      
    })
    alert("장바구니에 담았습니다")
  }else{
    alert("로그인이 필요합니다.")
  }


  },

  payment(){
    this.$router.push("/payment/"+ this.prData.productid + "/" + this.itemNum)
  }
},
computed: {
    formattedPrice() {
      if (this.prData && this.prData.price) {
        return this.prData.price.toLocaleString();
      }
      return "";
    }
  }
}
</script>

<style>
.abWrap{display: flex;flex-direction: column;align-items: center;margin: 100px 0;font-size: 18px;text-align: center;}
.abWrap img {width: 25vw;}
.abWrap >*{margin: 25px 0;}
*{ margin:0; padding: 0;}
.sangseDisplay{
  width: 1500px;
  height: 1000px;
  margin-left: 50%;
  transform: translate(-50%);
  display: flex;
  position: relative;
  margin-top: 3%;
}

.sangseBox{
  width: 50%;
  height: 700px;
  
}

.itemImage{
  width: 500px;
  height: 600px;
  /* background: #999; */
  margin-left: 50%;
  transform: translate(-50%);
}
.itemImage > img {width: 100%;}
.checkNum, .totalbox{
  display: inline-block;
}

.itemName{
  font-size: 20px;
  color: #006F6E;
  width: 500px !important;
  height: 50px !important;
}

.rightboxLine{
  width: 500px;
  border-bottom:1px solid #6e9e9d;
  margin: 25px 0;
}

.rightboxText{
  font-size: 16px;
  color: #404040;
  height: 200px;
  width: 500px;
  padding-left: 5px;
  /* border: 1px solid red; */
  text-align: justify;
}

.saleText{
  font-size: 16px !important;
}
.saleText > span{
  font-size: 20px;
  color: #404040;
  margin-left: 13%;
}
.sangsemBtn, .sangsepBtn , .checkNum{
  width: 30px;
  height: 30px;
  color: #5E5E5E;
  background: #fff;
  border: 1px solid #5E5E5E;
  cursor: pointer;
  display: inline-block;
  text-align: center;
}

.totalbox > div{
 margin-left: 15px;
}

.sangseBuy{
  width: 100%;
  display: flex;
}

.sangseB{
  width: 210PX;
  HEIGHT: 45PX;
  border: 1px solid #006F6e;
  font-size: 16px;
  margin-left: 1%;
  margin-top: 5%;
  cursor: pointer;
}

.buyBtn1{
  color: #FEFDF7;
  background: #006F6E;
}

.buyBtn2{
  margin-left: 2%;
  background: #FEFDF7;
  color: #006F6E;
  border: 1px solid #006F6E;
}


.saleBox > span{
  margin-right: 15px;
}
</style>