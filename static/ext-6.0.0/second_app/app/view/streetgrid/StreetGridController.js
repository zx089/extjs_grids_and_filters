Ext.define('SecondApp.view.streetgrid.StreetGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.streetgrid',

    requires: [
        'SecondApp.view.streetgrid.addstreetwindow.AddStreetWindow'
    ],

    control: {
        '#addStreetButton': {
            click: 'createAddStreetWindow'
        },
        '#streetName': {
            change: 'filterStreetGrid'
        },
        '#companyName': {
            change: 'filterStreetGrid'
        },
        '#housesNumber': {
            change: 'filterStreetGrid'
        },
        '#minPop': {
            change: 'filterStreetGrid'
        },
        '#maxPop': {
            change: 'filterStreetGrid'
        }
    },

    createAddStreetWindow: function() {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            citiesStore = vm.getStore('cities_store'),
            streetStore = vm.getStore('street_store'),
            companiesStore = vm.getStore('companies_store');

        var win = Ext.create({xtype: 'street-window'}),
            cityCmb = win.down('#cityStreetCmb'),
            companyCmb = win.down('#companyCmb');

        cityCmb.setStore(citiesStore);
        companyCmb.setStore(companiesStore);

        win.show();
        
        win.on('submitStreetData', function(streetData) {
            streetStore.loadRawData(streetData, true);
        });
    },

    filterStreetGrid: function() {
        var me = this,
            view = me.getView(),
            streetGrid = view.down('#street-grid'),
            vm = me.getViewModel(),
            streetStore = vm.getStore('street_store');

        var filters = vm.get('filters');
        var mismatched, res;

        streetStore.clearFilter();

        streetStore.filterBy(function(rec) {

            mismatched = false;
            
            mismatched = Ext.Array.some(Ext.Object.getKeys(filters), function(filter) {
                res = me[filter + 'Filter'](rec, filters[filter]);
                return !res;
            });

            return !mismatched;
            
        });
    },

    streetFilter: function(rec, val) {
        var regValue = new RegExp(val, 'i');
            return !val || regValue.test(rec.get('street'));
    },

    companyFilter: function(rec, val) {
            return !val || val == rec.get('company');
    },

    housesFilter: function(rec, val) {
        return !val || rec.get('houses') === val;
    },

    cityFilter: function(rec, val) {
        return !val || rec.get('city') === val;
    },

    popFilter: function(rec, val) {
        var max = true,
            min = true;
        if (!Ext.isEmpty(val.maxPop)) {
            if (!(rec.get('population') <= val.maxPop)) {
                max = false;
            }
        } 
        if (!Ext.isEmpty(val.minPop)) {
            if (!(rec.get('population') >= val.minPop)) {
                min = false;
            }
        }
        return min && max;
    }
});