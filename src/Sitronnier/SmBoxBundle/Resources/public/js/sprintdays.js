YUI().use('node', function (Y) {
    var replaceToInput = function(event) {
        var currentValue = this.get('innerText');
        this.clickevent.detach();
        this.setContent('<input type="text" value="' + currentValue + '"></input>');
        this.blurevent = this.one('input').on('blur', replaceToValue, this, this);
        this.keyevent = this.one('input').on('keypress', function(event) {
            if (event.keyCode === 13) { // enter key
                replaceToValue(event, this);
            }
        }, this);
    }

    var replaceToValue = function(event, item) {
        var newValue = parseFloat(item.one('input').get('value'));
        item.blurevent.detach();
        item.keyevent.detach();
        if (!isNaN(newValue)) {
            item.setContent(newValue);
            item.currentValue = newValue;
        } else {
            item.setContent(item.currentValue);
        }
        item.clickevent = item.on('click', replaceToInput, item);
    }

    Y.all('.change-me').each(function(item) {
        item.currentValue = parseFloat(item.get('innerText'));
        item.clickevent = item.on('click', replaceToInput, item);
    }, this);
});
