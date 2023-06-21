<template>
  <div class="shopwrap">
      <section class="shopsection1">

        <ul>
          <li v-for="(a,i) in menu" :key="a"  @click="cateClick(a.url)">{{a.vue}} <div :class="{menuclick:i==menucl}" @click="menucl=i">{{a.vue}}</div></li>
        </ul>

          <!-- <div class="searchbox">
          <input type="text" class="search" placeholder="search">
          <img src="../assets/search.png" alt="">
        </div> -->
        
      </section>
      
      <div class="products">
        <div class="product" v-for="a in products" :key="a" @click="$router.push('/product/'+a.productid)">
          <div class="imgs">
            <img :src="a.mainimage" alt="1">
            <img :src="a.serveimage" alt="2" v-if="a.serveimage!=null">
          </div>
          
          <p>{{a.pr_name}}</p>
          <p>{{a.price.toLocaleString()}}원</p>

        </div>
        
      </div>

      <!-- 페이징번호 -->

      <div class="pagination-container">
    <button v-if="pageMultiply != 0" @click="groupPrev">&#5130;&#5130;</button>
    <button v-if="pid != 1" @click="Prev">&#5130;</button>
    <button v-for="i in pageFor" :key="i" @click="clickpd(i)" :class="{btnChoice : i + pageMultiply * 5 == $route.params.page}">
      {{ i + pageMultiply * 5 }}
    </button>
    <button v-if="pid != totalPage" @click="Next">&#5125;</button>
    <button v-if="pageFor == 5" @click="groupNext">&#5125;&#5125;</button>
  </div>

    </div>


</template>

<script>
import axios from 'axios';

export default {
  name:'shoP',
  data() {
    return {
      menu:[
        {"vue":"ALL","url":"all"},
        {"vue":"CLOCKS","url":"clock"},
        {"vue":"GOODS","url":"goods"},
        {"vue":"BOOKS","url":"book"},
        {"vue":"SAKE","url":"sake"},
        {"vue":"TAMAGOTCHI","url":"tamagotchi"}],
      menucl :null,

      products:[],

      // 페이징 재료들~~~~~~~₩

      pageMultiply:0,
      totalMp:null,
      productlength:null,
      totalPage:null,
      pageGroup:null,
      pageFor: null,

      pid: this.$route.params.page,
      pco: this.$route.params.condition,
      
      
    }
  },
  methods: {
    clickpd(i){
      this.$router.push({ path: `/shop/${this.pco}/${(i) + this.pageMultiply*5 }` }).then(() => {
        this.$router.go(0);});
    },

    cateClick(a){
      this.$router.push({ path: `/shop/${a}/1` }).then(() => {
        this.$router.go(0);});
    },

    groupPrev(){
      this.pageMultiply -= 1;
      let nowPage = (this.pageMultiply *5)+1
      this.$router.push({ path: `/shop/${this.pco}/${nowPage}` }).then(() => {
        this.$router.go(0);});
    },
    groupNext(){
      this.pageMultiply += 1;
      let nowPage = (this.pageMultiply *5)+1
      this.$router.push({ path: `/shop/${this.pco}/${nowPage}` }).then(() => {
        this.$router.go(0);});
    },
    
    Prev(){
      this.$router.push({ path: `/shop/${this.pco}/${this.pid -=1}` }).then(() => {
        this.$router.go(0);});
    },
    Next(){
      this.$router.push({ path: `/shop/${this.pco}/${this.pid = Math.round(this.pid)+ 1}` }).then(() => {
        this.$router.go(0);});
    }

    
  },



  mounted() {
    window.scrollTo( 0, 0 ) ;
    this.$emit("mainC" ,0);

    

    const pramId = this.pid-1
    const pramPco = this.pco
    const allCate = "http://43.201.181.9:8080/product?pageNo="+pramId+"&pageSize=8"
    const pramCate = `&condition=${pramPco}`

    let url;

    this.pageMultiply = Math.floor((this.pid-1) /5)

    if(pramPco == "all"){
      url = allCate
    }else{
      url = allCate + pramCate
    }
    axios.get(url)
  .then(response => {

    this.products = response.data;
  })
  .catch(error => {
    console.error(error);
  });



    axios.get("http://43.201.181.9:8080/productlength?category="+pramPco)
  .then(response => {

    this.productlength = response.data;
    this.totalPage = Math.ceil(response.data/8);
    this.pageGroup = Math.floor(response.data/40);


    if(this.productlength <= 40){
      this.pageFor = this.totalPage
    }else if(this.pageGroup == this.pageMultiply){
      this.pageFor = Math.ceil((response.data % 40)/8) 
    }else{this.pageFor = 5}
  })
  .catch(error => {
    console.error(error);
  });



},

}
</script>

<style>
.shopwrap{width: 75%;margin: auto; }
.products{margin-bottom: 100px; display: flex;flex-wrap: wrap; justify-content: flex-start;}
.product{position: relative; margin:0 10px 60px;width: 23%;  overflow: hidden;}
.product p {width: 100%;}

.shopsection1{display: flex; position: relative;justify-content: center;align-items: center;margin: 100px 0;}
.shopsection1 ul {display: flex; align-items: baseline; position: absolute;}
.shopsection1 ul li{margin: 0 20px;font-weight: bold; font-size: 16px;position: relative;color: transparent;}
.shopsection1 ul li div{position: absolute;bottom: 0;left: 50%; transform: translateX(-50%);transition: 0.5s;}
.shopsection1 ul li div:hover{font-size: 21px;}
.menuclick {font-size: 21px;}



/* .shopsection1 ul li:hover{margin: 0 20px;font-weight: bold; font-size: 20px;} */

.searchbox{display: flex; position: absolute;right: 0;}

.search::placeholder {color: #00706E;font-size: 16px;font-weight: bolder;}
.search{border: 0;border-bottom: 1px solid;width: 100px;outline: none;background: #FEFDF7;}
.searchbox img {width: 16px;}


.imgs{width: 17.4vw;height: 20.9vw;overflow: hidden; position: relative; cursor: pointer;}
.product img{height: 100% !important;position: absolute;top: 50%;left: 50%; transform: translate(-50%,-50%);}
.product img:nth-child(2){transition: 0.5s;opacity: 0;height: 20.9vw !important;}
.product img:nth-child(2):hover{opacity: 1;}


.pagination-container {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-container button {
  margin: 0 5px;
  padding: 8px 12px;
  border: 1px solid #006F6E;
  background-color: #FEFDF7;
  color: #006F6E;

  cursor: pointer;
  transition: background-color 0.5s;
}

.pagination-container button:hover {
  background-color: #006F6E;
  color: #FEFDF7;
}

.pagination-container button:focus {
  outline: none;
}

.pagination-container button:first-child {
  margin-left: 0;
}

.pagination-container button:last-child {
  margin-right: 0;
}

.btnChoice{
  background-color: #006F6E !important;
  color: #FEFDF7 !important;
}
</style>