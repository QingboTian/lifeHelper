// pages/pwdadd/pwdadd.js
const {
  $Message
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultFlag: false,
    result: "",
    character: [{
      id: 1,
      name: 'A-Z',
    }, {
      id: 2,
      name: 'a-z'
    }, {
      id: 3,
      name: '0-9'
    }, {
      id: 4,
      name: '!@#',
    }],
    index: 5,
    current: ['A-Z', '0-9'],
    position: 'right',
    checked: false,
    disabled: false,
    length: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  generalHandler() {
    var current = this.data.current;
    if (current.length == 0) {
      $Message({
        content: '字符集为空，请选择字符集',
        type: 'warning'
      });
      return;
    }

    this.generate();

    $Message({
      content: '密码生成成功，点击结果即可复制',
      type: 'success'
    });
  },

  generate: function() {
    var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"] //0
    var lowerCase = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "m", "n", "b", "v", "c", "x", "z"] //1
    var num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] //2
    var char = ["@", "#", "$", "%", "&", "*", "_", "+", "-"] //3

    // 判断所用字符集
    var charArr = this.data.character
    var current = this.data.current
    var arrList = [] // 合并后的数组
    var arrindex = [] // 所用字符集
    var password = "";
    for (var i = 0; i < current.length; i++) {
      if (current[i] == "A-Z") {
        arrindex.push(0)
      } else if (current[i] == "a-z") {
        arrindex.push(1)
      } else if (current[i] == "0-9") {
        arrindex.push(2)
      } else if (current[i] == "!@#") {
        arrindex.push(3)
      }
    }

    // 合并数组
    for (var i = 0; i < arrindex.length; i++) {
      if (arrindex[i] == 0) {
        for (var j = 0; j < upperCase.length; j++) {
          arrList.push(upperCase[j])
        }
      } else if (arrindex[i] == 1) {
        for (var j = 0; j < lowerCase.length; j++) {
          arrList.push(lowerCase[j])
        }
      } else if (arrindex[i] == 2) {
        for (var j = 0; j < num.length; j++) {
          arrList.push(num[j])
        }
      } else if (arrindex[i] == 3) {
        for (var j = 0; j < char.length; j++) {
          arrList.push(char[j])
        }
      }
    }

    // 获取生成的位数
    var length = this.data.length[this.data.index]
    // 生成密码
    for (var i = 0; i < length; i++) {
      var random = this.randomNum(0, arrList.length - 1)
      password = password + arrList[random] + ""
    }


    // 设置密码
    this.setData({
      result: password,
      resultFlag: true
    })
  },

  copy: function () {
    var result = this.data.result
    wx.setClipboardData({
      data: result,
    })
  },

  randomNum: function(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  },

  bindPickerChange(e) {
    var index = e.detail.value
    this.setData({
      index: index
    })
  },

  handleFruitChange({
    detail = {}
  }) {
    const index = this.data.current.indexOf(detail.value);
    index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
    this.setData({
      current: this.data.current
    });
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

  }
})