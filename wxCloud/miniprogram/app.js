//app.js
App({
  onLaunch:function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'wxcloud-kj8k3',
        traceUser: true
      })
      wx.cloud.callFunction({
        name: 'token',
        success: function (res) {
          console.log("getAccessToken  result")
          console.log(res.result) 
        },
        fail: console.error
      })
    }
  }
})
