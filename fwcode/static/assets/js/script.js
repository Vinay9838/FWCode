$(document).ready(function(){
     // confirm modal
    $('#confirmModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget)
      var url = button.data('url')
      var action_type = button.data('type')
      var modal = $(this)
      if (action_type == "delete"){
          modal.find('#confirmProceed').text("Delete")
      }else if (action_type == "email"){
        modal.find('#confirmProceed').text("Send")
      }
      modal.find('#confirmTitle').text(button.data('text'))
      modal.find('#confirmProceed').attr('href', url)
    });


   // toast settings
   $('.toast').toast({delay: 3000});
   $('.toast').toast('show');

   // date picker
    $('.datepicker').datepicker({
        uiLibrary: 'bootstrap4',
        format: "mm-yyyy",
        enableOnReadonly: false,
        endDate: new Date,
        autoclose: true,
//        minViewMode: 1,
    });





    //summer note
    $('.note-resizebar').hide();
});