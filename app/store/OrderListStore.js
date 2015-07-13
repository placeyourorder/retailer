/*
* @Author: renjithks
* @Date:   2015-06-30 23:54:50
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-04 16:05:53
*/

'use strict';

Ext.define('Pyo.retailer.store.OrderListStore', {
  extend: 'Ext.data.Store',
  config: {
    model: 'Pyo.retailer.model.OrderListModel',
    proxy: {
      type: 'ajax',
      url: ''
    }
  }
});