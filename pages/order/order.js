// pages/order/order.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    // 统计商品数量和价格
    orderCount: {
      num: 0,
      money: 0,
    },
    bottomFlag: false,
    // 提交订单
    orders: true,
    menus: [{
      id: 1,
      menu: '蔬菜'
    }, {
      id: 2,
      menu: '荤菜'
    }, {
      id: 3,
      menu: '酒水',
    }, {
      id: 4,
      menu: '主食'
    }],

    // 商品类
    items: [{
      id: 1001,
      type: 1,
      title: '娃娃菜0',
      price: 15,
      active: false,
      num: 1
    }, {
      id: 1002,
      type: 1,
      title: '娃娃菜1',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 1003,
      type: 1,
      title: '娃娃菜2',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 1004,
      type: 1,
      title: '娃娃菜3',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 2005,
      type: 2,
      title: '肉1',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 2006,
      type: 2,
      title: '肉2',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 2007,
      type: 2,
      title: '肉3',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 2008,
      type: 2,
      title: '肉4',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 2009,
      type: 2,
      title: '肉5',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 3001,
      type: 3,
      title: '酒水1',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 3002,
      type: 3,
      title: '酒水1',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 3003,
      type: 3,
      title: '酒水2',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 3004,
      type: 3,
      title: '酒水3',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 3004,
      type: 3,
      title: '酒水4',
      price: 14,
      active: false,
      num: 1
    }, {
      id: 3005,
      type: 3,
      title: '酒水5',
      price: 15,
      active: false,
      num: 1
    }, {
      id: 4001,
      type: 4,
      title: '主食1',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 4002,
      type: 4,
      title: '主食2',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 4003,
      type: 4,
      title: '主食3',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 4004,
      type: 4,
      title: '主食4',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 4005,
      type: 4,
      title: '主食5',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 4006,
      type: 5,
      title: '主食6',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 4007,
      type: 4,
      title: '主食7',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 4008,
      type: 4,
      title: '主食8',
      price: 12,
      active: false,
      num: 1
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    setTimeout(() => {
      wx.showToast({
        title: '菜单更新成功',
        icon: 'success',
        duration: 500
      })
    });
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
   * 选择不同的种类
   */
  tabMenu: function(event) {
    let index = event.target.dataset.index
    this.setData({
      tabIndex: index
    });
  },

  /**
   * 点击购物车去结账
   */
  card: function() {
    let that = this;

    if (that.data.orderCount.num != 0) {
      //跳转到购物车订单页
      wx.navigateTo({
        url: '../confirm/confirm',
      });
    } else {
      wx.showToast({
        title: '您未选商品，无法下单',
        icon: 'none',
        duration: 10000
      })
    }
  },

  /**
   * 下单操作
   */
  addOrder: function(event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];

    // 购物单列表存储数据
    let subOrders = [];
    param.active ? param.active = false : param.active = true;

    //改变按钮的状态
    this.data.items.splice(index, 1, param);
    this.setData({
      items: this.data.items
    });

    //将已经确定的菜单添加到购物单列表
    this.data.items.forEach(item => {
      if (item.active) {
        subOrders.push(item);
      }
    });

    //判断底部提交菜单显示隐藏
    if (subOrders.length == 0) {
      that.setData({
        bottomFlag: false
      });
    } else {
      that.setData({
        bottomFlag: true
      });
    }

    let money = 0;
    let num = subOrders.length;
    subOrders.forEach(item => {
      money += item.price;
    });
    let orderCount = {
      num,
      money
    }

    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });

    // 将选中的商品存储到本地
    wx.setStorage({
      key: 'orders',
      data: subOrders,
    })
  }
})