/* 
* @Author: renjithks
* @Date:   2015-07-04 16:06:19
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-04 16:07:04
*/

'use strict';

Ext.define('Pyo.retailer.store.OrderDetailsStore', {
  extend: 'Ext.data.Store',
  config: {
    model: 'Pyo.retailer.model.OrderDetailsModel',
    proxy: {
      type: 'ajax',
      url: ''
    }
  }
});