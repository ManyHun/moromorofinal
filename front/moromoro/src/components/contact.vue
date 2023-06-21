<template>
  <div class="contactwrap">
    <section class="casection1">
      <nav class="conttab">
        <ul>
          <li>공지사항</li>


       
        </ul>
      </nav>
      <div class="notice">
        <p class="noticeC">글번호</p>
        <p>제목</p>
        <p>날짜</p>
      </div>
      <div @click="noModal=true;noNum=i" class="notice" v-for="(a, i) in noData" :key="i">
        <p>{{ noData[i].noticeId }}</p>
        <p>{{ noData[i].no_title }}</p>
        <p>{{ noData[i].no_date }}</p>
      </div>
      <button @click="conSave=1"  v-if="$store.state.admin" class="colorBtn cBtn">글쓰기</button>
     
    </section>
<section v-if="noModal" class="content" @click.self="noModal=false;noNum=null; this.$router.go(0)">
<div class="contentinner">
  <div class="contentbox">
  
    <div v-if="conUpdate==0">
      <div>제목 {{noData[noNum].no_title}}</div>
      <div class="lineHr"></div>
      <div>작성일 {{ noData[noNum].no_date }}</div>
      <div class="lineHr"></div>
      <div>작성자 {{ noData[noNum].no_name }}</div>
      <div class="lineHr"></div>
      <div>내용 {{ noData[noNum].no_content }}</div>
    </div>

    <div v-if="conUpdate==1">
      <div class="inlineB">제목 <input type="text" v-model="noData[noNum].no_title"></div>
      <div class="lineHr"></div>
      <div>작성일 {{ noData[noNum].no_date }}</div>
      <div class="lineHr"></div>
      <div>작성자 {{ noData[noNum].no_name }}</div>
      <div class="lineHr"></div>
      <div>내용</div>
      <div>

        <textarea cols="50" rows="20" v-model="noData[noNum].no_content" class="writeArea"></textarea>
      </div>
    </div>

  </div>
<button v-if="conUpdate==0 && $store.state.admin"  @click="conUpdate = 1" class="colorBtn">수정</button>
<button v-if="conUpdate==1 && $store.state.admin" @click="conUpdateSend" class="colorBtn">완료</button>
<button v-if="conUpdate==1 && $store.state.admin" @click="conUpdate =0; this.$router.go(0)" class="colorBtn">취소</button>
<button v-if="conUpdate==0 && $store.state.admin" @click="contentDel" class="colorBtn">삭제</button>
</div>

</section>


<!-- 글작성 -->
<section v-if="conSave == 1" class="content"  @click.self="conSave==0; this.$router.go(0)">
<div class="contentinner">
  <div class="contentbox">
  
    <div>
      <div class="writeName">제목<input type="text" v-model="noContentTitle" class="writeArea2"></div>
      <div>내용</div> 
      <div>
        <textarea cols="50" rows="20" v-model="noContent" class="writeArea"></textarea>
      </div>

    </div>

  </div>
<button v-if="$store.state.admin" @click="noContentSave"  class="saveWrite">작성완료</button>

</div>
</section>


  </div>
</template>

<script>
import axios from 'axios';

export default {
name: 'contacT',

data() {
  return {
noData:[],
noModal:false,
noNum:null,
conUpdate:0,
conSave:0,

admin: this.$store.state.userData,

// 글 내용 
noContentTitle:null,
noContent:null,


  }
},
mounted(){
  window.scrollTo( 0, 0 ) ;
   this.$emit("mainC" ,0);

   axios.get("http://43.201.181.9:8080/notice")
  .then(response => {

    this.noData = response.data;
  })
  .catch(error => {
    console.error(error);
  });
},
methods: {
  // 글 삭제
  contentDel(){
    axios.delete("http://43.201.181.9:8080/noticeDelete?noticeId="+this.noData[this.noNum].noticeId).then(response =>{
      console.log(response);
      this.$router.go(0);
    })
  },

  //글 업데이트 저장
  conUpdateSend(){
    axios.put("http://43.201.181.9:8080/noticeUpdate",{
      "noticeId": this.noData[this.noNum].noticeId,
      "no_title": this.noData[this.noNum].no_title,
      "no_content": this.noData[this.noNum].no_content,
      "no_name": this.noData[this.noNum].no_name
    }).then(response =>{
      console.log(response);
      this.$router.go(0);
    })
  },

  //글 저장
  noContentSave(){
    axios.post("http://43.201.181.9:8080/notice",{
      "no_title":this.noContentTitle,
      "no_content":this.noContent,
      "no_name":"관리자"//여기 원래 로긴할때 들어온 정보가 들어가야함 ... 
    }).then(this.$router.go(0))
  }
},
}
</script>

<style>
.contactwrap{width: 75%;margin: auto; 
  
  /* border: 1px solid; */
}
.casection1{width: 100%;min-height: 500px;margin: 100px 0;}

.conttab{display: flex;justify-content: center;align-items: center;position: relative;}
.conttab ul{display: flex;}
.conttab li{ cursor: pointer;}
/* .conttab li:nth-child(1)::after{position: absolute; content: "";width: 0px;height: 30px;border-left: 0.5px solid #006F6E;top: 50%;left: 50%;transform: translate(-50% , -50%);}
.conttab li:nth-child(2)::before{content: "";margin: 30px;} */
.notice {display: flex; justify-content: space-between; border: 1px solid; width: 80%;margin: auto;}

.content{position: fixed;width: 100vw; height: 100vh;top: 0;left: 0; background: rgba(0, 0, 0, 0.343);display: flex;justify-content: center;align-items: center;}
.contentinner{
  
  border: 3px solid #338C89;
  background: #fff ;width: 50%;height: 70%;display: flex;justify-content: center;align-items: center;}
.contentbox{
  /* border: 5px solid #338C89; */
  
  width: 90%;height: 90%;

}


.contactwrap {
  width: 75%;
  margin: auto;
}

.casection1 {
  width: 100%;
  min-height: 500px;
  margin: 100px 0;
}

.conttab {
  display: flex;
  justify-content: center;
  align-items: center;
}

.conttab ul {
  display: flex;
  list-style: none;
  padding: 0;
}

.conttab li {
  cursor: pointer;
  margin-right: 10px;
  font-weight: bold;
}

.notice {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  gap: 20px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.notice p {
  margin: 0;
  cursor: pointer;
}

.notice p:first-child {
  font-weight: bold;
}

.notice:hover {
  background-color: #f5f5f5;
}
.content {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.contentinner {
  background-color: #fff;
  width: 60%;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contentbox {
  margin-bottom: 20px;
}

.contentbox div {
  margin-bottom: 10px;
}

.contentbox input[type="text"],
.contentbox textarea {
  width: 100%;
  padding: 5px;
}

.contentbox textarea {
  color: #000;
  height: 150px;
}

.contentbox input{
  color: #000;
}

.contentbox button {
  margin-right: 10px;
}


.writeArea, .writeArea2{
  resize: none;
}

.writeArea:focus{
  outline: 1px solid #006f6e;
  border: 1px solid #006f6e;
}

.writeArea2:focus{
  border: 1px solid #006f6e;
}
.saveWrite{
  width: 100px; height: 50px;
  margin-left: -100px;
  color: #006f6e;
  border: 1px solid #006f6e ;
  border-radius: 3px;
  cursor: pointer;
  background: #FFF;
  transition: color 0.3s;
}

.saveWrite:hover {
  background-color: #338C89;
  color: #FFF;


}

.writeName{
  margin: 5px 0;
}


.colorBtn{
    width: 100px; height: 50px;
  /* margin-left: -100px; */
  color: #006f6e;
  border: 1px solid #006f6e ;
  border-radius: 3px;
  cursor: pointer;
  background: #FFF;
  display: inline-block;
  transition: color 0.3s;
  margin-top: 53% !important;
}


.cBtn{
  margin-left: 90% !important;
  margin-top: 1% !important;
}

.cBtn:hover{
  background-color: #338C89;
  color: #FFF;
}

.colorBtn:hover{
  background-color: #338C89;
  color: #FFF;
}

.lineHr{
  width: 100%;
  border-bottom: 1px solid #338C89;
}

.inlineB{
  display: inline;
}

.inlineB input{
  width: 95% !important;
}

.conttab > ul > li{
  margin-bottom: 15px;
}
</style>