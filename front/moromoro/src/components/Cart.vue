<template>
    <section class="cart">
      <table class="cart_list">
        <!-- <form> -->
          <thead>
            <div class="h3">
              <p>장바구니</p>
            </div>
            <tr>
              <td>
                <input type="checkbox" style="display: none;">
              </td>
              <td colspan="2">
                <span style="color: #006F6E;  margin-left: 150px;">상품정보</span>
              </td>
              <td>옵션</td>
              <td>상품금액</td>
              <td>배송비</td>
            </tr>
          </thead>
          <tbody>
            <tr class="cart_list_detail" v-for="(a, i) in cartData" :key="i">
              
              <td>
                <input type="checkbox"  class="Pcheckbox" >
              </td>
              <td>
                <img :src="cartData[i].product.mainimage" alt="magic keyboard">
              </td>
              <td>
                <p>{{ cartData[i].product.pr_name }}</p>
                
              </td>
              <td class="cart_list_option">
                <p>{{ cartData[i].quantity }} 개</p>
                <!-- <button class="cart_list_optionbtn">주문조건 추가/변경</button> -->
              </td>
              <td>
                <span class="price">{{ cartData[i].product.price *  cartData[i].quantity}} </span>
                <br>
                <button class="cart_list_orderbtn">주문하기</button>
              </td>
              <td>무료</td><!-- 이건뭐냐 ? -->
            </tr>
            <!-- <tr class="cart_list_detail">
              <td>
                <input type="checkbox">
              </td>
              <td>
                <img src="https://cdn.imweb.me/thumbnail/20230328/97485a768400d.png" alt="magic mouse">
              </td>
              <td>
                <p>Octagon Clock</p>
                <p class="explain">길조를 뜻하는 팔각형 프레임과 색다른 다이얼, 컬러풀한 초침</p>
              </td>
              <td class="cart_list_option">
                <p>Octagon Clock / 1개</p>
                <button class="cart_list_optionbtn">주문조건 추가/변경</button>
              </td>
              <td>
                <span class="price">12,000 </span>
                <br>
                <button class="cart_list_orderbtn">주문하기</button>
              </td>
              <td>3,000</td>
            </tr> -->
          </tbody>
          <tfoot>
            <tr style="height: 220px;">
              <td colspan="3"></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        <!-- </form> -->
      </table>
      <div class="input_delete">
        <input type="checkbox" @change="checkall" class="allcheckbox">
        <button class="cart_list_optionbtn_delete" @click="cDel">선택상품 삭제</button>
      </div>
      <div class="cart_mainbtns">
          <button class="cart_bigorderbtn left">쇼핑 계속하기</button>
        <button class="cart_bigorderbtn right">주문하기</button>
      </div>
    </section>
    <div>{{ cartData }}</div>
    
  </template>
  
  <script>
import axios from 'axios';
  export default {
    name: 'cartS',
    data() {
      return {
        cartData:[],
        checktest:"",
      }
    },
    mounted() {
      window.scrollTo( 0, 0 ) ;
      this.$emit("mainC" ,0);

      axios.get("http://43.201.181.9:8080/cart?memId="+this.$store.state.userData[0].memberId)
      .then(response =>{
        this.cartData = response.data;
      })
    },
    methods:{

      cDel(){
       for(let i = 0; i < this.cartData.length; i++ ){
        if(document.querySelectorAll('.Pcheckbox')[i].checked){

          axios.delete("http://43.201.181.9:8080/cart?cartId="+this.cartData[i].cartid)
        }
        if(i == this.cartData.length-1){
          setTimeout(() => {
            this.$router.go(0)
          }, 1000);
          
        }
      }

      
      // this.$router.go(0)
      },
//allcheckbox
      checkall(){
        for(let i = 0; i < this.cartData.length; i++ ){
          document.querySelectorAll('.Pcheckbox')[i].checked = document.querySelector('.allcheckbox').checked
        }
  }

  }
}
  
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
    background-color:  #FEFDF7;
  }
  
  p,
  span {
    margin: 0;
    color:#404040;
  }
  
  a {
    color:#404040;
  }
  
  .cart {
    width: 80%;
    margin: auto;
    padding: 30px;
    margin-right: 15px;
  }
  
  .h3 p {
    width: 100px;
    height: 30px;
    font-size: 24px;
    color: #006F6E;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  
  .cart ul {
    background-color: whitesmoke;
    padding: 30px;
    margin-bottom: 50px;
    border: whitesmoke solid 1px;
    border-radius: 5px;
    font-size: 13px;
    font-weight: 300;
  }
  
  .cart ul:first-child {
    color: #338C89;
  }
  
  table {
    border-top: solid 2px #006F6E;
    border-bottom: solid 2px #006F6E;
    border-collapse: collapse;
    width: 1200px;
    font-size: 14px;
  }
  
  thead {
    text-align: center;
    font-weight: bold;
  }
  
  tbody {
    font-size: 12px;
  }
  
  td {
    padding: 15px 0px;
    border-bottom: 1px solid #CCE1DD;
    color: #006F6E;
    text-align: center;
    font-size: 18px;
  }
  
  td p {
    font-size: 15px;
    padding: 2px;
  }
  
  .price {
    font-size: 15px;
  }
  
  .cart_list_detail :nth-child(3) {
    vertical-align: top; 
  }
  
  .cart_list_detail :nth-child(3) a {
    font-size: 12px;
  }
  
  .cart_list_detail :nth-child(3) p {
    margin-top: 6px;
  }
  
  .cart_list_option {
    vertical-align: top;
    padding: 10px;
  }
  
  .cart_list_option p {
    height: 20px;
    margin-bottom: 25px;
    position: relative;
    line-height: 40px;
  }
  
  .cart_list_optionbtn {
    background-color: #FFF;
    font-size: 9px;
    color: #757575;
    border: #757575 solid 1px;
    padding: 7px;
    margin-bottom: 5px;
    border-radius: 2px;
    cursor: pointer;
  }
  
  .input_delete {
    margin-left: 9px;
    margin-top: 20px;
  }
  
  .cart_list_optionbtn_delete {  
    width: 100px;
    height: 30px;
    background-color: #FFF;
    font-size: 13px;
    color: 757575;
    border: #757575 solid 1px;
    border-radius: 2px;
    margin-left: 10px;
    cursor: pointer;
  }
  
  .cart_list_detail img {
    width: 50px;
    height: 60px;
    margin-left: 100px;
  }
  
  .cart_list_detail :nth-child(4) {
    font-size: 13px;
  }
  .cart_list_detail :nth-child(5),
  .cart_list_detail :nth-child(6) {
    text-align: center;
    font-size: 18px;
    color: #404040;
  }
  
  .cart_list_detail :nth-child(5) button {
    width: 60px;
    height: 25px;
    background-color: #338C89;
    color: white;
    border: none;
    border-radius: 2px;
    padding: 4px 8px;
    font-size: 9px;
    margin-top: 5px;
    cursor: pointer;
  }
  
  .cart_mainbtns {
    width: 400px;
    height: 100px;
    display: block;
    margin-left: 450px;
    margin-top: -20px;
  }
  
  .cart_bigorderbtn {
    width: 200px;
    height: 50px;
    font-size: 16px;
    margin: auto;
    border-radius: 2px;
  }
  
  .cart_bigorderbtn.left {
    width: 160px;
    height: 45px;
    font-size: 16px;
    color: #006F6E;
    background-color: #FEFDF7;
    border: 1px solid #338C89;
    cursor: pointer;
  }
  
  .cart_bigorderbtn.right {
    width: 160px;
    height: 45px;
    font-size: 16px;
    background-color: #338C89;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .explain {
    font-size: 10px;
  }
  </style>
  
  