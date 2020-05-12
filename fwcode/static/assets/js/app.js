/*----Dynamically adding and displaying existing/Non-existing user skill---*/


//enabling feedback OTP modal
$(document).ready(function(){
 $('#myModal').modal('show')
//hide edit skill button initially
$('#edit_skill').hide()
//hide success failure message div initially
$("#bckground").hide();
//getting and setting skill range value initially
range_value = document.getElementById('expertise').value
$('#range_value').html(range_value)
})
//displaying setting up of  skill range value manually
function get_range(){
range_value = document.getElementById('expertise').value
$('#range_value').html(range_value)
}

//add New skill function via AJAX
function add_skill(){
//Csrf_token
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
    data= {
          'skill':document.getElementById("myInput").value,
          'expertise':document.getElementById("expertise").value
          }
          $.ajax({
    type: 'POST',
    url: '/get-skill/',
    data: data,
    success:function(response){

    result=JSON.parse(response)
       document.getElementById('myInput').value = ''
       $("#no_skill").css("display", "none");

       if(result.skill && result.expertise){            //Invalid skill
       if(result.flag==0){                             //if skill already not present
        //checking for additional skill already present
        if($("b").hasClass("additional_skill")){
        $("#emp_skill").append("<div class='skill-section mb-4 mt-3' id='my_skill_"+result.skill_id+"'><b id='skill_title_"+result.skill_id+"'>"+result.skill+'<b> <i class="far fa-trash-alt fa-20x text-dark" data-toggle="modal" data-target="#del_skill_'+result.skill_id+'"></i><i class="far fa-edit fa-20x text-dark ml-2" title="Edit" id="additional_edit_icon_'+result.skill_id+'" onclick="get_additional_skill_by_id('+result.skill_id+')"></i><input type="text" class="form-control" id="skill_input_'+result.skill_id+'" style="display:none;" value='+result.skill+'><div class="progress my_additional_progress_'+result.skill_id+'" style="height:10px;"><div class="progress-bar bg-info" id="additional_skill_progress_'+result.skill_id+'" onclick="additional_stop_hover('+result.skill_id+')" style="width:'+result.expertise+'%">'+result.expertise+'%</div></div><div class="modal fade" id="del_skill_'+result.skill_id+'" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><h6 class="modal-title">Are you sure to Delete '+result.skill+' ?</h6><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><button type="button" class="btn btn-danger float-right" data-dismiss="modal" onclick="delete_skill('+result.skill_id+')">Delete</button><button type="button" class="btn btn-secondary float-right mr-2" data-dismiss="modal">Cancel</button></div></div></div></div></div>'
       )
        }else{
          $("#emp_skill").append("<b class='mt-3 additional_skill'>Additional Skill</b> <div class='skill-section mb-4 mt-3' id='my_skill_"+result.skill_id+"'><b id='skill_title_"+result.skill_id+"'>"+result.skill+'<b> <i class="far fa-trash-alt fa-20x text-dark" data-toggle="modal" data-target="#del_skill_'+result.skill_id+'"></i><i class="far fa-edit fa-20x text-dark ml-2" title="Edit" id="additional_edit_icon_'+result.skill_id+'" onclick="get_additional_skill_by_id('+result.skill_id+')"></i><input type="text" class="form-control" id="skill_input_'+result.skill_id+'" style="display:none;" value='+result.skill+'><div class="progress my_additional_progress_'+result.skill_id+'" style="height:10px;"><div class="progress-bar bg-info" id="additional_skill_progress_'+result.skill_id+'" onclick="additional_stop_hover('+result.skill_id+')" style="width:'+result.expertise+'%">'+result.expertise+'%</div></div><div class="modal fade" id="del_skill_'+result.skill_id+'" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><h6 class="modal-title">Are you sure to Delete '+result.skill+' ?</h6><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><button type="button" class="btn btn-danger float-right" data-dismiss="modal" onclick="delete_skill('+result.skill_id+')">Delete</button><button type="button" class="btn btn-secondary float-right mr-2" data-dismiss="modal">Cancel</button></div></div></div></div></div>'
       )
        }
       $("#error").css("display", "none");
       $("#success").css("display", "block");
       $("#msg").html('New Skill added')
       $("#bckground").css("background-color", "#1cc88a");
       $('#bckground').show()
       $('#bckground').fadeOut(3000)
       }
       else{

       $("#success").css("display", "none");
       $("#error").css("display", "block");
       $("#msg").html('Skill already added')
       $("#bckground").css("background-color", "#e74a3b");
       $('#bckground').show()
       $('#bckground').fadeOut(3000)
       }
       }
       else{
        $("#success").css("display", "none");
        $("#error").css("display", "block");
       $("#msg").html('Please add valid skill')
       $("#bckground").css("background-color", "#e74a3b");
       $('#bckground').show()
       $('#bckground').fadeOut(3000)
       }
    }
})
}

/*--get Defined skill data by ID--*/
function get_skill_by_id(skill_id){
hover_over_progress_bar(skill_id)
}
//Global variable
var skill_percentage
//Hover over define skill progress bar
function hover_over_progress_bar(skill_id)
{
var percentage,len;
	$(".my_progress_"+skill_id).mousemove(function(event) {
           currentMousePos = event.pageX;
           $( "#skill_progress_"+skill_id ).width(currentMousePos)
           len = $(".my_progress_"+skill_id).width()
           percentage = (currentMousePos/len)*100;
           percentage=percentage.toFixed(0)
           skill_percentage=percentage
           $('#skill_progress_'+skill_id).html(percentage-8+'%')
	})
}
/*--Hover over Additional skill progress bar--*/
function get_additional_skill_by_id(skill_id){
//initial step to follow
$('#additional_skill_title_'+skill_id).css("display","none")   //hide skill title
$('#skill_input_'+skill_id).css("display","block")  //show skill input text

  var percentage,len;
	$(".my_additional_progress_"+skill_id).mousemove(function(event) {
           currentMousePos = event.pageX;
           $( "#additional_skill_progress_"+skill_id ).width(currentMousePos)
           len = $(".my_additional_progress_"+skill_id).width()
           percentage = (currentMousePos/len)*100;
           percentage=percentage.toFixed(0)
           skill_percentage=percentage
           $('#additional_skill_progress_'+skill_id).html(percentage-8+'%')
	})
}


/*--After setting progressbar of Define skill stop hovering--*/
function stop_hover(skill_id){
//initial step to follow
//$('#additional_edit_icon_'+skill_id).css("display","block")     //hide edit icon
$('#additional_skill_title_'+skill_id).css("display","block")   //hide skill title
$('#skill_input_'+skill_id).css("display","none")  //show skill input text
$(".my_progress_"+skill_id).off("mousemove");
var title =$('#skill_title_'+skill_id).text()
var expertise =skill_percentage
var identity ='Define'
edit_skill(skill_id,title,skill_percentage,identity)      //calling edit skill function
}

/*--After setting progress bar of Additional skill stop hovering--*/
function additional_stop_hover(skill_id){
$('#additional_skill_title_'+skill_id).css("display","block")   //hide skill title
$('#skill_input_'+skill_id).css("display","none")  //show skill input text
$(".my_additional_progress_"+skill_id).off("mousemove");
var title = $('#skill_input_'+skill_id).val();
var expertise =skill_percentage
var identity = 'Additional'
edit_skill(skill_id,title,skill_percentage,identity)     //call edit skill function
}

/*--edit particular skill via AJAX--*/
function edit_skill(skill_id,title,expertise,identity){
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
data= {
          'skill':title,
          'expertise':expertise-8
      }

      if(data['skill']){
          $.ajax({
    type: 'POST',
    url: '/edit-skill/'+skill_id+'/',
    data: data,
    success:function(response){
    result=JSON.parse(response)
    //success message
       $("#error").css("display", "none");
       $("#success").css("display", "block");
       $("#msg").html('Skill Updated Successfully')
       $("#bckground").css("background-color", "#1cc88a");
       $('#bckground').show()
       $('#bckground').fadeOut(3000)
       if(identity =='Additional'){
         $('#additional_skill_title_'+skill_id).html(result.skill)
       }
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
    }

}
/*--delete skill function via AJAX--*/
function delete_skill(id){
   $('#my_skill_'+id).hide()
   if($("#additional_my_skill_"+id).hasClass("skill-section")){
   $('#additional_my_skill_'+id).hide()
   }
      //success message
       $("#error").css("display", "none");
       $("#success").css("display", "block");
       $("#msg").html('Skill Deleted Successfully')
       $("#bckground").css("background-color", "#1cc88a");
       $('#bckground').show()
       $('#bckground').fadeOut(3000)
  $.ajax({
  url:'/delete-skill/'+id+'/'
  })
  document.getElementById('myInput').value = ''
}

/****************************************************/

/*--Regenerating OTP--*/
function regenerate_otp(review_id){
$.ajax({
   url:'/regenerate-otp/'+review_id+'/',
   success:function(response){
   $("#error").css("display", "none");
       $("#success").css("display", "block");
       $("#msg").html('New OTP Generated')
       $("#bckground").css("background-color", "#1cc88a");
       $('#bckground').show()
       $('#bckground').fadeOut(3000)
   }
   })
}








