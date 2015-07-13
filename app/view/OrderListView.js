/* 
 * @Author: renjithks
 * @Date:   2015-07-01 00:21:55
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-07-10 23:55:34
 */

'use strict';

Ext.define('Pyo.retailer.view.OrderListView', {
  extend: 'Ext.Panel',
  alias: 'widget.order-list',
  requires: [
    'Ext.TitleBar',
    'Ext.dataview.List'
  ],
  config: {
    id: 'order-list',
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'titlebar',
      docked: 'top',
      ui: 'light',
      title: 'List of Orders',
    }, {
      xtype: 'list',
      itemId: 'list',
      height: '100%',
      width: '100%',
      style: 'font-size:12px',
      itemTpl: new Ext.XTemplate('<div style="display:-webkit-box"><div style="width:30%;overflow:hidden">{_id}</div>',
        '<div style="width:30%">{status}</div>',
        '<div style="width:30%">{[this.formatDate(values.created_at)]}</div>',
        '<div style="width:10%">Rs {total_price}</div>',
        '</div>',
        {
          formatDate: function(date) {
            return (new Date(date)).toLocaleString();
          }
        }),
      sorters: 'updated_at'
    }]
  }
});