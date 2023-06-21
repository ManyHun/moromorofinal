<template>
  <div class="singUpwrap">
    <div class="sinupTitle">
        회원가입
    </div>

    <div class="profiles">
      <span>아이디</span><input v-model="userId" type="text" placeholder="ID">
      <span>비밀번호</span><input v-model="password1" type="password" placeholder="영어 포함 8글자 이상">
      <span>비밀번호 확인</span><input v-model="password2" type="password" placeholder="비밀번호확인">
      <span>이메일</span><input v-model="emails" type="email" placeholder="이메일">
      <span>휴대폰</span><input v-model="phonNum" type="tel" placeholder="휴대폰번호">
      <span class="abcdf">우편번호</span><input v-model="postalCode" type="tel" placeholder="우편번호" readonly class="addrs">
      <button class="addBtn" @click="kakaoaddr">주소찾기</button>
      <span class="abcdf">주소</span><input v-model="addr1" type="tel" placeholder="주소" readonly>
      <span>상세주소</span><input v-model="addr2" type="tel" placeholder="상세주소">
      <span>이름</span>
      <input v-model="signName" type="id" placeholder="이름을 입력하세요">

      <div class="join" @click="singUpBtn">가입하기</div>
      
    </div>
  </div>
</template>

<script>

import axios from 'axios';
export default {
data() {
  return { 

    userId:null,
    password1: null,
    password2: null,
    phonNum: null,
    postalCode: null,
    addr1: null,
    addr2: null,
    signName: null,
    emails: null,
    
  }
},
mounted() {
  window.scrollTo( 0, 0 ) ;
  this.$emit("mainC" ,0);
},
methods: {
  singUpBtn(event){

    let url = "http://43.201.181.9:8080/idchech?userid="
    let idChech;

    axios.get(url+this.userId)
  .then(response => {
    console.log(response.data);
    idChech = !response.data

    if(idChech){
      if(this.effectiveness(event)){
      axios.post("http://43.201.181.9:8080/user",
      {
"me_address1" : this.addr1,
"me_address2" : this.addr2,
"me_division" :   "1",
"me_email" :   this.emails,
"me_id" :   this.userId,
"me_name" :   this.signName,
"me_password" :  this.password1,
"me_phone" : this.phonNum,
"me_postnumber" : this.postalCode,

})
.then(response => {console.log(response);
  alert("가입이 완료되었습니다.")
this.$router.push('/')})
.catch(error => {console.log(error);})
      }

    }else{
      alert("아이디중복!")
    }

  })
  .catch(error => {
    console.error(error);
  });

  console.log(idChech);
  },
  effectiveness(event) {
    const pwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailReg = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;

    if (!this.userId) {
       alert("ID를 입력해주세요. ");
       return false;
    }
    if (!this.password1) {
      alert("비밀번호를 입력해주세요. ");
      return false;
    }else if(!pwReg.test(this.password1)){
        alert("비밀번호를 잘못 입력하셨습니다")
        return false;
    }
    if (!this.password2) {
      alert("비밀번호 확인을 입력해주세요. ");
      return false;
    }else if (this.password1 !== this.password2) {
     alert("비밀번호가 일치하지 않습니다.");
     return false;
}

if (!this.emails){
      alert("이메일을 입력해주세요. ");
      return false;
    }else if(!emailReg.test(this.emails)){
      alert("이메일을 제대로 입력해주세요.")
      return false;
    }
    if (!this.phonNum) {
    alert("휴대폰 번호를 입력해주세요. ");
    return false;
  } else {
    const phoneNumber = this.phonNum.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    if (!phoneNumber) {
      alert("휴대폰 번호를 잘못 입력하셨습니다");
      return false;
    } else {
      this.phonNum = phoneNumber;
    }
  }
    if (!this.postalCode) {
      alert("우편 번호를 입력해주세요. ");
      return false;
    }
    if (!this.addr1) {
      alert("주소를 입력해주세요. ");
      return false;
    }
    if (!this.addr2) {
      alert("상세주소를 입력해주세요. ");
      return false;
    }
    if (!this.signName) {
      alert("이름을 입력해주세요. ");
      return false;
    }
    
    event.preventDefault();
    return true;
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
  }

},
}
</script>

<style>
.sinupTitle{display: flex;justify-content: center;margin: 40px 0 90px 0;font-size: 20px;}

.singUpwrap{
  width: 800px;
  height: 1200px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-top: 30px;
  /* border: 1px solid red; */
}

.profile{
  width: 100%;
  height: 100px;

}

.profiles input{
  width: 640px;
  height: 45px;
  border: 1px solid #DEDEDE;
  background: #FBFBFB;
  margin-left: 50%;
  transform: translate(-50%);
  font-size: 16px;
  padding-left: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.profiles input:nth-child(11){
  width: 320px;
  margin-left: 30%;
  display: inline-block;
}
.profiles button{
  display: inline-block;
  width: 105px;
  height: 45px;
  background: #F2F2F2;
  border: 1px solid #d8d8d8;
  margin-left: -150px;
  color: #006f6e;
  border: 1px solid #006f6e ;
  border-radius: 3px;
  cursor: pointer;
  background: #FFF;
  transition: color 0.3s;

}

.profiles button:hover{
  background-color: #338C89;
  color: #FFF;
}
.profiles input::placeholder{
  padding-left: 15px;
  margin-left: 15px;
}
.profiles input:focus {outline: none;}
.profiles{
  margin-top: 50px;
  color: #5E5E5E;
}

.profiles span{
  
  color: #006f6e;
  /* padding: 15px; */
  margin-left:90px;
  
}

.join{
  color: #006F6E;
  background: #FEFDF7;
  border: 1px solid #006F6E;
  width: 640px;
  height: 45px;
  margin-left: 50%;
  transform: translate(-50%);
  text-align: center;
  line-height: 45px;
  margin-top: 25px;
  cursor: pointer;
  transition: color 0.3s;
  }

.join:hover{
  color: #FEFDF7;
  background: #006F6E;
  border: 1px solid #338C89;
}

.addrs{
  /* width: 320px !important;
  margin: 0 !important;
  margin-left: 30% !important;
  display: inline-block !important; */

    width: 320px !important;
    margin-left: 30% !important;
}
.abcdf{
  display: block !important;
}

</style>