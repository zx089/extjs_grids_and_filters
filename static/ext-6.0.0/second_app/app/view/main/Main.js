
Ext.define('SecondApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'SecondApp.view.main.MainController',
        'SecondApp.view.main.MainModel',
        'SecondApp.view.citygrid.CityGrid',
        'SecondApp.view.streetgrid.StreetGrid'
    ],

    controller: 'main',
    viewModel: 'main',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        me.items = [
            {
                xtype: 'city-grid'
            },
            {
                xtype: 'street-grid'
            }
        ];

        me.callParent(arguments);
    }
});
