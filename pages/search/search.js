// pages/search/search.js
const {
  $Message
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuNum: "",
    pwd: "",
    result: null,
    visible: false,
    actions: null,
    resultFlag: false,
    loadingFlag: false,
    typeFlag: -1,
    school: null,
    currentSchool: null,
    currentXueNian: null,
    currentXueQi: null,
    xuenian: null,
    notice: "1. 本功能仅支持使用新版正方管理系统的学校;2. 若您的学校使用新版正方管理系统，请通过邮箱发送如下格式内容：学校：西安邮电大学。我们会在后续添加你的学校;3. 无成绩信息可能有以下原因：未进行教师评价、学号或者密码错误、学年条件选择错误、学校成绩系统关闭或服务出现故障；4. 联系邮箱：tianqingbo@tianqb.cn",
    xueqi: [{
        name: "第一学期",
        value: 3
      },
      {
        name: "第二学期",
        value: 12
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadSchool();
    this.loadXueNian();
    this.setData({
      currentXueQi: this.data.xueqi[0]
    })
  },

  searchHandler() {
    var that = this;
    var stuNum = this.data.stuNum;
    var pwd = this.data.pwd;
    if (stuNum.trim() == "" || pwd.trim() == "") {
      // console.log(1)
      $Message({
        content: '学号与密码不能为空',
        type: 'warning'
      });
      return;
    }

    this.setData({
      loadingFlag: true,
      resultFlag: false
    })

    var school = this.data.currentSchool.id;
    var xuenian = this.data.currentXueNian.value;
    var xueqi = this.data.currentXueQi.value;

    var data = {
      school: school,
      xuenian: xuenian,
      xueqi: xueqi,
      stuNum: stuNum,
      pwd: pwd
    }

    console.log(data)
    // return;

    wx.request({
      url: 'https://tianqb.cn/wx/score/list/score',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: data,
      success(res) {
        console.log(res)
        if (res.data.status == "success") {
          $Message({
            content: "查询成功",
            type: 'success'
          });
          that.setData({
            resultFlag: true,
            result: res.data.t
          })

          console.log(res.data.t)
          console.log(that.data.result)
        } else {
          $Message({
            content: res.data.msg,
            type: 'warning'
          });
        }
      },
      fail(err) {
        $Message({
          content: '发生了一个错误，请稍后再试',
          type: 'error'
        });
      },
      complete() {
        that.setData({
          loadingFlag: false
        })
      }
    })
  },

  inputHandler(e) {
    // console.log(e)
    var type = e.currentTarget.dataset.type;
    var data = {};
    data[type] = e.detail.detail.value;
    this.setData(data);
  },

  loadSchool() {
    var that = this;
    wx.request({
      url: 'https://tianqb.cn/wx/score/list/school',
      method: "GET",
      success(res) {
        console.log(res.data.t)
        that.setData({
          school: res.data.t,
          currentSchool: res.data.t[0]
        })
      }
    })
  },

  loadXueNian() {
    var date = new Date();
    var year = date.getFullYear();
    console.log(year)
    var data = [];
    for (var i = 0; i < 5; i++) {
      data.push({
        name: year + "-" + (year + 1),
        value: year
      });
      year--;
    }
    console.log(data)
    this.setData({
      xuenian: data,
      currentXueNian: data[0]
    })
  },

  schoolHandler() {
    // console.log(1)
    this.setData({
      actions: this.data.school,
      visible: true,
      typeFlag: 0
    });
  },

  handleCancel() {
    this.setData({
      visible: false
    });
  },

  handleClickItem({
    detail
  }) {
    const index = detail.index;
    if (this.data.typeFlag == 0) {
      // 学校
      this.setData({
        currentSchool: this.data.school[index]
      })
    } else if (this.data.typeFlag == 1) {
      // 学年
      this.setData({
        currentXueNian: this.data.xuenian[index]
      })
    } else {
      // 学期
      this.setData({
        currentXueQi: this.data.xueqi[index]
      })
    }
    this.setData({
      visible: false
    })
  },

  xuenianHandler() {
    this.setData({
      actions: this.data.xuenian,
      visible: true,
      typeFlag: 1
    });
  },

  xueqiHandler() {
    this.setData({
      actions: this.data.xueqi,
      visible: true,
      typeFlag: 2
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

  }
})