YUI.add('SprintDays', function(Y) {
    Y.namespace('SmbSprintDays');

    /**
     * Day model
     */
    Y.DayModel = Y.Base.create('dayModel', Y.Model, [], {

        initializer: function(o) {
        },

        sync: function (action, options, callback) {
            var data, o;

            data = this.toJSON();
            o = {
                'method': 'POST',
                'data': Y.JSON.stringify(data),
                'timeout': 2000,
                'headers': {
                    'Content-Type': 'application/json',
                },
                context: this,
                on: {
                    success: this.syncComplete,
                    failure: this.syncFailure
                },
                arguments: {
                    type: action
                }
            };

            switch (action) {
                case 'update':
                    Y.io(Routing.generate('smbox_stats_update_day'), o);
                    return;
                case 'delete':
                    Y.io(Routing.generate('smbox_stats_delete_day'), o);
                    return;
            }
        },

        syncComplete: function(id, o, args) {
            console.log('success');
            this.fire('sync:success', {
                type: args.type
            });
        },

        syncFailure: function(id, o, args) {
            console.log('failure');
            this.fire('error', {
                type : 'sync',
                error: 'sync error'
            });
        },
    }, {
        ATTRS: {
            date: {
            },
            visible: {
                value: true,
                validator: function (value) {
                    return typeof value === 'boolean';
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

        container: Y.Node.create('<div class="sprint-day" />'),

        template: Y.one('#sprint-day-template').getContent(),

        events: {
            '.inline-updatable span': {
                click: 'replaceToInput'
            },
            '.inline-updatable input[type="text"]': {
                keypress: 'onKeyPress'
            },
            '.inline-updatable input[type="checkbox"]': {
                change: 'replaceToValueCheckbox'
            },
            'a.delete': {
                click: 'deleteModel'
            }
        },

        initializer: function () {
            var model = this.get('model');

            model.after('change', this.render, this);
            model.after('visibleChange', this.updateVisible, this);
            model.after('destroy', this.destroy, this);
            model.on('sync:success', this.syncSuccess, this);
            model.on('error', this.error, this);
        },

        syncSuccess: function(o) {
            switch(o.type) {
                case 'delete':
                    // call destroy again but without arguments to delete the local model and view
                    this.get('model').destroy();
                    return;

                case 'update':
                    return;
            };
        },

        error: function(o) {
            Y.log('error: ' + o.error);
        },

        render: function () {
            this.get('container').setContent(Y.Lang.sub(this.template,
                this.get('model').getAttrs(['date', 'nbHours', 'nbSP', 'nbBV'])
            ));

            this.get('container').one('input[type="checkbox"].visible').set('checked', this.get('model').get('visible') == 1);

            // Append the container element to the DOM if it's not on the page already.
            if (!this.get('container').inDoc()) {
                Y.one('#sprint-days-container').append(this.get('container'));

                // for whatever reason this event cannot be attached using the usual 'events' hash
                this.get('container').all('input[type="text"]').on('blur', this.replaceToValue, this);

                this.get('container').addClass(this.getVisibleClass(this.get('model').get('visible')));
                this.get('container').addClass('sprint-day');
            }

            // hide all text inputs (show on span click)
            this.get('container').all('input[type="text"]').hide();
        },

        getVisibleClass: function(visible) {
            return visible? 'visible' : 'hidden';
        },

        updateVisible: function(e) {
            this.get('container').removeClass(this.getVisibleClass(e.prevVal));
            this.get('container').addClass(this.getVisibleClass(e.newVal));
        },

        deleteModel: function(e) {
            e.halt();
            if (confirm('Are you sure?')) {
                this.get('model').destroy({'delete': true});
            }
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

        replaceToValueCheckbox: function(e) {
            var property, value;

            property = e.currentTarget.get('className');
            value = e.currentTarget.get('checked');

            this.updateModel(property, value);
        },

        replaceToValue: function(e) {
            var property, value;

            property = e.currentTarget.get('className');
            value = parseFloat(e.currentTarget.get('value'));

            e.currentTarget.get('parentNode').one('input').hide();
            e.currentTarget.get('parentNode').one('span').show();

            this.updateModel(property, value);
        },

        updateModel: function(property, value) {
            if (this.get('model').get(property) !== value) {
                this.get('model').set(property, value);
                this.get('model').save();
            }
        }
    });

    Y.SmbSprintDays.populate = function(sprint) {
        if (typeof sprint === 'string') {
            sprint = sprint.replace(/&quot;/ig,'"');
            sprint = Y.JSON.parse(sprint);
            days.setSprint(sprint);
        };
    }

}, '0.1', {requires: ['app', 'model-list', 'model', 'view', 'json-parse', 'node', 'io-base', 'querystring-stringify-simple', 'json']});

