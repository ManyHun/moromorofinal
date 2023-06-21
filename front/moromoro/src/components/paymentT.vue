<template>
  <div class="payWrap">
    <div class="leftPay">
      <div class="topPay">
        <span class="topInfo">주문상품정보</span>
        <div class="payItembox">
          <div class="payItem">
            <div class="itemImg"><img :src="productData.mainimage" alt=""></div>
            <div class="topEx">
              <div class="itemName">{{ productData.pr_name }}</div>
              <div class="itemEa">{{ $route.params.count }}</div>
              <div class="itemPrice">{{ productData.price * $route.params.count}}</div>
            </div>
          </div>
        </div>
      </div>
    <div>
    </div>
      <div class="orderInfo">
        <span>주문자 정보</span>
        <div class="orderBox">
          <input type="text" placeholder="이름" v-model="$store.state.userData[0].meName" readonly/>
          <input type="tel" placeholder="연락처"  v-model="$store.state.userData[0].mePhone" readonly/>
          <input type="email" placeholder="이메일" v-model="$store.state.userData[0].meEmail" readonly />
        </div>
      </div>

      <div class="shippingInfo">
        <span>배송 정보</span>
        <div class="shoppngcheck">
          <input type="checkbox" id="cb"  v-model="userChec" @change="changecheck()"/>
          <span>주문자 정보와 동일</span>
        </div>
        <input type="text" placeholder="수령인"  v-model="Recipient"/>
        <input type="text" placeholder="연락처"  v-model="buyphone" />
        <input type="text" placeholder="우편번호" v-model="postalCode" readonly/>
        <button @click="kakaoaddr">주소찾기</button>
        <input type="text" placeholder="주소"  readonly v-model="addr1" />
        <input type="text" placeholder="상세주소" v-model="addr2" />
      </div>

      <div class="delivery">
        <span>배송 메모</span>
        <div>
          <select name="" id="selectDel" @change="selectWrite" v-model="postMsg">
            <option value="배송메모를선택해주세요"  disabled selected>
              배송메모를선택해주세요.
            </option>
            <option value="배송전에미리연락바랍니다">
              배송 전에 미리 연락 바랍니다.
            </option>
            <option value="부재시 경비실에 맡겨주세요">
              부재시 경비실에 맡겨주세요.
            </option>
            <option value="부재시 전화나 문자를 남겨주세요">
              부재시 전화나 문자를 남겨주세요.
            </option>
            <option value="직접입력">직접입력</option>
          </select>
          <input
            type="text"
            placeholder="배송메모를 입력해주세요"
            id="del"
            v-if="del === 1"
            
            :v-model="postMsgInput"
            @input="postMsg = $event.target.value"
          />
        </div>
      </div>
    </div>

    <div class="rightPay">
      <!-- 주문요약 -->
      <div class="orderSummary">
        <span class="orderSpan">주문요약</span>
        <div class="orderSum"><span>상품가격</span> <span>{{ productData.price}}</span></div>
        <div class="orderSum"><span>배송비</span> <span>무료</span></div>
        <div class="orderHr"></div>
        <div class="orderSum">
          <span>총 주문금액</span> <span class="oS">{{ productData.price * $route.params.count}}</span>
        </div>
      </div>

      <!-- 결제수단 -->
      <div class="paymentMethod">
        <span>결제수단</span>
        <div class="paymentBox">
          <form action="">
            <input type="radio" name="payments" value="무통장 입금" v-model="selectedPayment"/>무통장 입금
            <input type="radio" id="payCard" name="payments" value="신용 카드" v-model="selectedPayment"/>신용 카드
            <br />
            <input type="radio" name="payments" value="실시간 계좌이체" v-model="selectedPayment"/> 실시간 계좌이체
            <input type="radio" name="payments" value="가상계좌" v-model="selectedPayment"/> 가상계좌
          </form>
        </div>
      </div>

      <!-- 이용약관 -->
      <div class="payTos">
        <form action="">
          <input
            type="checkbox"
            v-model="TosAll"
            name=""
            id="Tos"
            @click="allClick"
          />
          <label for="Tos">전체동의</label><br />
          <input type="checkbox" v-model="Tos1" name="" id="Tos1" />
          <label for="Tos1">개인정보 수집 및 이용 동의</label> <br />
          <input type="checkbox" v-model="Tos2" name="" id="Tos2" />
          <label for="Tos2">구매조건 확인 및 결제진행에 동의</label>
        </form>
      </div>

      <button class="payBuybtn" @click="payB">결제하기</button>
    </div>
  </div>
  <div>
    {{ productData }}
  </div>
<div>{{ $route.params.count }}mjkhnjkhnjkhjk</div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      del: 0,
      delValue: "",
      TosAll: false,
      Tos1: false,
      Tos2: false,
      postalCode: "", // 우편번호
      addr1: "", // 주소
      productPrice:5, //상품 가격
      Recipient:"", // 수령인
      phoneNumber:"", //핸드폰 번호
      buyName: "", // 주문자 정보 이름
      buyEmail: "", // 이메일
      buyphone: "", // 배송 정보 핸드폰
      addr2: "", // 주소 상세주소
      selectedPayment: '무통장 입금',
      postMsg: '배송메모를선택해주세요',
      postMsgInput:"",
      productData:[],
      chkMsg: 0,

      userChec:false,

    };
  },
  mounted() {
    axios.get("http://43.201.181.9:8080/productchoice?prId="+this.$route.params.proid)
    .then(Response => {
      this.productData = Response.data
    }),
    
    axios.get("http://43.201.181.9:8080/buy")
    .then(response => {
    this.noData = response.data;
  })
    .catch(error => {
    console.error(error);
  });
  },

  methods: {
    selectWrite(event) {
      if (event.target.value === "직접입력") {
        this.del = 1;
      } else {
        this.del = 0;
      }
    },

    allClick() {
      if (this.TosAll) {
        this.Tos1 = false;
        this.Tos2 = false;
      } else {
        this.Tos1 = true;
        this.Tos2 = true;
      }
    },
    kakaoaddr(){
    new window.daum.Postcode({
        oncomplete: (data) => {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.

            this.postalCode = data.zonecode
            this.addr1 = data.roadAddress
        }
    }).open();
  },

  changecheck(){
    if(this.userChec){
      this.Recipient = this.$store.state.userData[0].meName
      this.buyphone = this.$store.state.userData[0].mePhone
      this.postalCode = this.$store.state.userData[0].mePostNumber
      this.addr1 = this.$store.state.userData[0].meAddress1
      this.addr2 = this.$store.state.userData[0].meAddress2
    }else{
      this.Recipient = ""
      this.buyphone = ""
      this.postalCode =""
      this.addr1 = ""
      this.addr2 = ""
    }
  },
  payB(){
    //const selectedPayment = document.querySelector('input[name="payments"]:checked').value;
    // alert(this.selectedPayment)
    // alert(this.postMsg)
    let meno = false;
    let meno2 = false;
     if(this.postMsg == "배송메모를선택해주세요"){
          alert("배송 메모를선택해주세요");
        }else{
          meno = true;
        }

        //배송정보

        if(this.Recipient === "" || this.buyphone === "" || this.postalCode === "" || this.addr1 === "" || this.addr2 === ""){
          alert("배송 정보를 입력해주세요")
        }else{
            meno2 = true;
        }


        // 체크박스
    if (!this.Tos1 || !this.Tos2) {
        alert("모든 동의사항에 체크해주세요.");
   
        return false;
      }else{
        if(meno && meno2){axios.post("http://43.201.181.9:8080/buy",
    {
        "payoption": this.selectedPayment,
        "shipping": 1,
        "bu_postnumber": this.$store.state.userData[0].mePostNumber,
        "adress": this.$store.state.userData[0].meAddress1,
        "note": this.postMsg,
        "product_productid": this.productData.productid,
        "member_member_id": this.$store.state.userData[0].memberId,
        "password": 1,
        "phonnum": this.$store.state.userData[0].mePhone,
        "name" : this.$store.state.userData[0].meName,
        "ea" : this.$route.params.count
    }).then(this.$router.push("/oderman"))}
      }
  },
},

};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
.payWrap {
  height: 1720px;
  width: 50%;
  position: relative;
  margin-left: 50%;
  transform: translate(-50%);
  /* border: 1px solid red; */
  display: flex;
  margin-top: 2%;
}

.leftPay {
  width: 60%;
  /* border: 1px solid blue; */
  height: 100%;
}
.topPay {
  border: 1px solid #dedede;
  height: 170px;
  width: 500px;
  margin-left: 5%;
  background: #fff;
}
.topInfo {
  color: #404040;
  font-size: 20px;
  margin-left: 6%;
  margin-top: 1%;
  margin-bottom: 1%;
  display: inline-block;
}

.payItembox {
  width: 450px;
  height: 110px;
  border: 1px solid #dedede;
  margin-left: 50%;
  transform: translate(-50%);
}
.topEx {
  width: 70%;
}
.payItem {
  display: flex;
  width: 440px;
  height: 100px;
  flex-wrap: wrap;
}
.itemImg {
  width: 20%;
  height: 90px;
  background: #333;
  margin: 2% 5%;
  overflow: hidden;
}
.itemImg img{
  width: 100%;
}
.itemName,
.itemEa,
.itemPrice {
  width: 100%;
  height: 20%;
  padding-top: 8px;
  margin: 2% 0;
}

.orderInfo {
  width: 500px;
  height: 150px;
  border: 1px solid #dedede;
  margin-left: 5%;
  margin-top: 2%;
  background: #fff;
}

.orderInfo span {
  color: #404040;
  font-size: 20px;
  margin-left: 6%;
  margin-top: 2%;
  margin-bottom: 1%;
  display: inline-block;
}

.orderBox input:nth-child(1) {
  width: 220px;
  height: 35px;
  border: 1px solid #dedede;
  margin-left: 22px;
  padding-left: 12px;
  font-size: 13px;
  color: #5e5e5e;
}

.orderBox input:nth-child(2) {
  width: 220px;
  height: 35px;
  border: 1px solid #dedede;
  margin-left: 15px;
  padding-left: 12px;
  font-size: 13px;
  color: #5e5e5e;
}
.orderBox input:nth-child(3) {
  width: 455px;
  height: 35px;
  border: 1px solid #dedede;
  border-radius: 2px;
  margin-left: 50%;
  transform: translate(-50%);
  margin-top: 2%;
  padding-left: 12px;
  font-size: 13px;
  color: #5e5e5e;
}
input:focus {
  outline: none;
}

.shippingInfo {
  width: 500px;
  height: 260px;
  border: 1px solid #dedede;
  margin-left: 5%;
  margin-top: 2%;
  background: #fff;
}
.shippingInfo span {
  color: #404040;
  font-size: 20px;
  margin-left: 6%;
  margin-top: 2%;
  margin-bottom: 1%;
  display: inline-block;
}

#cb {
  width: 18px;
  height: 18px;
  accent-color: #006f6e;
  margin-left: 6%;
}
.shoppngcheck {
  height: 30px;
}
.shoppngcheck span {
  font-size: 14px;
  color: #404040;
  height: 30px;
  margin-left: 2%;
  margin-top: 1px;
  display: inline-block;
}

.shippingInfo input {
  margin-top: 0;
  padding: 0;
  border: 1px solid #dedede;
  margin-left: 21px;
  padding-left: 12px;
  font-size: 13px;
  color: #5e5e5e;
  height: 35px;
  margin-top: 2%;
  border-radius: 2px;
}

.shippingInfo input:nth-of-type(1) {
  width: 220px;
}
.shippingInfo input:nth-of-type(2) {
  width: 220px;
}

.shippingInfo input:nth-of-type(3) {
  width: 105px;
}

.shippingInfo button {
  background: #f2f2f2;
  border: 1px solid #dedede;
  width: 105px;
  height: 35px;
  cursor: pointer;
  margin-left: 2%;
}

.shippingInfo input:nth-of-type(4) {
  width: 455px;
}
.shippingInfo input:nth-of-type(5) {
  width: 455px;
}

.delivery span {
  color: #404040;
  font-size: 20px;
  margin-left: 6%;
  margin-top: 2%;
  margin-bottom: 1%;
  display: inline-block;
}

.delivery {
  width: 500px;
  height: auto;
  border: 1px solid #dedede;
  margin-left: 5%;
  margin-top: 1%;
  margin-bottom: 1%;
  background: #fff;
}

#selectDel {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid #dedede;
  width: 455px;
  height: 35px;
  color: #404040;
  margin: 15px 0 15px 22px;
  padding-left: 12px;
}
#selectDel:focus {
  outline: none;
}
option {
  color: #404040;
}

#del {
  width: 455px;
  height: 35px;
  border: 1px solid #dedede;
  padding-left: 12px;
  font-size: 13px;
  color: #5e5e5e;
  margin: 15px 0 15px 22px;
}

.rightPay {
  width: 40%;
}
.orderSummary {
  width: 300px;
  height: 210px;
  border: 1px solid #dedede;
  background: #fff;
}

.orderSpan {
  font-size: 20px;
  color: #404040;
  margin-left: 6%;
  margin-top: 2%;
  margin-bottom: 1%;
  display: inline-block;
}

.orderSum {
  display: flex;
  justify-content: space-between;
  margin: 15px 20px;
}

.orderSum span {
  font-size: 16px;
  color: #404040;
}
.orderHr {
  border-bottom: 1px solid #cce1dd;
  width: 260px;
  margin: 30px 0;
  margin-left: 50%;
  transform: translate(-50%);
}

.oS {
  color: #006f6e !important;
}

.paymentMethod {
  background: #fff;
  width: 300px;
  height: 190px;
  border: 1px solid #dedede;
  margin: 30px 0;
}

.paymentMethod span {
  color: #404040;
  font-size: 20px;
  margin-left: 6%;
  margin-top: 2%;
  margin-bottom: 1%;
  display: inline-block;
}

.payTos {
  width: 300px;
  height: 180x;
  background: #fff;
  border: 1px solid #dedede;
}
form {
  /* display: flex; */
  justify-content: space-between;
  flex-wrap: wrap;
  color: #404040;
  font-size: 13px;
}
form input {
  margin: 20px 15px;
  accent-color: #006f6e;
}
#payCard {
  margin-left: 45px;
}

input[id="Tos"],
input[id="Tos1"],
input[id="Tos2"] {
  position: relative;
  top: 4px;
  width: 18px;
  height: 18px;
  accent-color: #006f6e;
}
.payTos form label {
  font-size: 13px;
  color: #404040;
  margin-left: -5px;
}

.payBuybtn {
  margin-top: 21px;
  width: 300px;
  height: 60px;
  background: #338c89;
  border: 1px solid #dedede;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
</style>