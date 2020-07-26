$(function () {

  /* Functions */

  var loadForm = function () {
    var btn = $(this);
    $.ajax({
      url: btn.attr("data-url"),
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-order").modal("show");
      },
      success: function (data) {
        $("#modal-order .modal-content").html(data.html_form);
      }
    });
  };

  var saveForm = function () {
    var form = $(this);
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr("method"),
      dataType: 'json',
      success: function (data) {
        if (data.form_is_valid) {
          $("#order-table tbody").html(data.html_order_list);
          $("#modal-order").modal("hide");
        }
        else {
          $("#modal-order .modal-content").html(data.html_form);
        }
      }
    });
    return false;
  };


  /* Binding */

  // Update book
  $("#order-table").on("click", ".js-update-order", loadForm);
  $("#modal-order").on("submit", ".js-order-update-form", saveForm);

  // Delete book
    $("#order-table").on("click", ".js-delete-order", loadForm);
    $("#modal-order").on("submit", ".js-order-delete-form", saveForm);

});