Ext.define('SecondApp.view.citygrid.CityGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.citygrid',

    control: {
        '#city-grid': {
            afterrender: 'loadCityData',
            selectionchange: 'filterStreetsByCity'
        },
        '#cityCmb': {
            change: 'filterCityGrid'
        },
        '#regionCmb': {
            change: 'filterCityGrid'
        },
        '#populationCmb': {
            change: 'filterCityGrid'
        }
    },

    loadCityData: function() {
        var me = this,
            view = me.getView(),
            cityGrid = view.down('#city-grid'),
            regionCmb = view.down('#regionCmb'),
            vm = me.getViewModel(),
            cityStore = vm.getStore('city_store'),
            pagingStore = vm.getStore('paging_store'),
            regionsStore = vm.getStore('regions_store'),
            mainApp = view.up('app-main'),
            streetGrid = mainApp.down('street-grid'),
            streetVM = streetGrid.getViewModel(),
            citiesStreetStore = streetVM.getStore('cities_store');

        cityGrid.setLoading();
        regionCmb.setLoading();

        var recs = cityStore.getRange();

        if (!Ext.isEmpty(recs)) {
            pagingStore.getProxy().setData(recs);
            pagingStore.load();

            var subjects = ['Москва', 'Калининградская', 'Ленинградская', 'Мурманская'],
                citiesData = ['Москва', 'Калиниград', 'Мурманск', 'Санкт-Петербург'];
            // var subjects = recs.collect('subject'),
            //     citiesData = recs.collect('name');

            var regions = [],
                cities = [];

            Ext.Array.forEach(subjects, function(subject) {
                regions.push({'regionName': subject});
            });

            Ext.Array.forEach(citiesData, function(city) {
                cities.push({'cityName': city});
            });

            citiesStreetStore.loadData(cities);

            regionsStore.loadData(regions);
        }
        
        

        cityGrid.setLoading(false);
        regionCmb.setLoading(false);

        
    },

    filterCityGrid: function() {
        var me = this,
            view = me.getView(),
            cityGrid = view.down('#city-grid'),
            vm = me.getViewModel(),
            cityStore = vm.getStore('city_store'),
            pagingStore = vm.getStore('paging_store');

        var filters = vm.get('filters');
        var mismatched, res;

        cityStore.clearFilter();

        cityStore.filterBy(function(rec) {

            mismatched = false;
            
            mismatched = Ext.Array.some(Ext.Object.getKeys(filters), function(filter) {
                res = me[filter + 'CityFilter'](rec, filters[filter]);
                return !res;
            });

            return !mismatched;
            
        });

        pagingStore.getProxy().setData(cityStore.getRange());
        pagingStore.load();
    },

    nameCityFilter: function(rec, val) {
        var regValue = new RegExp(val, 'i');
            return !val || regValue.test(rec.get('name'));
    },

    subjectCityFilter: function(rec, val) {
        return !val || rec.get('subject') == val;
    },

    populationCityFilter: function(rec, val) {
        return !val || parseInt(rec.get('population')) >= val;
    },

    filterStreetsByCity: function(grid, rec) {
        var me = this,
            view = me.getView(),
            mainApp = view.up('app-main'),
            streetGrid = mainApp.down('street-grid'),
            cntr = streetGrid.getController(),
            vm = streetGrid.getViewModel();

        if (!Ext.isEmpty(rec)) {
            var cityName = rec[0].get('name');
            vm.set('filters.city', cityName)
        } else {
            vm.set('filters.city', null)
        }
        cntr.filterStreetGrid();
    }
});







