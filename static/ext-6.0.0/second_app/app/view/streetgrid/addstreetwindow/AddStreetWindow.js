Ext.define('SecondApp.view.streetgrid.addstreetwindow.AddStreetWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.street-window',

    width: 330,
    height: 400,
    bodyPadding: 10,
    closable: true,
    modal:true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    buttons: [
        {
            text: 'Создать',
            itemId: 'createButton',
            disabled: !this.validToAdd,
            handler: function() {
                var wnd = this.up('street-window'),
                    streetName = wnd.down('#streetName').getValue(),
                    companyName = wnd.down('#companyCmb').getValue(),
                    houseNumber = wnd.down('#housesCmb').getValue(),
                    cityName = wnd.down('#cityStreetCmb').getValue();

                var res = {
                    'street': streetName,
                    'company': companyName,
                    'houses': houseNumber,
                    'city': cityName
                }
                wnd.fireEvent('submitStreetData', res);
                wnd.close();
            }
        },
        { 
            text: 'Закрыть',
            handler: function() {
                this.up('street-window').destroy();
            }
        }
    ],

    resizable: false,

    title: 'Добавить улицу',

    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            defaults: {
                listeners: {
                    validitychange: function(isValid) {
                        var wnd = this.up('street-window'),
                            createButton = wnd.down('#createButton'),
                            streetName = wnd.down('#streetName').isValid(),
                            companyName = wnd.down('#companyCmb').isValid(),
                            houseNumber = wnd.down('#housesCmb').isValid(),
                            cityName = wnd.down('#cityStreetCmb').isValid();

                        var validationCheck = streetName && companyName && houseNumber && cityName;

                        createButton.setDisabled(!validationCheck);
                    }

                }
            },
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'streetName',
                    fieldLabel: 'Название улицы:',
                    margin: '1 0 0 0',
                    labelAlign: 'top',
                    allowBlank: false,
                    emptyText: 'Название улицы',
                    minLength: 4,
                    minLengthText: 'Название улицы должно состоять минимум из 4 символов.',
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
                    itemId: 'companyCmb',
                    fieldLabel: 'Отвечающая компания',
                    margin: '1 0 0 0',
                    labelAlign: 'top',
                    allowBlank: false,
                    displayField : 'company',
                    valueField : 'company',
                    queryMode: 'local',
                    emptyText: 'Отвечающая компания',
                    triggers: {
                        clear: {
                            cls: 'x-form-clear-trigger',
                            handler: function(){
                                this.reset();
                                this.focus();
                            }
                        }
                    },
                    store: new Ext.data.ArrayStore({
                        fields: ['company'],
                        data: [['Google'], ['Huawei'], ['Apple']] 
                    })
                },
                {
                    xtype: 'numberfield',
                    itemId: 'housesCmb',
                    fieldLabel: 'Кол-во домов',
                    margin: '1 0 0 0',
                    labelAlign: 'top',
                    allowBlank: false,
                    minValue: 0,
                    minValueText: 'Число должно быть положительным',
                    emptyText: 'Кол-во домов',
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
                    itemId: 'cityStreetCmb',
                    fieldLabel: 'Название города',
                    margin: '1 0 0 0',
                    labelAlign: 'top',
                    allowBlank: false,
                    emptyText: 'Название города',
                    displayField : 'cityName',
                    valueField : 'cityName',
                    queryMode: 'local',
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
        });
        this.callParent(arguments);
    }
});
