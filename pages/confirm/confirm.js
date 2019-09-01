// pages/confirm/confirm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 统计商品数量和价格
    orderCount: {
      num: 0,
      money: 0
    },
    bottomFlag: false,

    //提交的订单
    orders: true,
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;

    // 取出订单传过来的数据
    wx.getStorage({
      key: 'orders',
      success: function(res) {
        that.setData({
          items: res.data
        });

        //价格统计汇总
        let money = 0;
        let num = res.data.length;
        res.data.forEach(item => {
          money += (item.price * item.num) //总价求和
        });

        let orderCount = {
          num,
          money
        }

        //设置显示对应的总数和全部价钱
        that.setData({
          orderCount
        });
      },
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

  /**
   * 点击对应菜单删除按钮
   */
  del: function(event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];

    if (param.num > 0) {
      param.num--;
    } else {
      param.num = 0;
    }

    // 改变删除按钮的状态
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });

    let money = 0;
    let num = 0;

    this.data.items.forEach(item => {
      money += item.price * item.num
      num += item.num
    });

    let orderCount = {
      num,
      money
    }

    // 设置显示对应的总数和全部钱数
    this.setData({
      orderCount
    });
  },

  /**
   * 点击对应菜单的添加按钮
   */
  add: function(event) {
    let that = this
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    let subOrders = [];
    param.num++;
    console.log(param);

    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });

    let money = 0;
    let num = 0;

    //将已确定总价和数量求和
    this.data.items.forEach(item => {
      money += item.price * item.num;
      num += item.num;
    });

    let orderCount = {
      num,
      money
    }

    // 设置显示对应的总书和全部价钱
    this.setData({
      orderCount
    });
  },

  /**
   * 支付按钮
   */
  pay: function() {
    let that = this;
    let str = '选中' + that.data.orderCount.num + '件商品，共' + that.data.orderCount.money + '元，是否要支付'

    wx.showModal({
      title: '提示',
      content: str,
      success: function(res) {
        // 至少选中一种商品才能支付
        if (that.data.orderCount.num !== 0) {
          if (res.confirm) {
            //打开扫码功能
            wx.scanCode({
              onlyFromCamera: true,
              success: (res) => {
                wx.redirectTo({
                  url: '../pay/pay',
                })
              }
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        } else {
          wx.showToast({
            title: '您未选中任何商品',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})