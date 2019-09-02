﻿var HotelDefinitionlist = function () {
    var that = this;
    var pageInitObject = [];

    var fillTable = function () {
        var table = $('#tableHotelDefinitionList');

        if (!jQuery().DataTable) {
            return;
        }

        table.dataTable({
            "searching": false,
            "responsive": false,
            "paging": true,
            "processing": true, // for show progress bar
            "serverSide": true, // for process server side
            "filter": true, // this is for disable filter (search box)
            "orderMulti": false, // for disable multiple column at once
            "pageLength": 10,
            buttons: [
            ],
            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
            "ajax": {
                "url": that.pageInitObject.urls.gridLoadUrl,
                "contentType": "application/json",
                "datatype": "json",
                "type": "POST",
                "data": function (data) {
                    var req = Core.createModel();
                    data.FilterRequest = req;

                    var request = {
                        model: data
                    };
                    return JSON.stringify(request);
                },
                "dataFilter": function (data) {
                    return data;
                    // var json = JSON.stringify jQuery.parseJSON(data);
                    // return json.data;
                }
            },
            "columns": [
                { "data": "Id", "name": "Id", "bSortable": false, "sWidth": "0" },
                { "data": "HotelName", "name": "HotelName", "bSortable": false, "Width": "10" },
                { "data": "Title", "name": "Title", "bSortable": false, "Width": "10" },
                { "data": "HotelTypeId", "name": "HotelTypeId", "bSortable": true, "Width": "5" },
                { "data": "IsAvtive", "name": "IsActive", "bSortable": false, "Width": "5" },
                { "data": "#", "name": "#", "bSortable": false }
            ],
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [3, 4],
                    "class": "text-center"
                },
                {
                    "render": function (data, type, row) {
                        return (data === true) ? '<span class="fa fa-check"></span>' : '<span class="fa fa-close"></span>';
                    },
                    "targets": [4],
                    "class": "text-center"
                },
                {
                    "render": function (data, type, row) {
                        var editUrl = that.pageInitObject.Urls.EditButtonUrl + '?Id=' + row.Id;
                        var actionsEdit = '<a style="margin-right:2px;" href="' + editUrl + '" class="btn btn-info" data-id="' + row.Id + '" type="button"><i class="fa fa-edit"></i>' + " Edit " + ' </button>';

                        return actionsEdit;
                    },
                    "targets": 5,
                    "class": "text-center"
                }
            ]
        });
    };

    var refreshTable = function () {
        var oTable = $('#tableHotelDefinitionList').DataTable();
        oTable.ajax.reload();
    }

    var handleStartup = function () {
        $('.box.box-default').boxWidget('toggle');

        $("#HotelType").select2({
            placeholder: "Select a state",
            allowClear: true,
            width: '100%'
        });
    };

    var handleEvents = function () {
        $(document).on('click', '.btnDelete', function () {
            var id = $(this).attr("data-id");
            var reqObj = { id: id };

            $.ajax({
                url: that.pageInitObject.Urls.DeleteUrlAction,
                dataType: "json",
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(reqObj),
                async: true,
                processData: false,
                cache: false,
                success: function (data) {
                    if (data.ResultType == Core.responseStatus.Success) {
                        Core.showNotify("<b>Complate Successfully</b>", "", "success");
                        refreshTable();
                    }
                    else {
                        Core.showNotify("<b>Warning..</b>", data.Message, "warning");
                        return;
                    }
                },
                error: function (xhr) {
                    Core.showNotify("<b>Get an Error</b>", "", "error");
                }
            });
        });

        $(document).on('click', '.btnClear', function () {
            Core.clearForm();
            refreshTable();
            // $('#tableHotelDefinitionList').DataTable().rows('.selected').deselect();
        });

        $(document).on('click', '.btnSearch', function () {
            refreshTable();
        });
    };

    return {
        init: function (initObject) {
            // diğer js 'ler de url'leri direk nesne olarak göndermiştik. Model gibi düşünebilirsiniz.
            // Burada ise Array objeler halinde gönderildi.
            // List veya array gibi düşünülebilir.
            // ChromeDev Console üzerinden değişkeni çağırıp inceleyiniz.
            that.pageInitObject = initObject;

            if (!jQuery().dataTable) {
                return;
            }
            fillTable();
            handleEvents();
            handleStartup();
        }
    };
}();