var preview_snapshot;
var cancel_preview;
var save_photo;
var save_pdf;
$(document).ready(function(){
    $('#CaptureModal').on('shown.bs.modal', function () {
        Webcam.set({
            // live preview size
            width: 273,
            height: 350,

            // device capture size
            dest_width: 640,
            dest_height: 480,

            // final cropped size
            width: 273,
            height: 350,

            // format and quality
            image_format: 'jpeg',
            jpeg_quality: 90,

            // flip horizontal (mirror mode)
            flip_horiz: false,
            facingMode: "environment"
        });
        Webcam.attach( '#my_camera' );
    });

    var images = [];
    $("#pdf_preview").hide();
    $("#upload-section").hide();

    preview_snapshot = function () {
        // freeze camera so user can preview current frame
        Webcam.freeze();

        // swap button sets
        $("#post_take_buttons").show();
        $("#pre_take_buttons").hide();
    }

    cancel_preview = function() {
        // cancel preview freeze and return to live camera view
        Webcam.unfreeze();
        // swap buttons back to first set
         $("#post_take_buttons").hide();
         $("#pre_take_buttons").show();
    }

    save_photo = function(upload=0) {
        // actually snap photo (from preview freeze) and display it
        Webcam.snap( function(data_uri) {
            const doc =  window.jspdf.jsPDF({});

            // display results in page
            //document.getElementById('results').innerHTML +='<img src="'+data_uri+'"class="img-fluid">';
            //$("#results").append('<img src="'+data_uri+'"class="img-fluid mb-2">')
            images.push(data_uri)
            if(upload){
                // handle uplooad part here
                for(img in images){
                    doc.addImage(images[img], 'JPEG', 15, 40, 180, 180);
                    if(img != images.length-1){
                        doc.addPage();
                    }
                }
                doc.output("datauristring") // return pdf base64 data
                console.log(doc.output("datauristring"))

            }
            else{
                for(img in images){
                    doc.addImage(images[img], 'JPEG', 15, 40, 180, 180);
                    if(img != images.length-1){
                        doc.addPage();
                    }
                }

                $("#pdf_preview").show();
                $("#pdf_preview").attr('src', doc.output("datauristring"))
                localStorage.setItem("doc_pdf",doc.output("datauristring"));

    //            $("#results").show();
                $("#upload-section").show();
                $("#post_take_buttons").hide();
                $("#pre_take_buttons").show();
            }



        } );

    }
//    upload_pdf = function(){
//        const doc =  window.jspdf.jsPDF();
//        $("#pdf_preview").attr('src', doc.output("datauristring"))
//
//        $("#CaptureModal").modal('hide');
//        Webcam.reset();
//    }


});


$('#CaptureModal').on('hidden.bs.modal', function () {

    Webcam.reset();
});






