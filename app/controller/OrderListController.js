/* 
 * @Author: renjithks
 * @Date:   2015-06-30 23:42:44
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-07-04 23:46:15
 */

'use strict';

Ext.define('Pyo.retailer.controller.OrderListController', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'stores/:storeId/orders': 'showOrderList'
    },
    refs: {
      orderListView: '#order-list',
      orderItemClick: '#order-list #list'
    },
    control: {
      orderItemClick: {
        itemtap: '_orderItemClicked'
      }
    }
  },

  showOrderList: function(storeId) {
    var view = Ext.create('Pyo.retailer.view.OrderListView');
    Ext.Viewport.setActiveItem(view);

    var url = Pyo.retailer.util.Constants.SERVER_URL + '/stores/' + storeId + '/orders';
    var store = Ext.create('Pyo.retailer.store.OrderListStore');
    store.getProxy().setUrl(url);
    store.load({
      callback: function() {
        view.down('#list').setStore(store);
      }
    });
  },

  _orderItemClicked: function(dataview, index, target, record, e, eOpts) {
    var data = record.data;
    var storeId = data.store_id;
    var orderId = data._id;
    var url = Pyo.retailer.util.Constants.SERVER_URL + '/stores/' + storeId + '/orders/' + orderId;
    this.redirectTo('stores/' + storeId + '/orders/' + orderId);
  }
});