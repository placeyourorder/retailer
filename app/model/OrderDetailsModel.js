/* 
* @Author: renjithks
* @Date:   2015-07-04 15:34:15
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-08 00:32:05
*/

'use strict';

Ext.define('Pyo.retailer.model.OrderDetailsModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id', 'store_id', 'address', 'total_price', 'phone', 'status', 'created_at', 'line_items'],
    hasMany: {
      model: 'OrderDetailsLineItems',
      name: 'line_items'
    },
    hasOne: {
      model: 'OrderDetailsAddressModel',
      name: 'address'
    },
    proxy: {
      type: 'ajax',
      url: ''
    }
  }
});

Ext.define('OrderDetailsAddressModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['address1', 'city', 'state', 'country', 'zipcode'],
    belongsTo: 'Pyo.retailer.model.OrderDetailsModel'
  }
});

Ext.define('OrderDetailsLineItems', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['item_id', 'name', 'quantity', 'price', 'total_price', 'status', 'variant'],
    belongsTo: 'Pyo.retailer.model.OrderDetailsModel',
    hasOne: {
      model: 'OrderDetailsVariant',
      name: 'variant'
    }
  }
});

Ext.define('OrderDetailsVariant', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id', 'uom', 'quantity'],
    belongsTo: 'OrderDetailsLineItems'
  }
});