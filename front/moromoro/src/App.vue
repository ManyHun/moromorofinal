<template>
  <div class="top">moromoro objet (モロモロ オブジェ) website</div>
<div class="wrap"><!--wrap-------------------------------------------------------->

  <header>

    <h1 @click=" $router.push('/')">
      
        <div class="titleSub" :class="{titleopa : scY100}" >心に触れる物。</div>
        <img src="https://cdn.imweb.me/thumbnail/20221219/3b71c501dbdf0.png" alt="logo" :class="{h1ImgSize: scY100}">
        <div class="titleSub" :class="{titleopa : scY100}" >kokoroni hureru mono.</div>
    </h1>
  
    <nav>
      <ul class="gnb">
        <li @click="$router.push('/about')">ABOUT</li>
        <li @click="$router.push('/shop/all/1')">SHOP</li>
        <li @click="$router.push('/contact')">CONTACT</li>
      </ul>
      <ul class="person">
        <li @click="loginModal =true" v-if="!$store.state.login">LOG IN</li>
        <li @click="$store.commit('logout');$router.push('/').then(()=>{$router.go(0)});" v-if="$store.state.login">LOG OUT</li>
        <li v-if="$store.state.login==true" @click="$router.push('/cart')">CART</li>
        <li v-if="$store.state.login==true" @click="$router.push('/mypage')">MY PAGE</li>
        <li @click="$router.push('/admin')" v-if="$store.state.admin">ADMIN</li>
        <!-- <div> dd{{ $store.state.userData[0].meDivision }}</div>
        <div>{{ $store.state.userData[0].meDivision=='관리자' }}</div> -->
      </ul>
    </nav>

    <!-- 로그인 모달창 -------------------------------------------------------->
    <div class="modalwrap" v-if="loginModal" @click.self="loginModal =false">
      <div class="modal">
        <div class="modalinner">

          <h3>로그인</h3>
          
          <div class="conbox">
            <div class="inputtext">
              <div>아이디</div>
              <input v-model="loginId" type="text">
            </div>
            
            <div class="inputtext">
              <div>비밀번호</div>
              <input v-model="loginPw" type="password">
            </div>
            <div class="loging">
              <input type="checkbox">
              <div>로그인상태유지</div>
            </div>
            <div class="singup">
              <button @click="loginBtn">
                로그인
              </button>
              <span><router-link to="/singUp" @click="loginModal =false">회원가입</router-link></span>
              <div class="pws" @click="IdPwModal = true">
                <span>아이디</span>
                <span>비밀번호 찾기</span>
              </div>
            </div>
          </div>

          
          <div class="Nmembers">
            <button @click="searchnonModal = true">비회원 주문배송 조회</button>
          </div>

        </div><!-- 모달이너 -->


      </div><!-- 모달 -->

    </div><!-- 모달랩 -------------------------------------------->


    <!-- 아이디 · 비밀번호찾기 모달창 -------------------------------------------------------->
    <div class="modalwrap_find" v-if="IdPwModal" @click.self="IdPwModal =false">
      <div class="modal_find">
        <div class="modalinner_find">

          <h3>아이디 · 비밀번호 찾기</h3>
          
          <div class="conbox_find">
            <div class="inputtext_find">
              <div>아이디</div>
              <input type="text_find">
              <div class="singup_find">
              <button>
                아이디 찾기
              </button>
              </div>
              </div>
            </div>

            <hr class="line">

          <div class="conbox_find move">
            <div class="inputtext_find">
              <div>비밀번호</div>
              <input type="text_find">
              <div class="singup_find">
              <button>
                비밀번호 찾기
              </button>
              </div>
            </div>
            </div>
            
            </div><!-- 모달이너 -->

      </div><!-- 모달 -->

    </div><!-- 비번모달랩 -------------------------------------------->




    

        <!-- 비번 모달창 -------------------------------------------------------->
        <div class="modalwrap_find" v-if="IdPwModal" @click.self="IdPwModal =false">
      <div class="modal_find">
        <div class="modalinner_find">

          <h3>아이디 · 비밀번호 찾기</h3>
          
          <div class="conbox_find">
            <div class="inputtext_find">
              <div>이름을 입력하세요</div>
              <input type="text_find">
              <div class="singup_find">
              <button>
                아이디 찾기
              </button>
              </div>
              </div>
            </div>

            <hr class="line">

          <div class="conbox_find move">
            <div class="inputtext_find">
              <div>가입한 이메일을 입력해주세요</div>
              <input type="text_find">
              <div class="singup_find">
              <button>
                비밀번호 찾기
              </button>
              </div>
            </div>
            </div>
            
            </div><!-- 모달이너 -->

      </div><!-- 모달 -->

    </div><!-- 비번모달랩 -------------------------------------------->


    <!-- 비회원 주문조회하기 모달창 -->
<div class="modalwrap_searchnon" v-if="searchnonModal" @click.self="searchnonModal =false">
        <div class="modal_searchnon">
        <div class="modalinner_searchnon">
            <h3>비회원 주문조회</h3>            
            <div class="conbox_searchnon">                
            <div class="inputtext_searchnon">                
                <div>주문번호</div>
                <input type="text_searchnon">                    
                <div>전화번호</div>
                <input type="text_searchnon">           
                    <hr class="line">
                <div class="searchnonbtn_searchnon">
                <button>
                비회원 주문조회하기
                </button>
                </div>
                </div><!-- inputtext -->
                </div><!-- conbox -->                            
            </div><!-- 모달이너 -->
        </div><!-- 모달 -->  
    </div><!-- 비회원모달랩 -------------------------------------------->

  </header>   
   <!-- <div>{{ $store.state.login }}</div>
    <div>{{ $store.state.userData }}ddd</div> -->
<!-- 라우터부분 -->
<router-view v-if="changecontent == 0" @mainC ="mainC"></router-view>
<!-- 마이페이지 -->
<section class="mypage" v-if="changecontent == 1">
<div class="mypagemenu">
<ul>
  <li @click="$router.push('/mypage')">내정보관리</li>
  <li @click="$router.push('/oderman')">주문관리</li>
  <li @click="$router.push('/membership')">등급/쿠폰</li>
</ul>
</div>

<div class="mypageRt">
  <router-view @mainC ="mainC"></router-view>

</div>
</section>
<!-- 어드민페이지 -->
<section class="admin" v-if="changecontent == 2">
  <div class="adminMenu">
    <div @click="[adminmenu = 0, $router.push('/admin')]" :class="{ adminmenuClick : $route.path == '/admin' }">상품등록</div>
    <div @click="[adminmenu = 1, $router.push('/iteminfo')]" :class="{ adminmenuClick : $route.path == '/iteminfo' }">상품정보</div>
    <div @click="[adminmenu = 3, $router.push('/memberManagement')]" :class="{ adminmenuClick : $route.path == '/memberManagement' }">회원관리</div>
  </div>

  <div class="adminRt">
    <router-view @mainC ="mainC"/>
  </div>

</section>


  <footer>
    <div class="sns"><img src="https://cdn.imweb.me/upload/S20220421955ce1525d3fb/76b7f69001761.png" alt="instagramlogo"></div>
    <div class="terms">
      <ul>
        <li>이용약관</li>
        <li>개인정보처리방침</li>
        <li>사업자정보확인</li>
        <li>1:1문의</li>
        <li>공지사항</li>
        <li>마이페이지</li>
      </ul>
    </div>
    <div class="info">
      <ul>
        <li><Strong>상호/대표자명</Strong> 우월굿즈/윤유월</li>
        <li><Strong>연락처</Strong> 010-4117-6852, 070-7785-0990</li>
        <li><Strong>사업자등록번호</Strong> 108-376-6146</li>
        <li><Strong>통신판매업신고번호</Strong> 2022-서울서초-0149</li>
        <li><Strong>소재지</Strong> 서울특별시 서초구 탑성말1길 12 301호</li>
        <li><Strong>이메일</Strong> moromoro_objet@naver.com</li>
        <li><Strong>입금계좌</Strong>  국민은행 787201-04-260438</li>
      </ul>
      <div><strong>copyright(c) 2022 moromoro all rights reserved.</strong></div>
    </div>
    <div class="fobot">
      <ul>
        <li>ABOUT</li>
        <li>SHOP</li>
        <li>CONTACT</li>
      </ul>
      <ul>
        <li>이용약관</li>
        <li><strong>개인정보처리방침</strong></li>
      </ul>
      <h3>Copyright ⓒ 2023 moromoro (모로모로 오브제) All rights reserved.</h3>
   
    </div>
  </footer>
</div><!--wrap-------------------------------------------------------->


</template>

<script>
import axios from 'axios';


export default {
  name: 'App',
  data() {
    return {
      scY:0,
      scY100: false,
      loginModal:false,
      IdPwModal:false,
      changecontent:0,
      searchnonModal:false,
      adminmenu:0,

      // 로그인

      loginId:null,
      loginPw:null,
      // userdata:[],

    }
  },
  methods: {
    // 각 페이지에서 에밋으로 올라온 데이터 changecontent 입력 
    mainC(value){
      this.changecontent = value;
    },

    loginBtn(){
      axios.get(`http://43.201.181.9:8080/login?userid=${this.loginId}&pw=${this.loginPw}`)
      .then(response => {
        console.log(response.data);
        if(response.data == 1){
          alert("아이디를 확인해주세요")
        }else if(response.data == 2){
          alert("비밀번호를 확인해주세요")
        }else if(response.data == 0){
          
          axios.get(`http://43.201.181.9:8080/loginSucceed?userid=${this.loginId}`)
          .then(response =>{
            // this.userdata = response.data
            this.$store.commit('login')
            this.$store.commit('userData',response.data)
            this.loginModal =false
        
            

          })
        }
      }) 
        
      
    },

  
  },
mounted() {
  // 페이지 이동시 탑 
  window.addEventListener('scroll', () => {
    this.scY = window.scrollY
    if(this.scY >= 100){
      this.scY100 = true;
    }else{
      this.scY100 = false;
    }
  });
  // loginId:null,
  //     loginPw:null,



},

  components: {

  },
  
}
</script>

<style>
.wrap{background: #FEFDF7;}
* { color: #00706E; list-style: none;margin: 0; padding: 0;box-sizing: border-box;}
.top { color: #fff; background: #00706E; width: 100%;height: 4vh;display: flex;align-items: center;justify-content: center;font-size: 18px;font-weight: bold;position: relative;z-index: 100;}
header{position: sticky;top: 0; width: 100%;height: 14vh;display: flex;align-items: flex-end;justify-content: center;z-index: 100;}
h1{ position: absolute;bottom: 0;left: 50%;transform: translateX(-50%);width: 36vw;height: 83%;display: flex;}
h1 > * {cursor: pointer;}
h1 img{height: 100%;transition: all 1s;}
.h1ImgSize{transform: scale(0.8);}

.titleSub{height: 100%;width: 37%;display: flex;justify-content: center;align-items: center;font-size: 17px; transition: all 0.6s;}
.titleopa{opacity: 0;}


header nav {display: flex; justify-content: space-between;width: 97%;height: 85%;}
.person {display : flex; flex-direction: column;align-items: end;}
header nav ul li{cursor: pointer;font-size: 17px; font-weight: bold;}


/* 로그인 모달창~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

.conbox{width: 100%;height: 260px; display: flex;flex-direction: column; justify-content: space-between;position: relative;top: -20px;}
.modalwrap *{color: #006F6E;}
.modalwrap{position: absolute;top: 0;left: 0;width: 100vw;height: 100vh;background: #0000004f;display: flex;justify-content: center;align-items: center;}
.modalwrap h3 {font-size: 20px;}
.modal{width: 460px;height: 500px; background: #fff;border: 2px solid #006F6E;border-radius: 7px;display: flex;justify-content: center;align-items: center;}
.modalinner{ width: 380px;height: 442px;font-size: 16px; display: flex;flex-direction: column;justify-content: space-between;}
.inputtext input{width: 380px; height: 40px;border-radius: 3px;font-size: 16px;outline: 0; border: 1px solid #5E5E5E; padding-left: 10px;}
.inputtext div{color: #5E5E5E;position: relative;top: -2px;}
.loging{display: flex;}
.loging input{margin-right: 5px; background: #006F6E; accent-color: #006F6E;width: 18px;height: 18px;}
.modalwrap button{width: 100%;height: 40px;background: #fff;border: 1px solid #006F6E;border-radius: 3px;cursor: pointer;font-size: 16px; transition: 0.6s;}
.singup{display: flex;justify-content: space-between;flex-wrap: wrap;}
.pws,.singup > span{position: relative;top: 5px; cursor: pointer;}
.pws span:nth-child(1)::after{content: "·";margin: 2px;}
.Nmembers{height: 70px;display: flex;align-items: end;border-top: 1px solid #CCE1DD;}
.Nmembers button{border: 1px solid #698C9C;background:#8393A7;color: #fff;font-size: 14px;}

.singup button:hover {background: #006F6E;color: #fff;}
.Nmembers button:hover{border: 1px solid #006f6e;}



/* 아이디 · 비밀번호찾기 모달창 */
.conbox_find{width: 100%;height: 240px; display: flex;flex-direction: column; justify-content: space-between;
  position: relative; margin-top: 20px;}
.modalwrap_find *{color: #006F6E;}
.move{margin-bottom: 30px;}
.modalwrap_find{position: absolute;top: 0;left: 0;width: 100vw;height: 100vh;background: #0000004f;display: flex;justify-content: center;align-items: center;}
.modalwrap_find h3 {font-size: 20px; height: 30px;}
.modal_find{width: 460px;height: 400px; background: #fff;border: 2px solid #006F6E;border-radius: 7px;display: flex;justify-content: center;align-items: center;}
.modalinner_find{ width: 380px;height: 400px;font-size: 16px; display: flex;flex-direction: column;justify-content: space-between; margin-top: 50px;}
.inputtext_find input{box-sizing: border-box; width: 380px; height: 40px;border-radius: 3px;font-size: 16px;outline: 0; border: 1px solid #5E5E5E;}
.inputtext_find div{width: 380px; height: 25px; color: #5E5E5E;position: relative;top: -2px; }
.modalwrap_find button{width: 100%;height: 40px;background: #fff;border: 1px solid #006F6E;border-radius: 3px;cursor: pointer;font-size: 16px; transition: 0.6s;
margin-top: 20px;}
.line{width: 380px; background:#CCE1DD; height:1px; border:0; }
.singup_find button:hover {background: #006F6E;color: #fff;}

/* 비회원 주문조회 모달창 */
.conbox_searchnon{width: 100%;height: 300px; display: flex;flex-direction: column; justify-content: space-between;position: relative;}
.modalwrap_searchnon *{color: #006F6E;}
.modalwrap_searchnon{position: absolute;top: 0;left: 0;width: 100vw;height: 100vh;background: #0000004f;display: flex;justify-content: center;align-items: center; z-index: 100;}
.modalwrap_searchnon h3 {font-size: 20px; height: 30px;margin-top: 30px;}
.modal_searchnon{width: 460px;height: 350px; background: #fff;border: 2px solid #006F6E;border-radius: 7px;display: flex;justify-content: center;align-items: center;}
.modalinner_searchnon{ width: 380px;height: 350px;font-size: 16px; display: flex;flex-direction: column;justify-content: space-between; }
.inputtext_searchnon input{box-sizing: border-box; width: 380px; height: 40px;border-radius: 3px;font-size: 16px;outline: 0; border: 1px solid #5E5E5E;margin-bottom: 10px;}
.inputtext_searchnon div{width: 380px; height: 25px; color: #5E5E5E;position: relative;top: -2px; }
.modalwrap_searchnon button{width: 100%;height: 40px;background: #fff;border: 1px solid #006F6E;border-radius: 3px;cursor: pointer;font-size: 16px; transition: 0.6s;margin-top: 20px;}
.searchnonbtn_searchnon{display: flex;justify-content: space-between;flex-wrap: wrap;}
.searchnonbtn_searchnon button:hover {background: #006F6E;color: #fff;}
.line{width: 380px; background:#CCE1DD; height:1px; border:0; margin-top: 20px;}





/* 마이페이지---------------------------123---1394-------- */

.mypage{ width: 72.5vw;margin: auto; margin-top: 59px;display: flex;}
.mypagemenu{width: 8.8%;display: flex;justify-content: center;align-items: flex-start;}
.mypageRt{width: 91.2%;}
.mypagemenu ul li {cursor: pointer; position: relative; z-index: 100;}

/* 어디민페이지~~~~~~~~~~~~~~~~~ */
.admin { width: 53.5vw; margin: auto;}
.adminMenu { display: flex;justify-content: space-between; margin-top: 7vw;}
.adminMenu div{ cursor: pointer; width: 9.375vw; height: 2.344vw; border-radius: 5px;background: #EAEAEA; color: #3E3E3E; text-align: center;line-height: 2.344vw; font-size: 0.83vw; transition: 0.5s;}
.adminmenuClick {background: #338C89 !important; color: #F5F5F5 !important;}

/* 푸터~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
footer{width: 100%;height: 55vh;}
footer > *{width: 100%;}
.sns{height: 18.5%; display: flex;align-items: center;justify-content: center;}
.sns img {height: 42.5%;}

.terms{height: 14%; display: flex;justify-content: center;align-items: center;}
.terms ul {width: 33%; display: flex;justify-content: space-between;align-items: center;}

.info{height: 45%;display: flex;flex-direction: column; justify-content: center;align-items: center;}
.info  ul {width: 59%;display: flex;flex-wrap: wrap;justify-content: center;}
.info  ul >li {margin: 0 10px;}

.fobot{height: 22.5%;background: #383838; display: flex;flex-direction: column;align-items: center;justify-content: center;}
.fobot *{color: #fff;}
.fobot ul{display: flex;}
.fobot ul:nth-child(2){margin: 10px;}
.fobot ul li{margin: 0 10px;}


</style>