YUI.add('ZebraDate', function(Y) {
    Y.namespace('SmbZebraDate');

    var month, day, year, date, currentUrl, newurl;

    Y.SmbZebraDate.mapSelect = function () {
        Y.all('#sitronnier_smboxbundle_daytype .day-date select').each(function (item) {
            item.on('change', function() {
                Y.SmbZebraDate.updateZebraDate();
            })
        });
    };

    Y.SmbZebraDate.updateZebraDate = function() {
        month = Y.one('#sitronnier_smboxbundle_daytype_date_month').get('value');
        day = Y.one('#sitronnier_smboxbundle_daytype_date_day').get('value');
        year = Y.one('#sitronnier_smboxbundle_daytype_date_year').get('value');
        date = year + '-' + month + '-' + day;
        currentUrl = Y.one('#zebra-url').get('href');
        newurl = currentUrl.replace(/(start=)(\d+-\d+-\d+)/, '$1' + date);
        newurl = newurl.replace(/(end=)(\d+-\d+-\d+)/, '$1' + date);
        Y.one('#zebra-url').setAttrs({'href': newurl});
    };

}, '0.1', {requires: ['node']});

