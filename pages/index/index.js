//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    visible:false,
    apps: [
      {
        id : 0,
        name : "成绩查询",
        icon : "../../images/search.png",
        url : "../search/search"
      },
      {
        id: 1,
        name: "密码管理",
        icon: "../../images/password.png",
        url: "../pwd/pwd"
      },
      {
        id:2,
        name: "密码生成",
        icon: "../../images/pwdadd.png",
        url: "../pwdadd/pwdadd"
      },
    ]
  },
  onLoad: function () {
    
  },

  handleOpen() {
    wx.showModal({
      title: '联系方式',
      content: 'tianqingbo@tianqb.cn',
      success(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: 'tianqingbo@tianqb.cn',
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  appHandler(e) {
    // console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
})
