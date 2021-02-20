import http from '/utils/http'

// 登录
function test(params){
  return http.post(`users/login`,params)
}

export default{
  test
}
