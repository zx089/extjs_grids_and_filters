Ext.define('SecondApp.view.citygrid.CityGridModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.citygrid',

    data: {
    	filters: {
    		name: null,
    		subject: null,
    		population: null
    	}
    },

    initConfig: function(instanceConfig) {
	    var me = this,
	        config = {
	            stores: {
			        city_store: {
			            autoLoad: false,
			            enablePaging: true,
			            proxy: {
					        type: 'ajax',
					        url: '/get_cities',
					        reader: {
					            type: 'json',
					            rootProperty: 'data',
					            totalProperty: 'totalCount'
					        }
					    },
					    fields: [
			                {name: 'subject', type: 'string'},
			                {name: 'population', type: 'string'},
			                {name: 'name', type: 'string'}
			            ],
			            listeners: {
				            load: function () {
				            	var pagingStore = me.getStore('paging_store'),
				            		cityStore = me.getStore('city_store');
				                pagingStore.getProxy().setData(cityStore.getRange());
				                pagingStore.load();
				            }
				        }
			        },
			        paging_store: {
			        	proxy: {
				            type: 'memory',
				            enablePaging: true,
				            reader: {
				                totalProperty: 'totalCount'
				            }
				        },
				        pageSize: 20
			        },
			        regions_store: {
			        	autoLoad: false,
			        	fields: ['regionName']
			        }
			    }
	        };
	    if (instanceConfig) {
	        me.getConfigurator().merge(me, config, instanceConfig);
	    }
	    return me.callParent([config]);
	}
});