import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      login: sessionStorage.getItem('login') === 'true',
      userData: JSON.parse(sessionStorage.getItem('userData') || 'null'),
      admin: sessionStorage.getItem('admin') === 'true' // 초기값은 sessionStorage에서 가져오기
    }
  },
  mutations: {
    login(state) {
      state.login = true
      sessionStorage.setItem('login', 'true')
    },
    logout(state) {
      state.login = false
      state.userData = null
      sessionStorage.removeItem('login')
      sessionStorage.removeItem('userData')
      state.admin = false
      sessionStorage.removeItem('admin') // admin 상태도 삭제
    },
    userData(state, data) {
      state.userData = data
      sessionStorage.setItem('userData', JSON.stringify(data))
      console.log(state.userData[0].meDivision);
      if (state.userData[0].meDivision == '관리자') {
        state.admin = true
        sessionStorage.setItem('admin', 'true') // 관리자인 경우 sessionStorage에 설정
      } else {
        state.admin = false
        sessionStorage.removeItem('admin') // 관리자가 아닌 경우 sessionStorage에서 삭제
      }
    }
  }
})

export default store



// import { createStore } from 'vuex'

// const store = createStore({
//   state() {
//     return {
//       login: localStorage.getItem('login') === 'true',
//       userData: JSON.parse(localStorage.getItem('userData') || 'null'),
//       admin: localStorage.getItem('admin') === 'true'
//     }
//   },
//   mutations: {
//     login(state) {
//       state.login = true
//       localStorage.setItem('login', 'true')
//     },
//     logout(state) {
//       state.login = false
//       state.userData = null
//       localStorage.removeItem('login')
//       localStorage.removeItem('userData')
//       state.admin = false
//       localStorage.removeItem('admin')
//     },
//     userData(state, data) {
//       state.userData = data
//       localStorage.setItem('userData', JSON.stringify(data))
//       console.log(state.userData[0].meDivision);
//       if (state.userData[0].meDivision == '관리자') {
//         state.admin = true
//         localStorage.setItem('admin', 'true')
//       } else {
//         state.admin = false
//         localStorage.removeItem('admin')
//       }
//     }
//   }
// })

// export default store