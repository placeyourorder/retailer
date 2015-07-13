/* 
 * @Author: renjithks
 * @Date:   2015-07-04 20:05:15
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-07-12 16:06:10
 */

'use strict';

Ext.define('Pyo.retailer.view.OrderDetailsView', {
  extend: 'Ext.Panel',
  alias: 'widget.order-details',
  requires: [
    'Ext.TitleBar',
    'Ext.dataview.component.DataItem'
  ],
  config: {
    id: 'order-details',
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'titlebar',
      docked: 'top',
      ui: 'light',
      title: 'Order details'
    }, {
      layout: 'hbox',
      padding: 15,
      items: [{
        xtype: 'label',
        itemId: 'orderStatus',
        tpl: '{status}',
        flex: 1
      }, {
        xtype: 'label',
        itemId: 'orderTotal',
        tpl: 'Rs {total_price}',
        flex: 1
      }]
    }, {
      xtype: 'titlebar',
      titleAlign: 'left',
      height: 5,
      title: 'Items'
    }, {
      xtype: 'dataview',
      itemId: 'list',
      defaultType: 'orderItemListDataView',
      useComponents: true,
      height: '100%',
      width: '100%'
    }, {
      xtype: 'titlebar',
      docked: 'bottom',
      ui: 'light',
      title: '',
      items: [{
        itemId: 'pack-button',
        xtype: 'button',
        text: 'Pack',
        align: 'right',
        hidden: true
      }, {
        itemId: 'dispatch-button',
        xtype: 'button',
        text: 'Dispatch',
        align: 'right',
        hidden: true
      }, {
        itemId: 'deliver-button',
        xtype: 'button',
        text: 'Deliver',
        align: 'right',
        hidden: true
      }, {
        itemId: 'complete-button',
        xtype: 'button',
        text: 'Complete',
        align: 'right',
        hidden: true
      }]
    }]
  },

  // initialize: function() {
  //   var me = this;
  //   me.on('updatedata', function(obj, data, eOpts) {
  //     me.down('#list').setData(data.data.items[0].data.line_items);
  //     me.down('#orderStatus').setData(data.data.items[0].data);
  //     me.down('#orderTotal').setData(data.data.items[0].data);
  //   });
  // }

  updateData: function(data) {
//    this.callParent(arguments);
    var me = this;
    me.down('#list').setData(data.data.items[0].data.line_items);
    me.down('#orderStatus').setData(data.data.items[0].data);
    me.down('#orderTotal').setData(data.data.items[0].data);
  }
});

Ext.define('OrderItemListDataView', {
  extend: 'Ext.dataview.component.DataItem',
  alias: 'widget.orderItemListDataView',
  requires: [
    'Ext.Label',
    'Ext.data.reader.Array'
  ],
  config: {
    padding: 10,
    layout: {
      type: 'hbox'
    },
    defaults: {
      margin: 10
    },
    style: 'font-size:12px',
    items: [{
      xtype: 'label',
      itemId: 'name',
      flex: 2
    }, {
      xtype: 'label',
      itemId: 'variant',
      flex: 1
    }, {
      xtype: 'label',
      itemId: 'price',
      flex: 1
    }, {
      xtype: 'label',
      itemId: 'status',
      flex: 2
    }, {
      xtype: 'label',
      itemId: 'quantity',
      flex: 1
    }, {
      xtype: 'label',
      itemId: 'total_price',
      flex: 1
    }]
  },
  updateRecord: function(record) {
    //this.callParent(arguments);
    var me = this;
    if(me.down('#name')) {
      me.down('#name').setHtml(record.get('name'));
      me.down('#status').setHtml(record.get('status'));
      me.down('#quantity').setHtml(record.get('quantity'));
      me.down('#total_price').setHtml('Rs ' + record.get('total_price'));
      me.down('#price').setHtml('Rs ' + record.get('variant').price);
      me.down('#variant').setHtml(record.get('variant').quantity + ' ' + record.get('variant').uom);
    }
  }
});