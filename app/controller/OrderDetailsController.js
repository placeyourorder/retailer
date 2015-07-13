/*
 * @Author: renjithks
 * @Date:   2015-07-04 19:33:40
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-07-12 16:35:08
 */

'use strict';

Ext.define('Pyo.retailer.controller.OrderDetailsController', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'stores/:storeId/orders/:orderId': 'showOrderDetails'
    },
    orderDetailsStore: null,
    refs: {
      orderDetailsView: 'order-details',
      orderLineItem: 'order-details #list',
      packButton: 'order-details #pack-button',
      dispatchButton: 'order-details #dispatch-button',
      deliverButton: 'order-details #deliver-button',
      completeButton: 'order-details #complete-button'
    },
    control: {
      orderLineItem: {
        itemtap: '_itemSelected'
      },
      packButton: {
        tap: 'packOrder'
      },
      dispatchButton: {
        tap: 'dispatchOrder'
      },
      deliverButton: {
        tap: 'deliverOrder'
      },
      completeButton: {
        tap: 'completeOrder'
      }
    }
  },

  showOrderDetails: function(storeId, orderId) {
    var me = this;
    var view = Ext.create('Pyo.retailer.view.OrderDetailsView');
    Ext.Viewport.setActiveItem(view);

    var url = Pyo.retailer.util.Constants.SERVER_URL + '/stores/' + storeId + '/orders/' + orderId;
    var store = Ext.create('Pyo.retailer.store.OrderDetailsStore');
    this.setOrderDetailsStore(store);
    store.getProxy().setUrl(url);
    store.load({
      callback: function() {
        view.setData(store);
        me._setOrderAction(store);
      }
    });
  },

  _itemSelected: function(dataView, index, target, record, e, eOpts) {
    if (target.element.hasCls('line-item-selected')) {
      target.element.removeCls('line-item-selected');
    } else {
      target.element.addCls('line-item-selected');
    }
  },

  _setOrderAction: function(store) {
    var order = store.getAt(0);
    var status = order.get('status');
    var view = this.getOrderDetailsView();
    var action = {
      'CREATED': 0,
      'PACKED': 1,
      'DISPATCHED': 2,
      'DELIVERED': 3,
      'COMPLETED': 4
    };
    switch (action[status]) {
      case 0:
        view.down('#pack-button').setHidden(false);
        break;
      case 1:
        view.down('#dispatch-button').setHidden(false);
        break;
      case 2:
        view.down('#deliver-button').setHidden(false);
        break;
      case 3:
        view.down('#complete-button').setHidden(false);
        break;
      default:
        break;
    }
  },

  packOrder: function(button, e, eOpts) {
    var selectedItems = this.getOrderLineItem().getSelection();
    if (selectedItems.length == 0) {
      Ext.Msg.alert('Select items to pick');
      return;
    }
    var me = this;
    var view = this.getOrderDetailsView();
    var store = view.getData();
    var order = store.getAt(0);
    var orderId = order.get('_id');
    var storeId = order.get('store_id');
    var orderToPack = {
      _id: orderId,
      store_id: storeId,
      line_items: []
    };

    _.each(selectedItems, function(item, index) {
      orderToPack.line_items.push({
        _id: item.get('_id')
      });
    });

    Ext.Ajax.request({
      url: Pyo.retailer.util.Constants.SERVER_URL + '/stores/' + storeId + '/orders/' + orderId + '/pack',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      jsonData: orderToPack,
      success: function(conn, response, options, eOpts) {
        // me.getOrderDetailsStore().setData(Ext.decode(conn.responseText));
        // view.setData(me.getOrderDetailsStore());
        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
        var url = 'stores/' + storeId + '/orders/' + orderId;
        me.redirectTo(url);
      },
      failure: function(conn, response, options, eOpts) {

      }
    });
  },

  dispatchOrder: function(button, e, eOpts) {
    var me = this;
    var view = this.getOrderDetailsView();
    var store = view.getData();
    var order = store.getAt(0);
    var orderId = order.get('_id');
    var storeId = order.get('store_id');
    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
    var url = 'stores/' + storeId + '/orders/' + orderId;
    var orderToDispatch = {
      _id: orderId,
      store_id: storeId
    };
    me.redirectTo(url);
    Ext.Ajax.request({
      url: Pyo.retailer.util.Constants.SERVER_URL + '/stores/' + storeId + '/orders/' + orderId + '/dispatch',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      jsonData: orderToDispatch,
      success: function(conn, response, options, eOpts) {
        // me.getOrderDetailsStore().setData(Ext.decode(conn.responseText));
        // view.setData(me.getOrderDetailsStore());
        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
        var url = 'stores/' + storeId + '/orders/' + orderId;
        me.redirectTo(url);
      },
      failure: function(conn, response, options, eOpts) {

      }
    });
  },

  deliverOrder: function(button, e, eOpts) {
    var me = this;
    var view = this.getOrderDetailsView();
    var store = view.getData();
    var order = store.getAt(0);
    var orderId = order.get('_id');
    var storeId = order.get('store_id');
    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
    var url = 'stores/' + storeId + '/orders/' + orderId;
    var orderToDeliver = {
      _id: orderId,
      store_id: storeId
    };
    me.redirectTo(url);
    Ext.Ajax.request({
      url: Pyo.retailer.util.Constants.SERVER_URL + '/stores/' + storeId + '/orders/' + orderId + '/deliver',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      jsonData: orderToDeliver,
      success: function(conn, response, options, eOpts) {
        // me.getOrderDetailsStore().setData(Ext.decode(conn.responseText));
        // view.setData(me.getOrderDetailsStore());
        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
        var url = 'stores/' + storeId + '/orders/' + orderId;
        me.redirectTo(url);
      },
      failure: function(conn, response, options, eOpts) {

      }
    });
  },

  completeOrder: function(button, e, eOpts) {
    var me = this;
    var view = this.getOrderDetailsView();
    var store = view.getData();
    var order = store.getAt(0);
    var orderId = order.get('_id');
    var storeId = order.get('store_id');
    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
    var url = 'stores/' + storeId + '/orders/' + orderId;
    var orderToComplete = {
      _id: orderId,
      store_id: storeId
    };
    me.redirectTo(url);
    Ext.Ajax.request({
      url: Pyo.retailer.util.Constants.SERVER_URL + '/stores/' + storeId + '/orders/' + orderId + '/complete',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      jsonData: orderToComplete,
      success: function(conn, response, options, eOpts) {
        // me.getOrderDetailsStore().setData(Ext.decode(conn.responseText));
        // view.setData(me.getOrderDetailsStore());
        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
        var url = 'stores/' + storeId + '/orders/' + orderId;
        me.redirectTo(url);
      },
      failure: function(conn, response, options, eOpts) {

      }
    });
  }
});