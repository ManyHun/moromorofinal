<template>
  <div class="manawrap">
    <div class="manainner">
      <h3>회원상세정보</h3>
      <!-- <div>여기에 아이디 넣어 ?</div> -->
      <div class="boxs">

        <div class="manainbox"><p>아이디</p><input class="manainput" type="text" v-model="userData.meId" readonly="true"></div>
        <div class="manainbox"><p>이름*</p><input class="manainput" type="text" v-model="userData.meName" :readonly="edit"></div>
        <div class="manainbox"><p>이메일*</p><input class="manainput" type="text" v-model="userData.meEmail" :readonly="edit"></div>
        <div class="manainbox"><p>비밀번호*</p><input class="manainput" type="password" v-model="userData.mePassword" :readonly="edit"></div>
        <div class="manainbox"><p>휴대폰번호</p><input class="manainput" type="tel" v-model="userData.mePhone" :readonly="edit"></div>
        <div class="manainbox"><p>주소</p><input class="manainput" type="text" v-model="userData.meAddress1" :readonly="edit"></div>
        <div class="manainbox"><p>상세주소</p><input class="manainput" type="text" v-model="userData.meAddress2" :readonly="edit"></div>
        <div class="manainbox manainboxLast"><p>우편번호</p><input class="manainput" type="text" v-model="userData.mePostNumber" :readonly="edit"></div>
      </div>
  
      <button class="userBtn" @click="edit =false, buttonShow=true" v-if="!buttonShow">수정</button>
      <button class="userBtn" @click="$router.go(0) , buttonShow=true" v-if="buttonShow">취소</button>
      <button class="userBtn" @click="manasave()" v-if="buttonShow">저장</button>
      <button class="userBtn" @click="exit()">회원탈퇴</button>

      <div></div>


    </div>
  </div>


</template>

<script>
import axios from 'axios';
// import axios from 'axios';


export default {
    name:'myPage',
    data() {
        return {
          //데이터변경 확인======================
          // myname:null,
          // email:"wool1769@gmail.com",
          // 비밀번호:"12a123",
          // 휴대폰번호:"01099021769",
          // 주소:"안산시 상록구",
          // 환불계좌:"농협은행 351-0734-3131-03",
          // 데이터확인==========================

          userData:[],


          edit:true,
          buttonShow:false,

          check:0,
        }
    },
    methods: {
      manasave(){
        let check= confirm("변경하시겠습니까?");
        if(check){
        axios.put('http://43.201.181.9:8080/userUpdate',this.userData)


        this.edit = true;
        this.buttonShow =false;

        alert("변경되었습니다.");
      axios.get(`http://43.201.181.9:8080/loginSucceed?userid=${this.userData.meId}`)
          .then(response =>{
            // this.userdata = response.data
            this.$store.commit('login')
            this.$store.commit('userData',response.data)
            console.log(response.data);
          })
        // this.$router.go(0)
        }
      },
      exit(){
        if(confirm("회원탈퇴를 원하십니까 ?")){
          if(prompt("비밀번호를 입력 하세요")==this.$store.state.userData[0].mePassword){
            axios.delete("http://43.201.181.9:8080/userDelete?meid="+this.$store.state.userData[0].memberId)
            .then(
              this.$router.push('/'),
              setTimeout(() => {
                            this.$store.commit('logout')
              this.$router.go(0)
              }, 200),
  
              )
          }

        }
      }
    },
    mounted() {
      window.scrollTo( 0, 0 ) ;
      this.$emit("mainC" ,1);

      this.userData = this.$store.state.userData[0];
      



    },
}
</script>

<style>
.manawrap{width: 100%;height: 100%;display: flex;justify-content: center;}
.manainner{margin-top: 50px;}
.manainner input{width: 640px;height: 45px;font-size: 16px;padding-left: 3px; border: none;border-top: 1px solid #DEDEDE;border-left: 1px solid #DEDEDE;border-right: 1px solid #DEDEDE;}
.manainboxLast input{border-bottom: 1px solid #DEDEDE;}
.manainbox{
  
  display: flex;
  
  align-items: center; 
  
  position: relative;

  padding-left: 3px;
  border: none;
}
.boxs{display: flex;
  flex-direction: column;
  
  align-items: left;
}

.manainbox p{
  width: 150px;
}


.userBtn{
    color: #006f6e;
  border: 1px solid #006f6e ;
  border-radius: 3px;
  cursor: pointer;
  background: #FFF;
  display: inline-block;
  transition: color 0.3s;
  width: 70px !important;
  height: 30px !important;
  margin: 15px 5px;
}

.userBtn:hover{
  background-color: #338C89;
  color: #FFF;
}


</style>