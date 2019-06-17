Ext.define('SecondApp.view.streetgrid.StreetGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'street-grid',

    requires: [
        'SecondApp.view.streetgrid.StreetGridController',
        'SecondApp.view.streetgrid.StreetGridModel',
        'SecondApp.view.streetgrid.addstreetwindow.AddStreetWindow'
    ],

    controller: 'streetgrid',
    viewModel: 'streetgrid',

    flex: 3,
    padding: 5,
    border: false,
    region: 'west',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        me.items = [
        	{
                xtype: 'panel',
                border: false,
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'streetName',
                        emptyText: 'Название улицы',
                        bind: {
                            value: '{filters.street}'
                        },
                        flex: 1,
                        padding: '0 5 5 0',
                        triggers: {
                            clear: {
                                cls: 'x-form-clear-trigger',
                                handler: function(){
                                    this.reset();
                                    this.focus();
                                }
                            }
                        }
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'companyName',
                        emptyText: 'Ответственная компания',
                        bind: {
                            value: '{filters.company}'
                        },
                        displayField : 'company',
                        valueField : 'company',
                        queryMode: 'local',
                        flex: 1,
                        padding: '0 5 5 5',
                        triggers: {
                            clear: {
                                cls: 'x-form-clear-trigger',
                                handler: function(){
                                    this.reset();
                                    this.focus();
                                }
                            }
                        },
                        store: me.getViewModel().getStore('companies_store')
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'housesNumber',
                        emptyText: 'Кол-во домов',
                        bind: {
                            value: '{filters.houses}'
                        },
                        flex: 1,
                        padding: '0 0 5 5',
                        triggers: {
                            clear: {
                                cls: 'x-form-clear-trigger',
                                handler: function(){
                                    this.reset();
                                    this.focus();
                                }
                            }
                        }
                    },
                ]
            },
            {
                xtype: 'panel',
                border: false,
                layout: {
                    type: 'hbox'
                },
                items: [
                    { 
                        xtype: 'tbfill' 
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'minPop',
                        emptyText: 'Мин население',
                        bind: {
                            value: '{filters.pop.minPop}'
                        },
                        minValue: 0,
                        flex: 1,
                        padding: '5 5 10 0',
                        triggers: {
                            clear: {
                                cls: 'x-form-clear-trigger',
                                handler: function(){
                                    this.reset();
                                    this.focus();
                                }
                            }
                        }
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'maxPop',
                        bind: {
                            value: '{filters.pop.maxPop}'
                        },
                        emptyText: 'Макс население',
                        flex: 1,
                        minValue: 0,
                        padding: '5 0 10 5',
                        triggers: {
                            clear: {
                                cls: 'x-form-clear-trigger',
                                handler: function(){
                                    this.reset();
                                    this.focus();
                                }
                            }
                        }
                    },
                    { 
                        xtype: 'tbfill' 
                    }
                ]
            },
            {
                xtype: 'grid',
                itemId: 'streets-grid',
                title: 'Список улиц',
                tbar: [
                    { 
                        xtype: 'tbfill' 
                    },
                    { 
                        xtype: 'button',
                        itemId: 'addStreetButton', 
                        text: 'Добавить улицу',
                    }
                ],
                flex: 1,
                store: me.getViewModel().getStore('street_store'),
                columns: {
                    defaults: {
                        flex: 2,
                        border: false
                    },
                    items: [
                        {
                            text: "Улица",
                            flex: 3,
                            dataIndex: "street"
                        },
                        {
                            text: "Ответственная компания",
                            flex: 3,
                            dataIndex: "company"
                        },
                        {
                            text: "Кол-во домов",
                            dataIndex: "houses"
                        },
                        {
                            text: "Население",
                            dataIndex: "population",
                            renderer: function(value) {
                                if (value) {
                                    return '~' + value;
                                }
                            }
                        },
                        {
                            xtype:'actioncolumn',
                            flex: 1,
                            items: [
                                {
                                    iconCls: 'x-fa fa-times',
                                    tooltip: 'Удалить улицу',
                                    handler: function(grid, rowIndex, colIndex) {
                                        var rec = grid.getStore().getAt(rowIndex);
                                        Ext.Msg.confirm('','Данная улица будет удалена. Продолжить?', function(buttonId) {
                                            if (buttonId == 'yes') {
                                                grid.getStore().remove(rec);
                                            }
                                        });
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
        ];

        me.callParent(arguments);
    }
});