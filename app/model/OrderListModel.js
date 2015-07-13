/*
 * @Author: renjithks
 * @Date:   2015-07-01 00:02:01
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-07-04 14:56:46
 */

'use strict';

Ext.define('Pyo.retailer.model.OrderListModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id', 'store_id', 'status', 'created_at', 'updated_at', 'total_price']
  }
});