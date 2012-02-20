YUI.add('SprintDays', function(Y) {
    Y.namespace('SmbSprintDays');

    /**
     * Day model
     */
    Y.DayModel = Y.Base.create('dayModel', Y.Model, [], {

        sync: function (action, options, callback) {
            Y.log('sync now!' + action);
        }
    }, {
        ATTRS: {
            date: {
            },
            createdBy: {
                value: 'user',
                validator: function (value) {
                    return typeof value === 'string' && (value === 'user' || value === 'machine');
                }
            },
            nbHours: {
                value: 0,
                validator: function (value) {
                    return typeof value === 'number' && value >= 0;
                }
            },
            nbSP: {
                value: 0,
                validator: function (value) {
                    return typeof value === 'number' && value >= 0;
                }
            },
            nbBV: {
                value: 0,
                validator: function (value) {
                    return typeof value === 'number' && value >= 0;
                }
            },
        }
    });

    /**
     * Day list (model collection)
     */
    Y.DayList = Y.Base.create('dayList', Y.ModelList, [], {

        model: Y.DayModel,

        sprint: {},

        setSprint: function(newsprint) {
            sprint = newsprint;
            this.reset(sprint.days);
        }
    });
    var days = new Y.DayList();

    days.on('reset', function(e) {
        Y.each(e.models, function(model, index) {
            var dayView = new Y.DayView({'model': model});
            dayView.render();
        });
    });

    /**
     * View
     */
    Y.DayView = Y.Base.create('dayView', Y.View, [], {

        container: '<div class="sprint-day" />',

        template: Y.one('#sprint-day-template').getContent(),

        events: {
            '.inline-updatable span': {
                click: 'replaceToInput'
            },
            '.inline-updatable input': {
                keypress: 'onKeyPress'
            }
        },

        initializer: function () {
            var model = this.model;

            model.after('change', this.render, this);
            model.after('destroy', this.destroy, this);
        },

        render: function () {
            this.container.setContent(Y.Lang.sub(this.template,
                this.model.getAttrs(['date', 'nbHours', 'nbSP', 'nbBV'])
            ));

            // Append the container element to the DOM if it's not on the page already.
            if (!this.container.inDoc()) {
                Y.one('#sprint-days-container').append(this.container);
            }

            // for whatever reason this event cannot be attached using the usual 'events' hash
            this.container.all('input').on('blur', this.replaceToValue, this);

            this.container.all('input').hide();
        },

        onKeyPress: function(e) {
            if (e.keyCode === 13) { // enter key
                this.replaceToValue(e);
            }
        },

        replaceToInput: function(e) {
            var input = e.currentTarget.get('parentNode').one('input');
            input.show().focus().select();
            e.currentTarget.get('parentNode').one('span').hide();
        },

        replaceToValue: function(e) {
            var classname = e.currentTarget.get('className');
            this.model.set(classname, parseFloat(e.currentTarget.get('value')));
            e.currentTarget.get('parentNode').one('input').hide();
            e.currentTarget.get('parentNode').one('span').show();
        }
    });

    Y.SmbSprintDays.populate = function(sprint) {
        if (typeof sprint === 'string') {
            sprint = sprint.replace(/&quot;/ig,'"');
            sprint = Y.JSON.parse(sprint);
            days.setSprint(sprint);
        };
    }

}, '0.1', {requires: ['app', 'model-list', 'model', 'view', 'json-parse', 'node']});

