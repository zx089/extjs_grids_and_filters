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
			      //       proxy: {
					    //     type: 'ajax',
					    //     url: '/get_cities',
					    //     reader: {
					    //         type: 'json',
					    //         rootProperty: 'data',
					    //         totalProperty: 'totalCount'
					    //     }
					    // },
					    fields: [
			                {name: 'subject', type: 'string'},
			                {name: 'population', type: 'string'},
			                {name: 'name', type: 'string'}
			            ],
			            data: [
			            	['Москва', 140000, 'Москва'],
			            	['Москва', 14000, 'Москва'],
			            	['Москва', 1400, 'Москва'],
			            	['Москва', 140, 'Москва'],
			            	['Москва', 14, 'Москва'],
			            	['Москва', 1, 'Москва'],
			            	['Ленинградская', 700000, 'Санкт-Петербург'],
			            	['Ленинградская', 70000, 'Санкт-Петербург'],
			            	['Ленинградская', 7000, 'Санкт-Петербург'],
			            	['Ленинградская', 700, 'Санкт-Петербург'],
			            	['Ленинградская', 70, 'Санкт-Петербург'],
			            	['Ленинградская', 7, 'Санкт-Петербург'],
			            	['Мурманская', 500000, 'Мурманск'],
			            	['Мурманская', 50000, 'Мурманск'],
			            	['Мурманская', 5000, 'Мурманск'],
			            	['Мурманская', 500, 'Мурманск'],
			            	['Мурманская', 50, 'Мурманск'],
			            	['Мурманская', 5, 'Мурманск'],
			            	['Калининградская', 100000, 'Калининград'],
			            	['Калининградская', 10000, 'Калининград'],
			            	['Калининградская', 1000, 'Калининград'],
			            	['Калининградская', 100, 'Калининград'],
			            	['Калининградская', 10, 'Калининград'],
			            	['Калининградская', 1, 'Калининград']
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