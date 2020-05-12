
function set_count_data(result){

         $('#open').text(result[0].open+result[1].open+result[2].open+result[3].open+
                         result[4].open+result[5].open+result[6].open)
     $('#pending').text(result[0].pending+result[1].pending+result[2].pending+result[3].pending+
                        result[4].pending+result[5].pending+result[6].pending)
     $('#denied').text(result[0].denied+result[1].denied+result[2].denied+result[3].denied+
                       result[4].denied+result[5].denied+result[6].denied)
     $('#approved').text(result[0].approved+result[1].approved+result[2].approved+result[3].approved+
                         result[4].approved+result[5].approved+result[6].approved)
     $('#completed').text(result[0].completed+result[1].completed+result[2].completed+result[3].completed+
                          result[4].completed+result[5].completed+result[6].completed)
     $('#feedback_done').text(result[0].feedback_done+result[1].feedback_done+result[2].feedback_done+result[3].feedback_done+
                              result[4].feedback_done+result[5].feedback_done+result[6].feedback_done)
     $('#eligible').text(result[0].eligible+result[1].eligible+result[2].eligible+result[3].eligible+
                         result[4].eligible+result[5].eligible+result[6].eligible)
     $('#not_eligible').text(result[0].not_eligible+result[1].not_eligible+result[2].not_eligible+result[3].not_eligible+
                         result[4].not_eligible+result[5].not_eligible+result[6].not_eligible)
Highcharts.chart('container', {
    chart: {
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            viewDistance: 20,
            depth: 40
        }
    },
    credits: {
    enabled: false
  },

    title: {
        text: 'Experience Vs Status Vs Employee Count Graph'
    },

    xAxis: {
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        categories: ['Below 1', 'Between 1 and 2', 'Between 2 and 4', 'Between 4 and 7', 'Between 7 and 10','Between 10 and 15','Above 15'],
        labels: {
            skew3d: true,
            style: {
                fontSize: '16px'
            }
        }
    },

    yAxis: {
       gridLineWidth: 0,
        minorGridLineWidth: 0,
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Number of Employee',
            skew3d: true
        }
    },

    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
    },

    plotOptions: {
        column: {
            stacking: 'normal',
            depth: 40
        }
    },

    series: [{
        name: 'Open',
        data: [result[0].open,result[1].open,result[2].open,result[3].open,result[4].open,result[5].open,result[6].open],
        stack: 'one'
    }, {
        name: 'Pending',
        data: [result[0].pending,result[1].pending,result[2].pending,result[3].pending,result[4].pending,result[5].pending,result[6].pending],
        stack: 'one'
    }, {
        name: 'Deny',
        data: [result[0].denied,result[1].denied,result[2].denied,result[3].denied,result[4].denied,result[5].denied,result[6].denied],
        stack: 'two'
    }, {
        name: 'Approved',
        data: [result[0].approved,result[1].approved,result[2].approved,result[3].approved,result[4].approved,result[5].approved,result[6].approved],
        stack: 'two'
    },{
        name: 'OTP-Pending',
        data: [result[0].feedback_done,result[1].feedback_done,result[2].feedback_done,result[3].feedback_done,result[4].feedback_done,result[5].feedback_done,result[6].feedback_done,],
        stack: 'three'
    },{
        name: 'Completed',
        data: [result[0].completed,result[1].completed,result[2].completed,result[3].completed,result[4].completed,result[5].completed,result[6].completed,],
        stack: 'three'
    }]
});
}



document.addEventListener('DOMContentLoaded', function () {
    $('#loaderModal').modal({
            show:true,
            backdrop: 'static',
    		keyboard: false
    })

        $.ajax({
   url:'/dashboard/get_graph_data/',
   success:function(result){
             set_count_data(result)
                 $('#loaderModal').modal('hide')
        }
    })
    })



function generate_report(){
   var location = $('#location').val()
   var bu = $('#bu').val()
   var experience = $('#experience').val()
   var score = $('#score').val()
   $('#loaderModal').modal({
            show:true,
            backdrop: 'static',
    		keyboard: false
    })
    data ={
    'location':location,
    'bu':bu,
    'experience':experience,
    'score':score
    }
    //csrf_token
    $.ajaxSetup({
     beforeSend: function(xhr, settings) {
         function getCookie(name) {
             var cookieValue = null;
             if (document.cookie && document.cookie != '') {
                 var cookies = document.cookie.split(';');
                 for (var i = 0; i < cookies.length; i++) {
                     var cookie = jQuery.trim(cookies[i]);
                     // Does this cookie string begin with the name we want?
                     if (cookie.substring(0, name.length + 1) == (name + '=')) {
                         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                         break;
                     }
                 }
             }
             return cookieValue;
         }
         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
             // Only send the token to relative URLs i.e. locally.
             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
         }
     }
});
if (location || bu || experience || score){
    $.ajax({
    type: 'POST',
    url: '/dashboard/generate_report/',
    data: data,
    success:function(response){
    set_count_data(response)
    $('#loaderModal').modal('hide')
    }
    })
    }
    else{
       $("#success").css("display", "none");
       $("#error").css("display", "block");
       $("#msg").html('Please Input valid skill')
       $("#bckground").css("background-color", "#e74a3b");
       $('#bckground').show()
       $('#bckground').fadeOut(3000)
       $('#loaderModal').modal('hide')
    }
}



/*******--Send notification to employee/RM--*******/
$(document).ready(function(){
$('#send_notification').prop('disabled', true)
});

//enable button on selecting valid option
$('#status').on('click', function() {
  var value = $(this).val();
  if(value){
  $('#send_notification').prop('disabled',false)
  }
  else{
  $('#send_notification').prop('disabled',true)
  }
});

//send notification function
function send_notification(){
   var status = $('#status').val()
    $('#send_notification').prop('disabled',true)
   if(status){
   $('#confirm_email').modal('hide')
   $.ajax({
   url:'/dashboard/send-notification/'+status+'/',
   success:function(result){
     if(result){
      $('#send_notification').prop('disabled',false)
     }
     else{
       $('#send_notification').prop('disabled',true)
     }
   }
   })
   }
}