// pages/pwd/pwd.js
const salt = 89;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: "涉及金钱、敏感数据的帐号请谨慎存储，建议不要通过此方式进行管理，如支付宝、银行等帐号信息！小程序目前的本地数据存储支持的一般，存在一些不稳定因素",
    info: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },

  showHandler(e) {
    // console.log()
    var index = e.currentTarget.dataset.index;
    var data = this.data.info;
    var password = data[index].password;
    var pwd = this.decode(password, -salt);
    wx.showModal({
      title: '当前密码',
      content: pwd,
      success(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: pwd,
          })
        }
      }
    })
  },

  deleteHandler(e) {
    var index = e.currentTarget.dataset.index;
    var data = this.data.info;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该帐号',
      success(res) {
        if (res.confirm) {
          console.log(index)
          data.splice(index, 1);
          console.log(data)
          that.setData({
            info: data
          })
          wx.setStorage({
            key: 'accountInfo',
            data: data,
          })
        } else if (res.cancel) {}
      }
    })

  },

  addHandler() {
    wx.navigateTo({
      url: '../accountAdd/accountAdd',
    })
  },


  loadAccount() {
    var that = this;
    wx.getStorage({
      key: 'accountInfo',
      success: function(res) {
        that.setData({
          info: res.data
        })
      },
      fail(err) {
        console.log(err)
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
    this.loadAccount();
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

  decode(str_json, salt) {
    var str_data = str_json.toString();
    var res = "";
    var res_state = false;
    str_data = str_data.split(/\,/);
    for (var i in str_data) {
      str_data[i] = str_data[i].replace(/[\[|\]|\"|\']/g, '');
    }
    for (var i in str_data) {
      str_data[i] = Number(str_data[i]);
    }
    for (var i in str_data) {
      res += String.fromCharCode(str_data[i] + salt);
    }
    return res;
  }

})