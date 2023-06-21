<template>
  <!-- <div>
    <div>상품카테고리 선택하세요</div>
    <select v-model="category">
      <option v-for="(a) in menu" :key="a">{{a.url}}</option>
    </select>
    
    <div>상품이미지메인</div>
    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" @change="mainImgUpload"/>
    
    <div>서브이미지</div>
    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" @change="subImgUpload"/>

    <div>가격을 입력하세용</div>
    <input v-model="price" type="number">

    <div>재고입력해용</div>
    <input v-model="stock" type="number">

    <div>상품의 설명을 쓰셔요</div>
    <textarea v-model="explanation" cols="50" rows="5"></textarea>

    <div>상품이름넣어라</div>
    <input v-model="pr_name" type="text">

    <button @click="productSave">디비에에 저장~</button>
  </div> -->

  <div class="form-container">
    <div>상품카테고리 선택하세요</div>
    <select v-model="category">
      <option v-for="a in menu" :key="a">{{ a.url }}</option>
    </select>
    
    <div>상품이미지메인</div>
    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" @change="mainImgUpload" />
    
    <div>서브이미지</div>
    <input type="file" name="filename" accept="image/gif, image/jpeg, image/png" @change="subImgUpload" />

    <div>가격을 입력하세요</div>
    <input v-model="price" type="number">

    <div>재고를 입력하세요</div>
    <input v-model="stock" type="number">

    <div>상품의 설명을 쓰세요</div>
    <textarea v-model="explanation" cols="50" rows="5"></textarea>

    <div>상품 이름을 적어주세요</div>
    <input v-model="pr_name" type="text">

    <button @click="productSave">저장</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
name:'adminAll',
data() {
    return {
      mainImg:null,
    subImg:null,
    menu:[
        {"url":"카테고리를 선택하세요"},
        {"vue":"CLOCKS","url":"clock"},
        {"vue":"GOODS","url":"goods"},
        {"vue":"BOOKS","url":"book"},
        {"vue":"SAKE","url":"sake"},
        {"vue":"TAMAGOTCHI","url":"tamagotchi"}],

        mainImgName: null,
        subImgName: null,
        category: null,
        price: null,
        stock: null,
        explanation: null,
        pr_name: null,

    }
},
mounted() {
    window.scrollTo( 0, 0 ) ;
    this.$emit("mainC" ,2);
},
methods: {
  

  mainImgUpload(event){
    this.mainImg = event.target.files[0];
  },
  subImgUpload(event){
    this.subImg = event.target.files[0];
  },
  productSave(){

    if(this.mainImg != null){
      const formData = new FormData();
      formData.append('file', this.mainImg);

      axios.post('http://43.201.181.9:8080/productImg', formData)
      .then(response =>{
        this.mainImgName = response.data
        if(this.subImg == null){
          console.log("이미지 하나만 업로드");
          this.productDbSave();
          
        }
      })
    }
    if(this.subImg != null){
      const formData = new FormData();
      formData.append('file', this.subImg);

      axios.post('http://43.201.181.9:8080/productImg', formData)
      .then(response =>{
        this.subImgName = response.data
      })
      console.log("이미지 두개 업로드");
      this.productDbSave();
    }
  },

  productDbSave(){
    setTimeout(() => {
      axios.post("http://43.201.181.9:8080/Productsave",
    {
        "pr_name": this.pr_name,
        "mainimage": this.mainImgName,
        "serveimage": this.subImgName,
        "price": this.price,
        "stock": this.stock,
        "category": this.category,
        "explanation": this.explanation,
        "star": 0,
        "totalsales": 0
    }).then(response => {
      console.log(response);
    })
    alert("등록 됐습니다");
    this.$router.go(0)
    }, 800);

  }





  // handleFileUpload(event) {
  //     this.file = event.target.files[0];
  //   },
  //   uploadFile() { 
  //     const formData = new FormData();
  //     formData.append('file', this.file);

  //     axios.post('http://43.201.181.9:8080/productImg', formData)
  //       .then(response => {
  //         // 파일 업로드 성공 시  동작
  //         console.log(response)
  //       })
  //       .catch(error => {
  //         // 파일 업로드 실패 시 동작
  //         console.log(error);
  //       });
  //   }
},
}
</script>

<style scoped>
.form-container {
  margin: 20px;
  padding: 20px;
  border: 2px solid #006F6E;
  border-radius: 5px;
  background-color: #fff;
}

.form-container > div {
  margin: 15px 0;
}

.form-container select,
.form-container input[type="file"],
.form-container input[type="number"],
.form-container textarea {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.form-container button {
  padding: 10px 30px;
  margin-left: 15px;
  color: #006f6e;
  border: 1px solid #006f6e ;
  border-radius: 3px;
  cursor: pointer;
  background: #FFF;
  transition: color 0.3s;
}

.form-container button:hover {
  background-color: #338C89;
  color: #FFF;


}
</style>