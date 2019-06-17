Ext.define('SecondApp.view.streetgrid.StreetGridModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.streetgrid',

    data: {
    	filters: {
    		street: null,
    		company: null,
    		houses: null,
    		pop: {
    			minPop: null,
    			maxPop: null
    		},
    		city: null
    	}
    },

    stores: {
    	cities_store: {
        	autoLoad: false,
        	fields: ['cityName']
        },
        street_store: {
        	autoLoad: false,
        	fields: [
        		{
        			name: 'street'
        		},
        		{
        			name: 'company'
        		},
        		{ 
        			name: 'houses'
        		},
        		{
        			name: 'city'
        		},
        		{
        			name: 'population',
        			convert: function(value, record) {
        				var houseNumber = record.get('houses'),
        					population = parseInt(houseNumber) * 750;
			            return population;
			        },
        		}
        	],
        	data: [
        		['Тверская', 'Google', 3, 'Москва'],
        		['Столешников пер-ок', 'Huawei', 15, 'Москва'],
        		['Новый Арбат', 'Apple', 1, 'Москва'],
        		['Гвардейский проспект', 'Huawei', 3, 'Калининград'],
        		['Улица 1812 года', 'Google', 15, 'Калининград'],
        		['Авиационная улица', 'Apple', 1, 'Калининград']
        	]
        },
        companies_store: {
        	autoLoad: false,
        	fields: ['company'],
            data: [['Google'], ['Huawei'], ['Apple']] 
        }
    }
});