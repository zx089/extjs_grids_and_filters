Ext.define('SecondApp.view.citygrid.CityGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'city-grid',

    requires: [
    	'SecondApp.view.citygrid.CityGridModel',
    	'SecondApp.view.citygrid.CityGridController'
    ],

    controller: 'citygrid',
    viewModel: 'citygrid',

    flex: 1,
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
                xtype: 'textfield',
                itemId: 'cityCmb',
                emptyText: 'Город',
                bind: {
                	value: '{filters.name}'
                },
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
                itemId: 'regionCmb',
                bind: {
                	value: '{filters.subject}'
                },
                store: me.getViewModel().getStore('regions_store'),
		        displayField : 'regionName',
		        valueField : 'regionName',
		        queryMode: 'local',
                emptyText: 'Регион',
                editable: false,
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
                itemId: 'populationCmb',
                bind: {
                	value: '{filters.population}'
                },
                emptyText: 'Население',
                padding: '0 0 3 0',
                minValue: 0,
                minValueText: 'Число должно быть положительным',
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
                xtype: 'grid',
                itemId: 'city-grid',
                title: 'Список городов',
                store: me.getViewModel().getStore('paging_store'),
                flex: 1,
                allowDeselect: true,
                columns: {
                	defaults: {
                		flex: 2,
                		border: false
                	},
                	items: [
				        {
				            text: "Город",
				            dataIndex: "name"
				        },
				        {
				            text: "Регион",
				            dataIndex: "subject"
				        },
				        {
				            text: "Население",
				            dataIndex: "population",
				            flex: 1
				        }
				    ]
                },
                dockedItems: [{
			        xtype: 'pagingtoolbar',
			        store: me.getViewModel().getStore('paging_store'),
			        dock: 'bottom',
			        enableOverflow: true
			    }],
            }
        ];

        me.callParent(arguments);
    }
});
