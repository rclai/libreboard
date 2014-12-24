Template.lists.rendered = function() {
    var _this = this,
        data = this.data,
        lists = _this.$(".lists");

    if (Utils.isMemberAll(true, false)) {
        lists.sortable({
            connectWith: ".lists",
            handle: ".list-header",
            tolerance: 'pointer',
            appendTo: 'body',
            helper: "clone",
            items: '.list:not(.add-list)',
            placeholder: 'list placeholder',
            start: function (event, ui) {
                $('.list.placeholder').height(ui.item.height());
            },
            stop: function(event, ui) {
                lists.find('.list:not(.add-list)').each(function(i, list) {
                    var data = Blaze.getData(list);
                    Lists.update(data._id, { 
                        $set: {
                            sort: i
                        } 
                    });
                });
            }
        }).disableSelection();
    } 

    // update height add, update, remove resize board height.
    Lists.find().observe({
        added: Utils.resizeHeight('.board-canvas'),
        updated: Utils.resizeHeight('.board-canvas'),
        removed: Utils.resizeHeight('.board-canvas')
    });
};