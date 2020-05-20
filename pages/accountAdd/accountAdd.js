// pages/accountAdd/accountAdd.js
const salt = 89;
const {
  $Message
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    account: "",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  inputHandler(e){
    console.log(e)
    var type = e.currentTarget.dataset.type;
    var data = {};
    data[type] = e.detail.detail.value;
    this.setData(data);
  },


  addHandler() {
    // debugger
    var name = this.data.name.trim();
    var account = this.data.account.trim();
    var password = this.data.password.trim();

    if (name == "" || account == "" || password == "") {
      $Message({
        content: '存在未填项！',
        type: 'warning'
      });
      return;
    }

    password = this.encode(password, salt);

    var data = {
      logo: "../../images/account.png",
      name: name,
      account: account,
      password: password
    }

    wx.getStorage({
      key: 'accountInfo',
      success: function(res) {
        var account = res.data;
        account.push(data);
        wx.setStorageSync("accountInfo", account);
        wx.navigateBack({

        })
      },
      fail(err) {
        var temp = []
        temp.push(data)
        wx.setStorageSync("accountInfo", temp);
        wx.navigateBack({

        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  encode(str_json, salt) {
    var str_data = str_json.toString();
    var str_arr_data = [];
    for (var i in str_data) {
      str_arr_data[i] = str_data.charCodeAt(i) + salt;
    }
    str_data = str_arr_data.toString();
    return str_data;
  },
})