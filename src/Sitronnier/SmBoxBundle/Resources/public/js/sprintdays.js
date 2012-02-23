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
            this.fire('sync:success', {
                type: args.type
            });
        },

        syncFailure: function(id, o, args) {
            this.fire('error', {
                type : 'sync',
                error: 'sync error'
            });
        },
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
            },
            'a.delete': {
                click: 'deleteModel'
            }
        },

        initializer: function () {
            var model = this.model;

            model.after('change', this.render, this);
            model.after('createdByChange', this.updateCreated, this);
            model.after('destroy', this.destroy, this);
            model.on('sync:success', this.syncSuccess, this);
            model.on('error', this.error, this);
        },

        syncSuccess: function(o) {
            switch(o.type) {
                case 'delete':
                    // call destroy again but without arguments to delete the local model and view
                    this.model.destroy();
                    return;

                case 'update':
                    this.model.set('createdBy', 'user');
                    return;
            };
        },

        error: function(o) {
            Y.log('error: ' + o.error);
        },

        render: function () {
            this.container.setContent(Y.Lang.sub(this.template,
                this.model.getAttrs(['date', 'nbHours', 'nbSP', 'nbBV'])
            ));

            // Append the container element to the DOM if it's not on the page already.
            if (!this.container.inDoc()) {
                Y.one('#sprint-days-container').append(this.container);

                // for whatever reason this event cannot be attached using the usual 'events' hash
                this.container.all('input').on('blur', this.replaceToValue, this);

                this.container.addClass(this.model.get('createdBy') + '-created');
            }

            this.container.all('input').hide();
        },

        updateCreated: function(e) {
            this.container.removeClass(e.prevVal + '-created');
            this.container.addClass(e.newVal + '-created');
        },

        deleteModel: function(e) {
            e.halt();
            if (confirm('Are you sure?')) {
                this.model.destroy({'delete': true});
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

        replaceToValue: function(e) {
            var property, value;

            property = e.currentTarget.get('className');
            value = parseFloat(e.currentTarget.get('value'));

            e.currentTarget.get('parentNode').one('input').hide();
            e.currentTarget.get('parentNode').one('span').show();

            if (this.model.get(property) !== value) {
                this.model.set(property, value);
                this.model.save();
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

