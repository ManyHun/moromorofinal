<template>
    <div class="itemInfo">
      <div class="table-container">
        <table class="product-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>비밀번호</th>
              <th>이메일</th>
              <th>핸드폰번호</th>
              <th>버튼</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(a, i) in userList" :key="i">
              <td>
                <input v-model="a.meName" :readonly="!(edit==i)"/>
              </td>
              <td>
                <input type="password" v-model="a.mePassword" :readonly="!(edit==i)"/>
              </td>
              <td>
                <input v-model="a.meEmail" :readonly="!(edit==i)"/>
              </td>
              <td>
                <input v-model="a.mePhone" :readonly="!(edit==i)"/>
              </td>
              <td>
                <button v-if="edit!=i" @click="edit=i">
                  수정
                </button>
                <button v-else @click="okBtn(i)" class="okBtn">
                  확인
                </button>
                <button @click="delBtn(i)">
                  삭제
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    
    
    </div>
    
      </template>
      
      <script>
import axios from 'axios';

      
      export default {
        name: 'cartS',
        // Add your component logic here
        data() {
        return {
          userList: [],
          edit:null,
        };
      },
      mounted() {
    window.scrollTo( 0, 0 ) ;
    this.$emit("mainC" ,2);

    axios.get("http://43.201.181.9:8080/userlist")
    .then(response =>{
      this.userList = response.data;
    })
},
      methods: {
        okBtn(i){
          this.edit = null;
          axios.put("http://43.201.181.9:8080/userUpdate",
          this.userList[i]
          ).then(this.$router.go(0))
        },

        delBtn(i){
          axios.delete("http://43.201.181.9:8080/userDelete?meid="+this.userList[i].memberId)
          .then(this.$router.go(0))
        }

      },
    };
      </script>
      
      <style scoped>
      * {
        margin:0,
      }
      .table-container {
      margin: 20px;
    }
    
    .product-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .product-table th,
    .product-table td {
      padding: 10px;
      border: 1px solid #338C89;
    }
    
    .product-table th {
      background: #338C89;
      color: #fff;
      border: 1px solid #006f6e;
    }
    
    .product-table td input {
      width: 100%;
      padding: 5px;
    }
    
    .product-table td button {
      margin-right: 5px;
      padding: 5px 10px;
      color: #006f6e;
      border: 1px solid #006f6e ;
      border-radius: 3px;
      cursor: pointer;
      background: #FFF;
      transition: color 0.3s;
    }
    
    .product-table td button:hover {
      background-color: #338C89;
      color: #FFF;
    }
    .okBtn{
      background-color: #338C89 !important;
      color: #FFF !important;
    }
      </style>
      
      