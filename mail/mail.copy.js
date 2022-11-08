
// ==========================================================================
// ==========================================================================
// ==========================================================================
// ==========================================================================
// ==========================================================================

function setmail_list_area_height()
{
  height = $(window).height();
  newheight = height-195;
  newheight2 = height-65;
  $('.mail_list_area').height(newheight);
  $('.side-mail').height(newheight2);
  $('.mailopenbox').height(newheight2);
}

// ==========================================================================

function updateURLTitle(url, title)
{ 
  var new_url=baseurl+url;
  window.history.pushState("data",title, new_url);
  document.title=title;
}

// ==========================================================================

var delay = function(){
// SET TIMER
    var timer = 0;
// RETURN SET TIMEOUT FUNCTION
    return function(callback, ms){
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
};

// ==========================================================================

function bytesToSize(bytes) {
   var sizes=['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i=parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

// ==========================================================================

$(document).on('click', '.stopsyncEmail', function(){
  if(confirm("Are you sure to stop mail sync?"))
  {
    location.href=baseurl+'mail/stopsyncEmail';
  }
});

// ==========================================================================

$(document).on('click', '.removeEmailAccountData', function(){
  if(confirm("Are you sure to remove this account? All data will be remove related this email account."))
  {
    location.href=baseurl+'sync/removeEmailAccount?confirm=yes';
  }
});

// ==========================================================================

$(document).on('click', '.syncEmailBtn', function(){
    alert('ram ')
  $('#emailSyncOption_md_open').trigger('click');
});

// ==========================================================================

$(document).on('click', '.syncNewMailBtn', function()
{
  $('.newEmailBox').show();
});

// ==========================================================================

$(document).on('click', '.connectNewMailBtn', function() 
{
  email = $('.syncNewMailAddress').val();
  if(email.trim() != '')
  {
    $.post(baseurl+'sync/checkEmailSyncOption', {email:email}, function(data){
      if(data != '')
      { 
          json = JSON.parse(data);
          if(json.success != '' && json.success == true)
          {
             $('#emailSyncOption_md').modal('show');
          }
          else if(json.success == false)
          {
             alert(json.error);
          }
          else
          {
            alert("Something went wrong");
          }
      }
   });
  }
});

// =================================================================================================================
// =================================================================================================================
// =================================================================================================================
// =================================================================================================================
// =================================================================================================================


function getNavBarPrimary()
{ 
   $.post(baseurl+'pages/nav_detail',{getnav:'all'},function(data){
    //$('.header-top').html(data);
    if(data!='')
    {  json = JSON.parse(data);
       createNavBarPrimary(json);
       getSideBarActivity();
    } 
    });  
}
// getNavBarPrimary();

$(document).on('click','.nav_activity',function(e){ 
  e.preventDefault(); 
  $('.switch_loader_area').show();
  $('.cs-loader').show();
  changeNavAClass(this);
  setactivity(); 
  updateURLTitle("activity", "Activity"); 
});
 

function setactivity()
{  $.post(baseurl+'activity/activity',{getactivity:'all'},function(data){ //$('.mail-content-area').html(data);
  if(data!='')
    {   json = JSON.parse(data);
      // console.log(data);
      { if(json.login == true)
        {   
              createActivityHead(json);
              setactivityTable(); 
              // createSideCalendar('.sl_calendar'); 
            }else { location.href=baseurl+'lms'; }
      }  } 
   });
}

function setactivityTable(date='', purpose='', user = '', pid='', perpage='')
{  $.post(baseurl+'activity/activityTable',{getactivity:'all', date:date, purpose:purpose, user:user,pid:pid, perpage:perpage},function(data){
    if(data!='')
    {  
      json = JSON.parse(data); 
      { if(json.page_id!='')
        {  createActivityTable(json.table, json.currentTime, json.date);  
        }
        setAct_height();   
        setacttablePagination(json.totalact, json.totalpage, json.limit_start, json.limit, json.totalActThis , json.page_id); 
      }
    }
    }); //$('.activity-content-area').html(data);
    $('.nav_activity').addClass("active"); 
}

function changeNavAClass(th)
{
  $('.header-top .navul li a').removeClass("active");
  $('.header-top .navul li').removeClass("active");
  $(th).addClass("active");
  $('.all_notification_panel').hide();
}

function changeNavOAClass(th)
{
  $('.header-top .navul li a').removeClass("active");
  $('.header-top .navul li').removeClass("active");
  $(th).closest('.nav-item').addClass("active");
  $('.all_notification_panel').hide();
}

////   LMS Grid, LMS Table Click events /////////
$(document).on('click','.nav_lms',function(e){  
 e.preventDefault(); 
 $('.switch_loader_area').show();
 $('.cs-loader').show();  
 changeNavAClass(this); 
 setlms();   
 updateURLTitle("lms", "LMS");
});

function setlms(pipeline='', user='')
{   $.post(baseurl+'pages/getlms',{getlms:'all', pipeline:pipeline, user:user},function(data){$('.mail-content-area').html(data);});
}

function setlmsBox(user='', leadfilter='', pipeline='', tag='')
{  
   $.post(baseurl+'pages/getlmsBox',{getlms:'all',user:user,filter:leadfilter,pipeline:pipeline, tag:tag},function(data){$('.leads-content-area').html(data);});
   $('.nav_lms').addClass("active"); 
}


////   Organization Click events /////////
$(document).on('click','.nav_organization',function(e){  
  e.preventDefault();
  $('.switch_loader_area').show();
  $('.cs-loader').show();
  changeNavOAClass(this);
  setorganization();
  updateURLTitle("organizations", "Organizations"); 
});

$(document).on('click','.nav_organization_detail',function(e){  
  e.preventDefault();
   var id = $(this).attr("set");
  $('.cs-loader').show();
  $('.all_notification_panel').hide();
  setorganizationDetail(id)
  updateURLTitle("organization/view/"+id, "Organizations"); 
});

function setorganization()
{ $.post(baseurl+'pages/organizations',{getorganization:'all'},function(data){$('.mail-content-area').html(data);});
}
function setorganizationTable(pid='', user='', per)
{ $.post(baseurl+'pages/organizationsTable',{getorganizationlist:'all',pid:pid, user:user, perpage:per},function(data){$('.organization-content-area').html(data);});
}
 

function setorganizationDetail(id='')
{  $.post(baseurl+'pages/organizationsViewData/'+id,{getorganization:'all'},function(data){$('.mail-content-area').html(data);});
}

$(document).on('click','.nav_persons',function(e){  
  e.preventDefault();
  $('.switch_loader_area').show();
  $('.cs-loader').show();
  changeNavOAClass(this);
  setpersons();
  updateURLTitle("persons", "Persons"); 
});

function setpersons()
{  $.post(baseurl+'pages/persons',{setpersons:'all'},function(data){$('.mail-content-area').html(data);});
}
function setpersonsData(pid='', user='', per='')
{  $.post(baseurl+'pages/personsData',{setpersons:'all',pid:pid, user:user, perpage:per},function(data){$('.person-content-area').html(data);});
}



$(document).on('click','.nav_report',function(e){ 
e.preventDefault();
changeNavOAClass(this);
setdashboardreport(); 
$('.mail-content-area').html('');
updateURLTitle("reports/dashboard", "Reports");  
});

function setdashboardreport()
{   $.post(baseurl+'reports/getDashboard',{getDashboard:'all'},function(data){ 
    if(data!='')
    {   json = JSON.parse(data); 
      dashboardReportHeader(json);  
      setReportHeight();
    } 
   });
}

function getReportDashboardData(date1='', date2='', user='', org = '', pipeline='', contact='', team='', label='')
{   $.post(baseurl+'reports/getDashboardData',{getDashboard:'all', startDate:date1, endDate:date2, user:user, org:org, contact: contact, pipeline:pipeline, team:team,label:label},function(data){  
  //console.log(data);
  if(data!='')
  {  json = JSON.parse(data); 
     dashboardReportData(json); 
  }
    });
}

$(document).on('click','.nav_DSR_report',function(e){  
 e.preventDefault();
 changeNavOAClass(this);
 setdsrreport(); 
 updateURLTitle("reports/dsr", "Daily Sales Report"); 
});

function setdsrreport()
{  $.post(baseurl+'reports/getDailySale',{getDSR:'all'},function(data){$('.mail-content-area').html(data);});
   setReportHeight()
}
function setdsrreportData(date1 = '', date2 = '', user= '')
{  $.post(baseurl+'reports/getDailySaleData',{getDSR:'all', startDate:date1, endDate:date2, user:user},function(data){$('#report_filterData').html(data);});
}

$(document).on('click','.nav_lead_report',function(e){  
  e.preventDefault();
  changeNavOAClass(this);
  setleadreport();
  updateURLTitle("reports/leads", "Lead Reports");
});

function setleadreport()
{  $.post(baseurl+'reports/leadreport',{getleadreport:'all'},function(data){$('.mail-content-area').html(data);});
}



$(document).on('click','.nav_quotation_report',function(e){  
  e.preventDefault();
  changeNavOAClass(this);
  setquotationreport();
  updateURLTitle("reports/quotation", "Quotation Reports");
});

function setquotationreport()
{  $.post(baseurl+'reports/quotationreport',{getquotationreport:'all'},function(data){$('.mail-content-area').html(data);});
}

$(document).on('click','.nav_client_database',function(e){ 
e.preventDefault(); 
$('.switch_loader_area').show(); 
$('.cs-loader').show();
 changeNavOAClass(this);
 $.post(baseurl+'pages/clientDatabase',{getclientdb:'all'},function(data){$('.mail-content-area').html(data);});
 var new_url=baseurl+"client-database";
 window.history.pushState("data","Clients Database",new_url);
 document.title="Clients Database";
});

function setclientdatabase()
{  $.post(baseurl+'pages/clientDatabase',{getclientdb:'all'},function(data){$('.mail-content-area').html(data);});
} 

function setclientdatabaseData(pid='', user='', per='')
{  $.post(baseurl+'pages/clientDatabaseData',{getclientdbdata:'all',pid:pid, user:user, perpage:per},function(data){$('.contact_database_content_area').html(data);});
}

$(document).on('click','.sl_open_lead',function(e){ 
 e.preventDefault();
 $('.switch_loader_area').show();
 var lead = $(this).attr("set");
 $('.cs-loader').show();
 $('.all_notification_panel').hide(); 

 $.post(baseurl+'pages/openlead/'+lead,{openlead:lead},function(data){$('.mail-content-area').html(data);});
 updateURLTitle("lead/"+lead, "Lead"); 
});

$(document).on('click','.sl_open_lead_dt',function(e){ 
 e.preventDefault();
 //$('.switch_loader_area').show();
 var lead = $(this).attr("set");
 $('.cs-loader').show();
 //$('.all_notification_panel').hide(); 
 //$('.lms_content_desk').hide(); 
 color = $(this).attr("color") || 0;
 $('.lastOpenLeadShort').val(lead);
 $('.leads-detail-area').attr("class",  "leads-detail-area");
 $('.leads-detail-area').addClass("tgbr"+color);
 $('.leads-detail-area-inner').html('<div class="switch_loader"></div>');
 $('.leads-detail-area').show('slide', { direction: 'right' }, 400); 
 loadleadDeailPopup(lead);

 //updateURLTitle("lead/"+lead, "Lead"); 
});

function loadleadDeailPopup(lead='')
{
  $.post(baseurl+'pages/openlead/'+lead,{openlead:lead,short:1},function(data){$('.leads-detail-area-inner').html(data);});
}

$(document).on('click', '.closeLeadDetail', function(){
  $('.leads-detail-area').hide('slide', { direction: 'right' }, 400);  
  //updateURLTitle("lms", "Workboard");
  $('.leads-detail-area-inner').html('');
})
$(document).on('click','.sl_org_contact',function(e){ 
  e.preventDefault();
  var org = $(this).attr("set"); 
  setcontacts(org); 
  updateURLTitle("contacts/"+org, "Contact"); 
});

$(document).on('click','.nav_contact_detail',function(e){  
  e.preventDefault();
   var id = $(this).attr("set");
  $('.cs-loader').show();
  $('.all_notification_panel').hide();
  setcontactDetail(id)
  updateURLTitle("contact/view/"+id, "Contact"); 
});

function setcontacts(org)
{  $.post(baseurl+'pages/contacts/'+org,{getcontacts:org},function(data){$('.mail-content-area').html(data);});
}

function setcontactDetail(id='')
{  $.post(baseurl+'pages/contactViewData/'+id,{getcontact:'all'},function(data){$('.mail-content-area').html(data);});
}


//=================================================================================

$(document).on('click','.nav_approvals',function(e){  
e.preventDefault();
changeNavOAClass(this);
$.post(baseurl+'pages/approvals',{getapprovals:'all'},function(data){$('.mail-content-area').html(data);});
  updateURLTitle("approvals/", "Approvals"); 
});

function setapprovals()
{ $.post(baseurl+'pages/approvals',{getapprovals:'all'},function(data){$('.mail-content-area').html(data);});
}
 
function setapprovalsTable()
{   $.post(baseurl+'pages/approvalTable',{getapprovaldata:'all', status:'1'},function(data){$('.approval-content-area').html(data);});
}
 
$(document).on('click','.nav_clouds',function(e){  
e.preventDefault();
changeNavOAClass(this);
$.post(baseurl+'cloud/getcloud',{getcloud:'all'},function(data){$('.mail-content-area').html(data);});
 var new_url=baseurl+"cloud/my";
 window.history.pushState("data","Cloud",new_url);
 document.title="Cloud";
});


function setcloudcontent(keyid='')
{ 
  var new_url = baseurl+"cloud/my/"+keyid;
  window.history.pushState("data","Title",new_url); 
  $.post(baseurl+'cloud/getcloud/'+keyid,{getcloud:'all'},function(data){$('.mail-content-area').html(data);});
}

function setcloudcontentlist(keyid='')
{  
    $.post(baseurl+'cloud/getcloudData/'+keyid,{getcloudlist:'all'},function(data){$('.cloudContent').html(data);});
} 

function setcloudtrashcontent()
{
  var new_url = baseurl+"cloud/trash";
  window.history.pushState("data","Title",new_url); 
  $.post(baseurl+'cloud/getTrash/',{gettrash:'all'},function(data){$('.mail-content-area').html(data);});
}

function setcloudtrashcontentlist()
{   $.post(baseurl+'cloud/gettrashData',{getcloudlist:'all'},function(data){$('.cloudContent').html(data);});
}

function setcloudsharecontent()
{  var new_url = baseurl+"cloud/share";
   window.history.pushState("data","Title",new_url); 
   $.post(baseurl+'cloud/getShare/',{getshare:'all'},function(data){$('.mail-content-area').html(data);});
}

function setcloudsharecontentlist()
{
    $.post(baseurl+'cloud/getshareData/',{getshare:'all'},function(data){$('.cloudContent').html(data);});
}

function setError()
{  $.post(baseurl+'errors/getUserError',{seterror:'All'},function(data){$('.mail-content-area').html(data);});
}

//=================================================================================

$(document).on('click','.nav_calendar',function(e){ 
e.preventDefault();
changeNavOAClass(this);
$.post(baseurl+'calendar/getCalendar',{setcalender:'all'},function(data){$('.mail-content-area').html(data);});
updateURLTitle("calendar", "Calendar"); 
});

function setcalender(view='', date='')
{
  $.post(baseurl+'calendar/getCalendar',{setcalender:'all', date:date, view:view},function(data){$('.mail-content-area').html(data);});
} 
//=================================================================================
 
$(document).on('click','.nav_userlogs',function(e){ 
e.preventDefault(); 
changeNavOAClass(this);
$.post(baseurl+'pages/userlogs/',{setuserlogs:'all'},function(data){$('.mail-content-area').html(data);});
 updateURLTitle("userlogs", "User logs"); 
});



$(document).on('click','.nav_mails',function(e){ 
  e.preventDefault(); 
  $('#mail_filterData').show();
  $('#mail_open_filterData').html('');
  $('#mail_open_filterData').hide();
  changeNavAClass(this);
  $.post(baseurl+'mail/mailinbox/',{setmails:'all'},function(data){$('.mail-content-area').html(data);});
  updateURLTitle("mail/inbox", "Inbox");  
});

$(document).on('click','.nav_mail_send',function(e){ 
  e.preventDefault(); 
  getmailsentData();
  $('#mail_open_filterData').html('');
  updateURLTitle("mail/sent", "Sent Mail | Salestown");  
}); 

$(document).on('click','.nav_mail_inbox',function(e){ 
  e.preventDefault(); 
  getmailinboxdataData();
  $('#mail_open_filterData').html('');
  updateURLTitle("mail/inbox", "Inbox - Mail | Salestown");  
});



$(document).on('click','.nav_mail_important',function(e){ 
  e.preventDefault(); 
  getmailimportantData();
  $('#mail_open_filterData').html('');
  updateURLTitle("mail/important", "Important - Mail | Salestown");  
});


$(document).on('click','.ns_mail_open_outside',function(e){ 
  //e.preventDefault();
  tag  = $(this).attr("tag"); 
  type = $(this).attr("type") || 'inbox'; 
  //getmailinbox(tag);
  getmailopenDetail(type, tag);
  updateURLTitle("mail/open/"+type+"/"+tag, "Mail"); 
});




function getmailinbox(mailid='')
{  
  $.post(baseurl+'mail/mailinbox'+mailid,{getmails:mailid},function(data){$('.mail-content-area').html(data);});
} 

function getmailinboxdataData(pid='', type)
{  
   //$('#mail_filterData').html('');
   $.post(baseurl+'mail/mailinboxdata',{pid:pid, type:type},function(data){$('#mail_filterData').html(data);});
   $('#mail_filterData').show();
   // $('#mail_open_filterData').hide();
   $('.nav_mails').addClass("active");
} 

function getmailsent()
{ $.post(baseurl+'mail/mailsent',{},function(data){$('.mail-content-area').html(data);});
}

function getmailsentData(pid='')
{ 
   $.post(baseurl+'mail/mailsentdata',{pid:pid},function(data){$('#mail_filterData').html(data);});
   $('#mail_filterData').show();
   // $('#mail_open_filterData').hide();
}

$(document).on('click','.ns_mail_open',function(event){
  if($(event.target).closest(".mail-checkbox").length ===  0 && $(event.target).closest(".mark_favorite").length ===  0) 
  {
    $('.cs-loader').show();
    tag=$(this).attr("tag"); 
    $(this).removeClass("unread");
    type = $('#defaultPage').val() || 'inbox'; 
    getmailopenData(type, tag);
    updateURLTitle("mail/open/"+type+"/"+tag, "Mail");  
  }
}); 


function getmailopenDetail(type, mail)
{
    $.post(baseurl+'mail/mailopen/'+type+'/'+mail,{},function(data){$('.mail-content-area').html(data);});
}
function getmailopneinbox(tag)
{ 
   $.post(baseurl+'mail/openmail/'+tag,{openmails:'all'},function(data){$('#mail_filterData').html(data);});
}

function getmailopenData(type, mail)
{ 
  $.post(baseurl+'mail/openmailData/'+type+'/'+mail,{openmails:'all'},function(data){$('#mail_open_filterData').html(data);});
  $('#mail_filterData').hide();
  $('#mail_open_filterData').show();
}


function getmailimportant(tag='')
{ $.post(baseurl+'mail/mailimportant/'+tag,{importance:'all'},function(data){$('.mail-content-area').html(data);});
}

function getmailimportantData(pid='')
{
   $.post(baseurl+'mail/mailimportantdata',{importance:'all',pid:pid},function(data){$('#mail_filterData').html(data);}); 
   $('#mail_filterData').show();
   // $('#mail_open_filterData').hide();
}


$(document).on('click','.nav_mail_trash',function(e){ 
  e.preventDefault();  
  getmailtrashData(); 
  // $('#mail_open_filterData').html('');
  updateURLTitle("mail/trash", "Trash - Mail | Salestown");  
});

function getmailtrash(tag='')
{ $.post(baseurl+'mail/mailtrash/'+tag,{trash:'all'},function(data){$('.mail-content-area').html(data);});
}

function getmailtrashData(pid='')
{
   $('#mail_filterData').html('');
   $.post(baseurl+'mail/mailTrashData',{trash:'all',pid:pid},function(data){$('#mail_filterData').html(data);}); 
   // $('#mail_open_filterData').hide();
   $('#mail_filterData').show();
}

$(document).on('click','.new_compose_mail',function(e){ 
  e.preventDefault();  
  getmailcomposeData(); 
  $('#mail_open_filterData').html('');
  updateURLTitle("mail/compose", "Compse - Mail | Salestown");  
});

function getmailcompose(tag='')
{ $.post(baseurl+'mail/mailcompose/'+tag,{trash:'all'},function(data){$('.mail-content-area').html(data);});
}

function getmailcomposeData(pid='')
{
   //$('#mail_filterData').html('');
   $('#mail_open_filterData').hide();
   $('#mail_filterData').hide();
   $('#mail_open_filterData').show();
   $.post(baseurl+'mail/mailcomposeData',{compose:'all',pid:pid},function(data){$('#mail_open_filterData').html(data);});  
}

function getmailsearch(keyword)
{
   keyword = decodeURIComponent(keyword);
   $.post(baseurl+'mail/mailsearch',{search:keyword},function(data){$('.mail-content-area').html(data);});
}

function mailAdvaneSearch(data)
{
   data = decodeURIComponent(data);
   $.post(baseurl+'mail/mailAdvaneSearch',{search:data},function(data){$('.mail-content-area').html(data);});
}


function setuserlogs(user='')
{
  $.post(baseurl+'pages/userlogs/',{setuserlogs:'all',user:user},function(data){$('.mail-content-area').html(data);});
    var new_url = baseurl+"userlogs";
}
function getuserlogsData()
{  $.post(baseurl+'pages/userlogsdata',{},function(data){$('#log_filterData').html(data);});
}

function setuser_logs(user='',fromDate='',toDate='')
{
  $.post(baseurl+'/ajax/user-logs.php',{setuser_logs:'All',user:user,fromDate:fromDate,toDate:toDate },function(data){$('#sl_datafield').html(data);});
}


function setpipeline(pid='')
{   $('.modal').modal('hide'); 
  $.post(baseurl+'/pages/getpipeline/'+pid,{getpipeline:'all'},function(data){$('.mail-content-area').html(data);});
}

function getpipelineDetail(pipeline='')
{   $.post(baseurl+'/pages/getpipelineDetail/'+pipeline,{getpipeline:'all'},function(data){$('.pipeline_contentArea').html(data);});
}
 


/*function setreportDashboard(){
  $.post(baseurl+'reports/getDashboard',{getDashboard:'all'},function(data){$('.mail-content-area').html(data);});
}*/



/*function setdailySaleReport()
{ 
   $.post(baseurl+'reports/getDailySale',{},function(data){$('.mail-content-area').html(data);});
}
*/

  

function openlead(lead)
{  $.post(baseurl+'pages/openlead/'+lead,{openlead:lead},function(data){
   if(data != '')
   { 
     $('.mail-content-area').html(data);
   }
   else
   { 
      setlms();
      var new_url=baseurl+"lms";
      window.history.pushState("data","LMS",new_url);
      document.title="LMS";
   }
   });
}


/*
function setleaddetail(deal)
{  $.post(baseurl+'/ajax/deal.php',{getlead:deal},function(data){$('#sl_datafield').html(data);});
}
*/


function setcontactsTable(org)
{   $.post(baseurl+'/pages/contactsTable/'+org,{getcontacts:org},function(data){$('.contact-content-area').html(data);});
}

//  alert('fgdgdg')
// window.onpopstate = function(e) {
//    // executed when using the back button for example
// var curl = location.href;
// var rurl = curl.replace(baseurl, "");
// alert(rurl)
// return false;
//   $('.all_notification_panel').hide();
// if(rurl == "lms")
// {  setlms();
// }
// if(rurl == "activity")
// {  setactivity();
// }
// if(rurl == "organizations")
// {  setorganization();
// }
// if(rurl == "persons")
// {  setpersons();
// }
// if(rurl == "pipeline")
// {
//   $('.nav .nav-item').removeClass("active"); 
//     setpipeline();
// }
// if(rurl == "approvals")
// {
//   $('.nav .nav-item').removeClass("active"); 
//     setapprovals();
// }
// if(rurl == "calendar")
// {
//   $('.nav .nav-item').removeClass("active"); 
//     setcalender();
// }
// if(rurl == "userlogs")
// {   setuserlogs();
// }
// if(rurl == "mail/inbox")
// {   getmailinbox();
// }
// if(rurl == "client-database")
// {  setclientdatabase();
// }
// if(rurl == "cloud")
// {  setcloudcontent();
// }
// if(rurl == "goals")
// {  setgoals();
// }
// if(rurl == "prospects")
// {  setprospects();
// }
// if(rurl == "products")
// {  setproducts();
// }
// if(rurl == "social")
// {  setTelegramChat();
// }
// if(rurl == "lead-nurturing")
// {  setleadnurturing();
// }
// else
// {
//   var burl = rurl.split("/"); 
//   if(burl[0] != '' && burl[1] != '')
//   {   
//     if(burl[0] == "lead")
//     {     var lead = burl[1];   
//         openlead(lead);
//     }
//     else if(burl[0] == "contacts")
//     {
//         var org = burl[1];  
//         if(org!='')
//         {  setcontacts(org);
//         } 
//     }
//     else if(burl[0] == "lms" && burl[1] == "pipeline" && burl[2] != '' && burl[3] == "user" && burl[4] != '')
//     {
//         var user = burl[4];  
//         pipeline = burl[2];  
//         if(user!='')
//         {
//            setlms(pipeline, user);
//         } 
//     }

//     else if(burl[0] == "organization" && burl[1] == "view" && burl[2] != '')
//     {
//         var org = burl[2];  
//         if(org!='')
//         {
//            setorganizationDetail(org);
//         } 
//     }
//     else if(burl[0] == "contact" && burl[1] == "view" && burl[2] != '')
//     {
//         var cid = burl[2];  
//         if(cid!='')
//         {
//            setcontactDetail(cid);
//         } 
//     }
//     else if(burl[0] == "user" && burl[1] == "view" && burl[2] != '')
//     {
//         var id = burl[2];  
//         if(id!='')
//         {
//            setUserView(id);
//         } 
//     }

//     else if(burl[0] == "reports")
//     {
//       if(burl[1] != '' && burl[1] == "dashboard")
//       {
//                 setdashboardreport()
//       }
//       else if(burl[1] != '' && burl[1] == "dsr")
//       {
//                 setdsrreport();
//       }
//       else if(burl[1] != '' && burl[1] == "leads")
//       {
//                 setleadreport();
//       } 
//       else if(burl[1] != '' && burl[1] == "quotation")
//       {
//                 setquotationreport();
//       }  

//     }
//     else if(burl[0] == "mail" && burl[1] == "inbox" && burl[2] == '')
//     {
//        getmailinbox();
//     }

//     else if(burl[0] == "mail" && burl[1] == "inbox" && burl[2] != '')
//     {
//        getmailinbox(burl[2]);
//     }

//     else if(burl[0] == "mail" && burl[1] == "search" && burl[2] != '')
//     {
//        getmailsearch(burl[2]);
//     }
//     else if(burl[0] == "mail" && burl[1] == "advanced_search" && burl[2] != '')
//     {
//        mailAdvaneSearch(burl[2]);
//     }

//     else if(burl[0] == "mail" && burl[1] == "open" && burl[2] != '' && burl[3] != '')
//     {
//        getmailopenDetail(burl[2], burl[3]);
//     }

//     else if(burl[0] == "mail" && burl[1] == "sent")
//     {
//        getmailsent(burl[2]);
     
//     }
//     else if(burl[0] == "mail" && burl[1] == "important")
//     {
//        getmailimportant(burl[2]);
//     }
//     else if(burl[0] == "cloud" && burl[1] == "my")
//     {
//        setcloudcontent();
//     }
//     else if(burl[0] == "cloud" && burl[1] == "trash")
//     {
//        setcloudtrashcontent();
//     }
//     else if(burl[0] == "cloud" && burl[1] == "share")
//     {
//        setcloudsharecontent();
//     }
//   } 
// }
// };


/*$(document).on('click','.contact_db .page-item',function(){
  var page = $(this).attr('set');
  $('.contact_db .page-item').removeClass("active");
  $(this).addClass("active"); 
  $.post(baseurl+'/ajax/contact-database.php',{getcontactdatabase:'All',page:page},function(data){$('#sl_datafield').html(data);}); 
});*/

/*$(document).on('click', '', function(){

});*/


$(document).on('click','.nsv_user_view',function(e){ 
 e.preventDefault(); 
 var id = $(this).attr('set') || '0';
 setUserView(id);
 updateURLTitle("user/view/"+id, "User Detail"); 
});

function setUserView(user_id='')
{  $.post(baseurl+'/pages/getUserViewData/'+user_id, {getuser:'All'},function(data){$('.mail-content-area').html(data);}); 
}

//feedback 
function setfeedback()
{
   $.post(baseurl+'/feedback/setfeedback/', {getform:'All'},function(data){$('.mail-content-area').html(data);}); 
}

function setfeedbackthank()
{
   $.post(baseurl+'/feedback/setfeedbackthank/', {getform:'All'},function(data){$('.mail-content-area').html(data);}); 
}

$(document).on('click','.nav_products',function(e){  
  e.preventDefault(); 
  $('.switch_loader_area').show();
  $('.cs-loader').show();
  changeNavAClass(this);
  setproducts()
  updateURLTitle("products", "Products"); 
});

function setproducts()
{ $.post(baseurl+'products/setproducts',{setproducts:'all'},function(data){$('.mail-content-area').html(data);});
}
function setproductsData(pid='', user='')
{  $.post(baseurl+'products/setproductsData',{setproducts:'all',pid:pid, user:user},function(data){$('.product-content-area').html(data);});
   $('.nav_products').addClass("active");
}

$(document).on('click','.nav_product_detail',function(e){  
  e.preventDefault();
  var id = $(this).attr("set");
  $('.cs-loader').show();
  $('.all_notification_panel').hide();
  setproductDetail(id)
  //updateURLTitle("product/view/"+id, "Product"); 
}); 

$(document).on('click', '.closePdDt', function(){
  //$('.nurturing-stage-setting').hide();
  $('.product-detail-area').hide('slide', { direction: 'right' }, 400); 
  $('.product-detail-area').html('');
})

function setproductDetail(id='')
{  
   $('.product-detail-area').show('slide', { direction: 'right' }, 400);  
   $('.product-detail-area').html('<div class="switch_loader"></div>');
   $.post(baseurl+'products/productViewData/'+id,{getproduct:'all'},function(data){$('.product-detail-area').html(data);});
}

$(document).on('click','.nav_goals',function(e){  
  e.preventDefault();  
  $('.cs-loader').show();
  changeNavOAClass(this);
  setgoals();
  updateURLTitle("goals", "Goals"); 
});

function setgoals()
{ $.post(baseurl+'goals/setgoals',{setgoals:'all'},function(data){$('.mail-content-area').html(data);});
}
/*function setgoalsData(pid='', user='')
{ $.post(baseurl+'pages/setgoalsData',{setgoals:'all',pid:pid, user:user},function(data){$('.product-content-area').html(data);});
}*/

$(document).on('click','.nav_prospects',function(e){  
 e.preventDefault(); 
 $('.switch_loader_area').show();
 $('.cs-loader').show();
 changeNavAClass(this);
 setprospects(); 
 updateURLTitle("prospects", "Prospects");
});

function setprospects()
{ $.post(baseurl+'prospects/setprospects',{setprospects:'all'},function(data){$('.mail-content-area').html(data);});
}

function setprospectsData(pid='', user='', type ='', label='')
{ $.post(baseurl+'prospects/setprospectsData',{setprospects:'all',pid:pid, user:user, label:label, type:type},function(data){$('.prospects-content-area').html(data);});
  $('.nav_prospects').addClass("active"); 
}


$(document).on('click','.nav_social_leads',function(e){  
 e.preventDefault(); 
 $('.switch_loader_area').show();
 $('.cs-loader').show();
 changeNavOAClass(this);
 setsocialChat(); 
 updateURLTitle("social", "Social");
});

function setsocialChat(type='')
{ $.post(baseurl+'social/setsocialChat/'+type,{setsocial:'all'},function(data){$('.mail-content-area').html(data);});
}
 

function setFacebookChatData()
{ $.post(baseurl+'social/setFacebookChatData',{setsocial:'all'},function(data){$('.social-content-area').html(data);});
}


function setTelegramChat()
{ $.post(baseurl+'social/setTelegramChat',{setsocial:'all'},function(data){$('.mail-content-area').html(data);});
}

function setTelegramChatData()
{ $.post(baseurl+'social/setTelegramChatData',{setsocial:'all'},function(data){$('.social-content-area').html(data);});
}


$(document).on('click','.nav_lead_nurturing',function(e){  
 e.preventDefault(); 
 $('.switch_loader_area').show();
 $('.cs-loader').show();
 changeNavOAClass(this);
  setleadnurturing(); 
 updateURLTitle("lead-nurturing", "Lead nurturing");
});

function setleadnurturing(type='')
{ $.post(baseurl+'lead_nurturing/setnurturing/'+type,{setnurture:'all'},function(data){$('.mail-content-area').html(data);});
}
  
function setleadnurturingData(pipeline='', user='')
{  $.post(baseurl+'lead_nurturing/setleadData',{setnurture:'all', pipeline:pipeline, user:user},function(data){$('.nurturing-content-area').html(data);});
}
 

 $(document).on('click','.nav_social_publish',function(e){  
 e.preventDefault(); 
 $('.switch_loader_area').show();
 $('.cs-loader').show();
 changeNavOAClass(this);
 setsocialPublish(); 
 updateURLTitle("publish", "Publish");
});

function setsocialPublish(type='')
{  $.post(baseurl+'publish/setsocialPublish/'+type,{setsocial:'all'},function(data){$('.mail-content-area').html(data);});
}
 

function setFbPublishData()
{  $.post(baseurl+'publish/setFbPublishData',{setsocial:'all'},function(data){$('.social-content-area').html(data);});
} 

function setLinkedinPublishData()
{  $.post(baseurl+'publish/setLinkedinPublishData',{setsocial:'all'},function(data){$('.social-content-area').html(data);});
}

// =================================================================================================================
// =================================================================================================================
// =================================================================================================================
// =================================================================================================================
// =================================================================================================================




$(document).on('click', '.mail_desk .mail-checkbox', function()
{  
    countMail_checkbox();
});

function countMail_checkbox()
{   var checkboxes = document.getElementsByName('mail_checkbox[]');
    var k = 0; 
    for (var i=0, n=checkboxes.length;i<n;i++) {   if (checkboxes[i].checked)  { k++; } } 
    if(k>0){  
    $('.mail_desk .action-btn').show(); }  else{  $('.action-btn').hide(); } 
    return k; 
}

$(document).on('click','.mail_desk .delete-mail-btn', function(){
  vals =  getMail_CheckBoxValues();
  if(confirm("Are you sure to delete selected mail?"))
  {  $.post(baseurl+'mail/multipleMails',{mail:vals},function(data){
        $('.action-btn').hide();
        getmailinboxdataData();
     });
  }
}); 



$(document).on('click','.mail_desk .delete-forever-btn', function(){
  vals =  getMail_CheckBoxValues();
  if(confirm("Are you sure to delete selected mail?"))
  {  $.post(baseurl+'mail/multipleMailsForever',{mail:vals},function(data){
        $('.action-btn').hide();
        getmailtrashData();
     });
  }
}); 

$(document).on('click','.mail_desk .restore-mail-btn', function(){
  vals =  getMail_CheckBoxValues();
  if(confirm("Are you sure to restore selected mail?"))
  {  $.post(baseurl+'mail/restoreMultipleMails',{mail:vals},function(data){
        $('.action-btn').hide();
        getmailtrashData();
     });
  }
}); 

function getMail_CheckBoxValues()
 {    var checkboxes = document.getElementsByName('mail_checkbox[]');
      var vals = "";
      for (var i=0, n=checkboxes.length;i<n;i++) 
      {  if (checkboxes[i].checked) 
          {  if(vals == '')
              {  vals +=  checkboxes[i].value;
              } else
              { vals += ","+checkboxes[i].value;
              }          
          }
      }
      return vals;
 }

$(document).on('click','.mail_desk .mark_favorite', function(){
    var mail =  $(this).attr("tag");  
    var status =  $(this).attr("status");  
     
    if(status == 1) 
    {  $(this).attr("status","0");
       $(this).removeClass('importance');
       $(this).parent('td').removeClass('importance');
    }
    else { 
      $(this).attr("status","1"); 
      $(this).addClass('importance');
      $(this).parent('td').addClass('importance');
    }
    $.post(baseurl+'mail/markmailfavorite',{mail:mail,status:status},function(data){console.log(data)});  
});


$(document).on('click','.mail_desk .mail_reply_btn', function(){
  tag = $(this).attr("tag");
  $('.mail_desk .mail_reply_box').hide(); 
  $('.mail_desk .mail_reply_box_'+tag).show(); 

  $('.mail_desk .mail_forward_box').hide(); 
  height = $('.fulltext'+tag).height();

  var x = $('.mail_fd_rp_area'+tag).position();
  height = x.top; 
  //$('.fulltext'+tag).scrollTop(height); 
  $(".mailopenbox").scrollTop(height);

  var selDiv = "";
  var storedFiles = [];
  up = 1;
  $('.mail_desk .mail_reply_box .attach_area').html(''); 
}); 

$(document).on('click','.mail_desk .mail_forward_btn', function(){
  tag = $(this).attr("tag");
  $('.mail_desk .mail_forward_box').hide();
  $('.mail_desk .mail_forward_box'+tag).show(); 
  $('.mail_desk .mail_reply_box').hide(); 
  //$(".mailopenbox").scrollTop(1400);
  var x = $('.mail_fd_rp_area'+tag).position();
  height = x.top; 
  height = parseInt(height) +  50;
  //console.log(height);
  //$('.fulltext'+tag).scrollTop(height); 
  $(".mailopenbox").scrollTop(height);
  }); 

$(document).on('click','.mail_desk .exploremail', function(e)
{ 
  if($(e.target).closest(".ac_drop").length ===  0 && $(e.target).closest(".mark_favorite").length ===  0) 
  {
    tag = $(this).attr("tag");
    $('.fulltext'+tag).toggle();
    $('.subtext'+tag).toggle();
  }
});




$(document).on('click','.mail_desk .mailForwordBtn', function(e)
{
  e.preventDefault(); 
  tag  = $(this).attr("tag"); 
  body = $('.forword_body'+tag).val();
  // body = editor1.getData();

  to   = $('.forword_to_list'+tag).val();
  cc   = $('.forword_cc_list'+tag).val() || '';
  bcc  = $('.forword_bcc_list'+tag).val() || '';
  mail_id = $('.fd_mail'+tag).val();
  var attach = $(".mail_forward_box"+tag+" input[name='attach[]']").map(function(){return $(this).val();}).get();
  if(body.trim()!='')
  {
       $('.doneTaskBox').show();
       $('.doneTaskBox').html('Mail sending...');  
       $.post(baseurl+'mail/forwordMail/',{body:body, mailCc:cc, mailBcc:bcc, tomail:to, mail:mail_id,attach:attach},function(data){  
       if(data!= '')
       {
          json = JSON.parse(data);
          if(json.success == true)
          { 
              $('.doneTaskBox').html('Mail send'); 
              type = $('.mail_back_btn').attr("tag") || 'inbox';
              getmailopenData(type, tag);
              setTimeout(function(){
                  $('.doneTaskBox').hide();
                  $('.doneTaskBox').html('');
              },4000); 
          }
          else
          {  
              $('.doneTaskBox').html('Mail not send'); 
              setTimeout(function(){
                  $('.doneTaskBox').hide();
                  $('.doneTaskBox').html('');
              },3000); 
          }
       } 
     });
  }else{
    alert("Body is required");
  }
});

$(document).on('submit','#mailForwordForm', function(e){
e.preventDefault();  
$('.mailForwordBtn').attr("disabled", true);
var formData = new FormData(document.getElementById('mailForwordForm'));// yourForm: form selector        
$.ajax({
    type: "POST",
    url:  baseurl+"mail/forwordMail",// where you wanna post
    data: formData,
    processData: false,
    contentType: false,
    error: function(jqXHR, textStatus, errorMessage) {
       // console.log(errorMessage); // Optional
        //$('.sv_loder  .fa').hide();
        $('.mailForwordBtn').attr("disabled", false);
    },
    success: function(data) { 
           var arr = JSON.parse(data);
           if(arr.success == true)
           {   
             $('.mailForwordBtn').attr("disabled", false);   
           }else if(arr.success == false){
              $('.mailForwordBtn').attr("disabled", false);
           }
         } 
}); });


$(document).on('click','.mail_desk #composeMailForm .cc-text', function(){
    $('.mail_desk #composeMailForm .cc-box').show();
    $('.mail_desk #composeMailForm .cc-text').hide();
});

$(document).on('click','.mail_desk #composeMailForm .bcc-text', function(){
    $('.mail_desk  #composeMailForm .bcc-box').show();
    $('.mail_desk  #composeMailForm .bcc-text').hide();
});


$(document).on('click','.mail_desk .mail_reply_box .rp-cc-text', function(){
    $('.mail_desk .mail_reply_box .cc-box').show();
    $('.mail_desk .mail_reply_box .cc-text').hide();
});

$(document).on('click','.mail_desk .mail_reply_box .rp-bcc-text', function(){
    $('.mail_desk .mail_reply_box .bcc-box').show();
    $('.mail_desk .mail_reply_box .bcc-text').hide();
});



$(document).on('click','.mail_desk .mail_forward_box .rp-cc-text', function(){ 
    $('.mail_desk .mail_forward_box .cc-box').show(); 
});

$(document).on('click','.mail_desk .mail_forward_box .rp-bcc-text', function(){
    $('.mail_desk .mail_forward_box .bcc-box').show(); 
});

$(document).on('click', '.composeForm .cb_bcc_text', function(e){
   tag = $(this).attr("tag");
   if(tag == 1)
   {
      $(this).attr("tag", "2");
      $(this).html('<i class="fa fa-chevron-up"></i>');
      $('.cc_box').show();
      $('.bcc_box').show();
   }else
   {
      cc = $('#mailComposeCc').val() || '';
      if(cc.trim() == '')
      {
          $('.cc_box').hide(); 
      }
      bcc = $('#mailComposeBcc').val() || '';
      if(bcc.trim() == '')
      {
          $('.bcc_box').hide(); 
      }  
      $(this).attr("tag", "1");
      $(this).html('<i class="fa fa-chevron-down"></i>');
   }
})

$(document).on('click', '.composeMailBtnssss', function(){
   mailto      = $('#mailComposeTo').val() || ''; 
   mailCc      = $('#mailComposeCc').val() || ''; 
   mailBcc     = $('#mailComposeBcc').val() || ''; 
   mailSubject = $('#mailComposeSubject').val() || ''; 
   //alert(mailto);
   //mailBody = '';
   mailBody    = $('#mailComposeBody').val() || '';  
   
   //alert(mailto);
   maildata = {mailto:mailto, mailCc:mailCc, mailBcc:mailBcc, mailSubject:mailSubject, mailBody:mailBody}; 
   if(maildata['mailBody'] != '')
   { 
     $('.showComposeLoader').removeClass("hide");
     $('.doneTaskBox').show();
     $('.doneTaskBox').html('Mail sending...'); 
     $.post(baseurl+'mail/composeMail',{maildata:maildata},function(data){  
     if(data!= '')
     {  json = JSON.parse(data);
        if(json.success == true)
        {
            $('#add_compose').modal('hide');
            //$('.doneTaskBox').show();
            $('.doneTaskBox').html('Mail send'); 
            setTimeout(function(){
                $('.doneTaskBox').hide();
                $('.doneTaskBox').html('');
            },4000);    
            document.getElementById("composeMailForm").reset();
            $('.mail_desk .cc-box').hide();
            $('.mail_desk .bcc-box').hide();
            $('.mail_desk .cc-text').show();
            $('.mail_desk .bcc-text').show();
            CKEDITOR.instances['mailComposeBody'].setData('');
            $(".tagsinput").tagsinput('removeAll');
            $('.composeMail_area').hide();
        }
        else if(json.success == false)
        {
            if(typeof json.error !== '')
            {
                alert(json.error);
            }else
            {   alert("Something went wrong");
            }
           
            $('.doneTaskBox').html('Mail not send'); 
            setTimeout(function(){
                $('.doneTaskBox').hide();
                $('.doneTaskBox').html('');
            },2000);  
            $('.composeMail_area').hide();
        } 
        $('.showComposeLoader').addClass("hide");
         
     }}); 
   }else
   {
      alert('Body is required');
   }
});

$(document).on('click', '.cancelBtn', function(){
     $('.mail_desk .reply-box').hide();
     $('.mail_desk .mail_forward_box').hide();
});

$(document).on('click', '.nav_mail_inbox_refresh', function(){
   $('.doneTaskBox').show(); 
   $('.doneTaskBox').html('Loading....'); 
    setTimeout(function(){
        $('.doneTaskBox').hide();
        $('.doneTaskBox').html('');
   },2000);  
   getmailinboxdataData();
});

$(document).on('click', '.nav_mail_sent_refresh', function(){
   $('.doneTaskBox').show(); 
   $('.doneTaskBox').html('Loading....'); 
    setTimeout(function(){
        $('.doneTaskBox').hide();
        $('.doneTaskBox').html('');
   },2000);  
   getmailsentData();
});

$(document).on('click', '.nav_mail_important_refresh', function(){
   $('.doneTaskBox').show(); 
   $('.doneTaskBox').html('Loading....'); 
    setTimeout(function(){
        $('.doneTaskBox').hide();
        $('.doneTaskBox').html('');
   },2000);  
   getmailimportantData();
});

$(document).on('click', '.mail_desk .selecteAll', function(){
    if($('.mail_desk .selecteAll').is(":checked"))
    {
       $('.mail_desk .mail-checkbox').prop('checked', true);
       $('.mail_desk .action-btn').show();
    }else
    {
       $('.mail_desk .mail-checkbox').prop('checked', false);
       $('.mail_desk .action-btn').hide();
    }
})
 
$(document).on('submit', '#mail_inbox_search_input', function(e){
   e.preventDefault();
   var keyword = $('.mail_inbox_search_input').val();
   if(keyword.trim()!='')
   { 
       $('.doneTaskBox').show(); 
       $('.doneTaskBox').html('Loading....'); 
        setTimeout(function(){
            $('.doneTaskBox').hide();
            $('.doneTaskBox').html('');
       },2000);  
      serachMailData(keyword);
   }
});



function serachMailData(keyword='', pid='')
{
   $.post(baseurl+'mail/searchmailData',{search:keyword, pid:pid},function(data){$('#mail_filterData').html(data);});
    $('.mail_desk #activeSearch').val(keyword);
    urlkeyword = encodeURIComponent(keyword);
    updateURLTitle("mail/search/"+urlkeyword, "Search");  
}

$(document).on('click', '.mail_back_btn', function(){
  $('#mail_filterData').show();
  $('#mail_open_filterData').html('');
  $('#mail_open_filterData').hide();
   type     = $(this).attr("tag") || 'inbox';
   pid      = $('#pagination').val() || '1';
   ishtml     = $('.mail_loader').html() || '';
  // hasclass = $('#mail_filterData').hasClass("mail_loader");
   //console.log(ishtml);
   if(ishtml != '')
   {
      if(type == "inbox")
       { 
          subtype = $(this).attr("type") || '1';
          getmailinboxdataData(pid, subtype);

          page = $('#pagination_tp_'+subtype).val() || '1';
          getmailinboxPages(page, subtype);
          updateURLTitle("mail/"+type, "Inbox");  
       }
       if(type == "sent")
       {  
          getmailsentData(pid);
          updateURLTitle("mail/"+type, "Sent");  
       }
       if(type == "important")
       { 
          getmailimportantData(pid);
          updateURLTitle("mail/"+type, "Important");  
       }
       if(type == "trash")
       { 
          getmailtrashData(pid);
          updateURLTitle("mail/"+type, "Trash");  
       }
   }
   else
   {
      if(type == "inbox")
       { 
          updateURLTitle("mail/"+type, "Inbox");  
       }
       if(type == "sent")
       { 
          updateURLTitle("mail/"+type, "Sent");  
       }
       if(type == "important")
       { 
          updateURLTitle("mail/"+type, "Important");  
       }
       if(type == "trash")
       { 
          updateURLTitle("mail/"+type, "Trash");  
       }
   } 
})
function setPageId(id)
{  $('#pagination').val(id);
}

$(document).on('click', '.delete_btn_single', function(){
    tag = $(this).attr("tag");
    if(confirm("Are you sure to delete selected mail?"))
    {  $.post(baseurl+'mail/multipleMails',{mail:tag},function(data){
          if(data!='')
          {
             json = JSON.parse(data);
             if(json.success == true)
             { 
               type = $('.mail_back_btn').attr("tag") || 'inbox';
               pid = $('#pagination').val() || '1';
               if(type == "inbox")
               { 
                  getmailinboxdataData(pid);
                  updateURLTitle("mail/"+type, "Inbox");  
               }
               if(type == "sent")
               {  
                  getmailsentData(pid);
                  updateURLTitle("mail/"+type, "Inbox");  
               }
               if(type == "important")
               { 
                  getmailimportantData(pid);
                  updateURLTitle("mail/"+type, "Important");  
               } 
             }
          } 
       });
    }
});

$(document).on('click', '.restore_mail_btn_single', function(){
    tag = $(this).attr("tag");
    if(confirm("Are you sure ?"))
    {  $.post(baseurl+'mail/restoreMultipleMails',{mail:tag},function(data){
          if(data!='')
          {
             json = JSON.parse(data);
             if(json.success == true)
             { 
                pid = $('#pagination').val() || '1';
                getmailtrashData(pid);
                updateURLTitle("mail/"+type, "Trash");  
             }
          } 
       });
    }
});

$(document).on('click', '.delete_forever_btn_single', function(){
    tag = $(this).attr("tag");
    if(confirm("Are you sure to delete selected mail?"))
    {  $.post(baseurl+'mail/multipleMailsForever',{mail:tag},function(data){
          if(data!='')
          {
             json = JSON.parse(data);
             if(json.success == true)
             { 
               type = $('.mail_back_btn').attr("tag") || 'inbox';
               pid = $('#pagination').val() || '1';
               if(type == "inbox")
               {  getmailinboxdataData(pid);
                  updateURLTitle("mail/"+type, "Inbox");  
               }
               if(type == "sent")
               {  getmailsentData(pid);
                  updateURLTitle("mail/"+type, "Inbox");  
               }
               if(type == "important")
               {  getmailimportantData(pid);
                  updateURLTitle("mail/"+type, "Important");  
               }
               if(type == "trash")
               {  getmailtrashData(pid);
                  updateURLTitle("mail/"+type, "Trash");  
               } 
             }
          } 
       });
    }
});

$(document).on('click', '.mail_sent_pagination .nextPage', function(){
  tag = $(this).attr("tag");
  getmailsentData(tag);
});
  
$(document).on('click', '.mail_sent_pagination .prevPage', function(){
  tag = $(this).attr("tag");
  getmailsentData(tag);
});

$(document).on('click', '.mail_important_pagination .nextPage', function(){
  tag = $(this).attr("tag");
  getmailimportantData(tag);
});

$(document).on('click', '.mail_important_pagination .prevPage', function(){
  tag = $(this).attr("tag");
  getmailimportantData(tag);
});

$(document).on('click', '.mail_search_pagination .nextPage', function(){
  tag = $(this).attr("tag");
  keyword = $('.mail_desk #activeSearch').val(); 
  serachMailData(keyword, tag);
});

$(document).on('click', '.mail_search_pagination .prevPage', function(){
  tag = $(this).attr("tag");
  keyword = $('.mail_desk #activeSearch').val(); 
  serachMailData(keyword, tag);
});


function checkNewMail()
{
  if(typeof mailcheck !== "undefined" )
  {
    if(mailcheck == 1)
    {
       //alert(mailcheck);
       //setTimeout(function(){ checkNewMail() }, 3000);
    } 
  } 
}

$(document).on('keyup', '.mail_desk .mail_inbox_search_input', function(){ 
   $('.mailsearchIcon .search').hide();
   $('.mailsearchIcon .searching').show(); 
   delay(function(){ 
    var val = $('.mail_inbox_search_input').val();
    val     = val.trim();
    var n   = val.length; 
    htmltxt = ''; 
    if(n > 1)
    {  
         $.post(baseurl+"action/searchMailData",{keyword:val},function(data){  
         var json = JSON.parse(data);  
          $('.mailsearchIcon .searching').hide();
          $('.mailsearchIcon .search').show();  
          $('.mail_search_suggest').show();
         searchtxt = ''; 
         if(typeof json.data !== undefined)
         {   
             //console.log(json.data);
             for(ii in json.data)
             { 
                searchtxt+= '<a href="javascript:void(0)" class="list-group-item searchThisText"> '+json.data[ii]+' </a>';
             }  
         } 
         else 
         {   leadtxt+= '<a href="javascript:void(0)" class="list-group-item">No lead found</a>'; 
         }
         $('.mail_search_suggest').html(searchtxt);
           
       });
    }else{
      $('.mailsearchIcon .searching').hide();
      $('.mailsearchIcon .search').show();
      $('.mail_search_suggest').html('');
    }
  }, 600);
 });

$(document).on('click', '.searchThisText', function(){
    text = $(this).text();
    text = text.trim();
    $('.mail_inbox_search_input').val(text);
    $( "#mail_inbox_search_input" ).submit();
});


function mailOpenStyleSet_old(val)
{   
  //var val = $(this).html();
  val = val.replace(/(\r\n|\n|\r)/gm, "");
  val = val.replace(/<\!--.*?-->/g, ""); 
  val = val.replace(/\/\*.+?\*\/|\/\/.*(?=[\n\r])/g, ''); 
  //val = text.replace(/<!--(.*)-->[\s]*/g, '');
  val1 = val.split("}");
  val3 = '';
  for(ii in val1)
  {
     v1 = val1[ii];
     v2 = v1.split("{");

     v3 = v2[0];
     v4 = v3.split(",");
     v5 = '';
     for(jj in v4)
     {
        v55 = ' .sales_mailBody '+v4[jj].trim()+', ';
        v5+= v55.trim();
     }
     var v5 = v5.substring(0, v5.length-1);
     if(typeof v2[1] !== "undefined")
     {
        v6     = ' {'+v2[1].trim()+'} ';
        val3+= v5+v6 ;
     } 
  } 
  return val3; 
}

function mailOpenStyleSet(val_in)
{   
    //var val = $(this).html(); 
    val = val_in.replace(/(\r\n|\n|\r)/gm, "");
    val = val.replace(/\s\s+/g, ' '); 
    val = val.replace(/\/\*.+?\*\/|\/\/.*(?=[\n\r])/g, ''); 
    val = val.trim();
    //val = text.replace(/<!--(.*)-->[\s]*/g, '');
    val1 = val.split("}}");
    if(typeof val1[1] === "undefined")
    {  
      val1 = val.split("} }");
    } 
   // console.log(val);
    val3 = '';
    if(typeof val1[1] !== "undefined")
    { 
      for(ii in val1)
      { 
         v1 = val1[ii];  
         v2 = v1.split("@");
           if(typeof v2[1] !== "undefined")
           {
              v3_1 = v2[0]; 
              v4_1 = v3_1.split("}"); 
              for(iik in v4_1)
              {
                 v5_1 = v4_1[iik];
                 v6_1 = v5_1.split("{");

                 v7_1 = v6_1[0];
                 v8_1 = v7_1.split(",");
                 v5 = '';
                 for(jjk in v8_1)
                 { 
                    sub1 = v8_1[jjk].trim();
                    if(sub1 == "*" || sub1 == "body" || sub1 == "html")
                    {
                       v55 = '.sales_mailBody,';
                    }
                    else
                    {
                       v55 = '.sales_mailBody '+v8_1[jjk].trim()+',';
                    }
                    
                    v5+= v55.trim();
                 }
                 var v5 = v5.substring(0, v5.length-1);
                 if(typeof v6_1[1] !== "undefined")
                 {
                    v6     = '{'+v6_1[1].trim()+'}';
                    val3+= v5+v6 ;
                 } 
              } 
           //val3+= v5Str ;

             v3 = v2[1]; 
             v4 = v3.split("){");
             if(typeof v4[1] === "undefined")
             { 
               v4 = v3.split(") {");
             }
             if(typeof v4[1] !== "undefined")
             {
               val3+= "@"+v4[0]+'){' ;
               v_2 = v4[1].split("}"); 
               for(kl in v_2)
               {
                 v_3 = v_2[kl];
                 v5 = v_3.split(","); 
                 v5Str = '';
                 for(jj in v5)
                 {
                    sub1 = v5[jj].trim();
                    if(sub1 == "*" || sub1 == "body" || sub1 == "html")
                    {
                       v55 = '.sales_mailBody,';
                    }
                    else
                    {
                       v55 = ' .sales_mailBody '+v5[jj].trim()+', ';
                    }
                    
                    v5Str+= v55.trim(); 
                 }
               var v5Str = v5Str.substring(0, v5Str.length-1);
               v5Str+= '}';
               if(typeof v2[1] !== "undefined")
               { 
                  val3+=  v5Str  ;
               }  
               } 
               val3+= "}" ;
             }
           } 
      } 
    }
    else
    {
      val1 = val.split("}");
      val3 = '';
      for(ii in val1)
      {
         v1 = val1[ii];
         v2 = v1.split("{");

         v3 = v2[0];
         v4 = v3.split(",");
         v5 = '';
         for(jj in v4)
         {
            sub1 = v4[jj].trim();
            if(sub1 == "*" || sub1 == "body" || sub1 == "html")
            {
               v55 = '.sales_mailBody,';
            }
            else
            {
               v55 = ' .sales_mailBody '+v4[jj].trim()+', ';
            } 
            v5+= v55.trim();
         }
         var v5 = v5.substring(0, v5.length-1);
         if(typeof v2[1] !== "undefined")
         {
            v6     = '{'+v2[1].trim()+'}';
            val3+= v5+v6 ;
         } 
      }
    }
    return val3;  
    //console.log("val3 f: "+val3);
}

/*$(document).on('click', '.new_compose_btn', function(){
  $('.composeMail_area').show();
})*/
$(document).on('click', '.close_compose', function(){
  $(".tagsinput").tagsinput('removeAll');
  $('#mailComposeSubject').val('');
  $('#mailComposeBody').val('');
  $('.composeMail_area').hide();
});


/*
$(document).on('keyup', ".mailComposeTo .bootstrap-tagsinput input[type='text']", function(){
   delay(function(){ 
      var val = $(".bootstrap-tagsinput input[type='text']").val(); 
      htmltext = ''; 
      $.post(baseurl+"action/searchMailRec",{keyword:val},function(data){ 
        if(data != '')
        {
           json = JSON.parse(data);
           for(ii in json.data)
           {
               htmltext+= '<li class="setToSuggget" title="'+val+'">'+json.data[ii]+'</li>';
           } 
        }
        $('.composeToSuggest').html(htmltext);
      }); 
     },400);    
});*/

function mailSuggestion(val, idval, htmlbox)
{ 
      htmltext = ''; 
      $.post(base_url+"mail/searchMailRec",{keyword:val},function(data){ 
        if(data != '')
        { 
           json = JSON.parse(data);
           for(ii in json.data)
           { 
               htmltext+= '<li class="setToSuggget" set="'+idval+'" htm="'+htmlbox+'" title="'+val+'">';
               htmltext+='<table class="sg_table"><tr><td>';
               htmltext+='<span class="icon"><i class="fa fa-user-circle"></i></span>';
               htmltext+='</td><td>';
               htmltext+= '<span class="name">'+json.data[ii].name+'</span><br>';
               htmltext+= '<span class="email">'+json.data[ii].email+'</span>';
               htmltext+='</td></tr></table>';
               htmltext+= '</li>';
           } 
        }
        $('.'+htmlbox).html(htmltext);
      }); 
}


 $(document).on('keyup', ".mailComposeTo .bootstrap-tagsinput input[type='text']", function(){
   // delay(function(){  
     var val = $(".mailComposeTo .bootstrap-tagsinput input[type='text']").val(); 
     mailSuggestion(val, "mailComposeTo", "composeToSuggest");
     // },400);
  }); 

 $(document).on('keyup', ".mailComposeCc .bootstrap-tagsinput input[type='text']", function(){
   // delay(function(){ 
     var val = $(".mailComposeCc .bootstrap-tagsinput input[type='text']").val(); 
     mailSuggestion(val, "mailComposeCc", "composeCcSuggest");
     // },400);
  });

$(document).on('keyup', ".mailComposeBcc .bootstrap-tagsinput input[type='text']", function(){
   // delay(function(){ 
     var val = $(".mailComposeBcc .bootstrap-tagsinput input[type='text']").val(); 
     mailSuggestion(val, "mailComposeBcc", "composeBccSuggest");
     // },400);
  });



$(document).on('click', '.setToSuggget', function(ev){
  text    = $(this).find( ".email" ).text();
 // console.log(text);
  val     = $(this).attr("title");
  idval   = $(this).attr("set");
  htmlbox = $(this).attr("htm");
  setthisSuggest(val, text, idval, htmlbox); 
});

function setthisSuggest(val,text,  idval, htmlbox)
{ 
    $('#'+idval).tagsinput('remove', val);
    $('#'+idval).tagsinput('add', text);
    $('#'+idval).tagsinput('focus');
    $('.'+htmlbox).html('');
}


$(document).on('keyup', ".forword_to_list .bootstrap-tagsinput input[type='text']", function(){
   var val = $(this).val();
   delay(function(){ 
     tag = $(this).attr("tag");  
     mailSuggestion(val, "forword_to_list"+tag, "forwordToSuggest"+tag);
     },400);
  });

$(document).on('keyup', ".forword_cc_list .bootstrap-tagsinput input[type='text']", function(){
   var val = $(this).val();
   delay(function(){ 
     tag = $(this).attr("tag");   
     mailSuggestion(val, "forword_cc_list"+tag, "forwordCcSuggest"+tag);
     },400);
  });

$(document).on('keyup', ".forword_bcc_list .bootstrap-tagsinput input[type='text']", function(){
   var val = $(this).val();
   delay(function(){ 
     tag = $(this).attr("tag"); 
     mailSuggestion(val, "forword_bcc_list"+tag, "forwordBccSuggest"+tag);
     },400);
  });

// ============================================================================= 
// ============================================================================= 

$(document).on('click', '.inputGroupFile01', function(){
  tag = $(this).attr("tag");
  $('#inputGroupFile'+tag).trigger("click");
})

var selDiv = "";
var storedFiles = [];
up = 1;

  $(document).on('change', '.inputGroupFile', handleFileSelect);
  tag = $(this).attr("tag"); 
  selDiv = $("#selectedFiles"+tag);  
  function handleFileSelect(e) {  
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function(f) 
    {    
      storedFiles.push(f); 
      var reader = new FileReader();
      reader.onload = function (e) {
        fsize = bytesToSize(f.size);
        fname = f.name;
        if(fname.length > 40)
        {
          fname = fname.substr(0, 30)+'..';
        }
        var html = "<div class='compose_file_list'><span>" + fname+" ("+ fsize+")</span><span data-file='"+f.name+"' class='selFileRemove ml-3 cursor pull-right' title='Click to remove'><i class='fa fa-times'></i></span></div>";
        $('#selectedFiles'+tag).append(html); 
      }
      reader.readAsDataURL(f); 
    }); 
  } 

// ============================================================================= 
// ============================================================================= 
 
  function removeFile(e) {
    var file = $(this).data("file");
    for(var i=0;i<storedFiles.length;i++) {
      if(storedFiles[i].name === file) {
        storedFiles.splice(i,1);
        break;
      }
    }
    $(this).parent().remove();
   
  } 

  $("body").on("click", ".selFileRemove", removeFile);


  $(document).on('click', '.remove_defauld_pdf', function(){
    $('#default_file').val(0);
  });
  
// ============================================================================= 
// ============================================================================= 

  $(document).on('click', '.mail_desk .composeMailBtn', function(){
    $('#composeMailForm').trigger('submit');
  });

  $(document).on('submit', '.mail_desk #composeMailForm', function(e){
    e.preventDefault();
    $('.showComposeLoader').removeClass("hide");
    data = new FormData(this);
    len=storedFiles.length
    for(var i=0; i<len; i++) {
     data.append('file[]', storedFiles[i]); 
    }

    var body = tinyMCE.activeEditor.getContent();
    data.append('editorData', body); 
 
    $('.doneTaskBox').show();
    $('.doneTaskBox').html('Mail sending...');   
   
    $.ajax({
      url: baseurl+"mail/composeMail",
      type: "POST",
      data:  data,
      contentType: false,
      cache: false,
      processData:false,
      success: function(data){
        if(data!= '')
        {    
          json = JSON.parse(data);
          if(json.success == true)
          {
            $('.doneTaskBox').html('Mail send'); 
            setTimeout(function(){
              $('.doneTaskBox').hide();
              $('.doneTaskBox').html('');
            },4000); 

            storedFiles = [];
            $('#selectedFiles').html('');
            $('.mail_back_btn').trigger("click");
            $('#mail_open_filterData').html(''); 
          }
          else if(json.success == false)
          {
            alert(json.error);
            $('.doneTaskBox').html('Mail not send'); 
            $('.doneTaskBox').hide(); 
          }  
        } 
        $('.showComposeLoader').addClass("hide");
      },
      error: function(){
        $('.showComposeLoader').addClass("hide");
      }           
    });
  });

// ==================================================================================
// ==================================================================================

  $(document).on('click', '.send_mail_to_client_btn', function(){
    $('#send_mail_to_client_form').trigger('submit');
  });

  $(document).on('submit', '#send_mail_to_client_form', function(e){
    e.preventDefault();
    $('.showComposeLoader').removeClass("hide");
    data = new FormData(this);
    len=storedFiles.length
    for(var i=0; i<len; i++) {
      data.append('file[]', storedFiles[i]); 
    }

    var body = tinyMCE.activeEditor.getContent();
    data.append('editorData', body); 

    $('.doneTaskBox').show();
    $('.doneTaskBox').html('Mail sending...');   
    $.ajax({
      url: baseurl+"mail/mail_send_to_client",
      type: "POST",
      data:  data,
      contentType: false,
      cache: false,
      processData:false,
      success: function(data){
        if(data!= '')
        {    
          json = JSON.parse(data);
          if(json.success == true)
          {
            $('.doneTaskBox').html('Mail send'); 
            setTimeout(function(){
                $('.doneTaskBox').hide();
                $('.doneTaskBox').html('');
            },4000);    
                    
            storedFiles = [];
            $('#selectedFiles').html('');
            $('.mail_back_btn').trigger("click");
            $('#mail_open_filterData').html(''); 
            location.href = baseurl+"quote_punch";
          }
          else if(json.success == false)
          {
            alert(json.error);
            $('.doneTaskBox').html('Mail not send'); 
            $('.doneTaskBox').hide(); 
          }  
        } 
        $('.showComposeLoader').addClass("hide");
      },
      error: function(){
        $('.showComposeLoader').addClass("hide");
      }           
    });
  });

// ==================================================================================
// ==================================================================================

  $(document).on('click', '.send_qc_report_btn', function(){
    $('#send_qc_report_form').trigger('submit');
  });

  $(document).on('submit', '#send_qc_report_form', function(e){
    e.preventDefault();
    $('.showComposeLoader').removeClass("hide");
    data = new FormData(this);
    len=storedFiles.length
    for(var i=0; i<len; i++) {
      data.append('file[]', storedFiles[i]); 
    }

    var body = tinyMCE.activeEditor.getContent();
    data.append('editorData', body); 

    $('.doneTaskBox').show();
    $('.doneTaskBox').html('Mail sending...');   
    $.ajax({
      url: baseurl+"mail/send_qc_report",
      type: "POST",
      data:  data,
      contentType: false, 
      cache: false,
      processData:false,
      success: function(data){
        if(data!= '')
        {    
          json = JSON.parse(data);
          if(json.success == true)
          {
            $('.doneTaskBox').html('Mail send'); 
            setTimeout(function(){
                $('.doneTaskBox').hide();
                $('.doneTaskBox').html('');
            },4000);    
                    
            storedFiles = [];
            $('#selectedFiles').html('');
            $('.mail_back_btn').trigger("click");
            $('#mail_open_filterData').html(''); 
            location.href = baseurl+"dispatch";
          }
          else if(json.success == false)
          {
            alert(json.error);
            $('.doneTaskBox').html('Mail not send'); 
            $('.doneTaskBox').hide(); 
          }  
        } 
        $('.showComposeLoader').addClass("hide");
      },
      error: function(){
        $('.showComposeLoader').addClass("hide");
      }           
    });
  });


// ==================================================================================
// ==================================================================================

/*
$(document).on('submit','.mail_desk #mailReplyForm', function(e)
{
  e.preventDefault(); 
  tag  = $(this).attr("tag"); 
  body = $('#replybody'+tag).val();
  to   = $('#reply_to_list'+tag).val();
  cc   = $('#reply_cc_list'+tag).val() || '';
  bcc  = $('#reply_bcc_list'+tag).val() || ''; 

  data = new FormData(this);
  len=storedFiles.length
  for(var i=0; i<len; i++) {
   data.append('file[]', storedFiles[i]); 
  } 
       $('.doneTaskBox').show();
       $('.doneTaskBox').html('Mail sending...');  
       $.post(baseurl+'mail/replymail/'+tag,{replymail:body, cc:cc, bcc:bcc, to:to},function(data){  
       if(data!= '')
       {
          json = JSON.parse(data);
          if(json.success == true)
          { 
              $('.doneTaskBox').html('Mail send'); 
              type = $('.mail_back_btn').attr("tag") || 'inbox';
              getmailopenData(type, tag);
              setTimeout(function(){
                  $('.doneTaskBox').hide();
                  $('.doneTaskBox').html('');
              },4000); 
          }
          else
          {  
              $('.doneTaskBox').html('Mail not send'); 
              setTimeout(function(){
                  $('.doneTaskBox').hide();
                  $('.doneTaskBox').html('');
              },3000); 
          }
       } 
     });
  } 
});*/

$(document).on('click', '.mailReplyBtn', function(){
  tag = $(this).attr("tag");
  $('#defMailOpen').val(tag);
  $('.mailReplyForm'+tag).trigger('submit');
});

$(document).on('submit', '.mail_desk .mailReplyForm', function(e){
        e.preventDefault();
        mtag    = $(this).attr("mtag");
        def     = $(this).attr("mail"); 
        $('.mailReplyBtn').attr("disabled", true);
        e.preventDefault(); 
        data    = new FormData(this);

        var body = tinyMCE.activeEditor.getContent();
        // body    = $('#replybody'+mtag).val(); 
        data.append('replymail', body); 

        len  = storedFiles.length;
        for(var i=0; i<len; i++) {
         data.append('file[]', storedFiles[i]); 
        } 
        // const editorData = editor2.getData();
        // data.append('replymail', editorData);
        //console.log(storedFiles); 
        $('.doneTaskBox').show();
        $('.doneTaskBox').html('Mail sending...');   
        $.ajax({
        url: baseurl+"mail/replymail/"+mtag,
        type: "POST",
        data:  data,
        contentType: false,
        cache: false,
        processData:false,
        success: function(data){
           if(data!= '')
             {  json = JSON.parse(data);
                if(json.success == true)
                {  
                    storedFiles = [];
                    $('.doneTaskBox').html('Mail send'); 
                    type = $('.mail_back_btn').attr("tag") || 'inbox';
                    $('.mailReplyBtn').attr("disabled", false);
                    getmailopenData(type, def);
                    setTimeout(function(){
                        $('.doneTaskBox').hide();
                        $('.doneTaskBox').html('');
                    },4000);  
                    $('.attach_area').html(''); 
                }
                else if(json.success == false)
                {
                    //alert(json.error);
                    $('.mailReplyBtn').attr("disabled", false);
                    $('.doneTaskBox').html('Mail not send'); 
                    $('.doneTaskBox').hide(); 
                }  
             } 
        },
        error: function(){}           
        }); 
});


$(document).on('click', '.nav-mail-type  .nav-link', function(){
 tag = $(this).attr("tag");
 $('#default_inbox_list').val(tag);
 $('.in_pg_dv').removeClass("show");
 $('.in_pg_'+tag).addClass("show");
});

$(document).on('click', '.mail_pagination .nextPage', function(){ 
  tag = $(this).attr("tag");
  subtype = $('#default_inbox_list').val();
  getmailinboxPages(tag, subtype);
});

$(document).on('click', '.mail_pagination .prevPage', function(){
  tag = $(this).attr("tag");
  subtype = $('#default_inbox_list').val();
  getmailinboxPages(tag, subtype);
});


function getmailinboxPages(page, subtype)
{
   $.post(baseurl+"mail/getmailinboxPages/" ,{page:page, subtype:subtype},function(data){
    $('#tab_inbox_'+subtype+' .mailListBody').html('');
    $('#tab_inbox_'+subtype+' .mailListBody').html(data); 
   });
}

function createMailContentPagination(arr, subtype)
{ 
     htmltxt = '';
     //console.log(arr);
     end   = parseInt(arr.thispage)+parseInt(arr.limit_start);
     start = parseInt(arr.limit_start) + 1;
     page_id = parseInt(arr.page_id);
     //console.log(page_id);
     htmltxt+= '<li style="width: 200px;text-align:right;" class="pr-2"><span>'+start+'-'+end+' of '+arr.count+'</span></li>';
     htmltxt+= '<li><a ';
     if(page_id > 1)
     { 
         prev = page_id - 1;
         htmltxt+= 'class="np-btn prevPage  "  tag="'+prev+'" title="Prev"';
     } 
     else 
     { 
         htmltxt+= 'class="np-btn "';
     } 
     htmltxt+= ' href="javascript:void(0)" type="'+subtype+'"><i class="fa fa-angle-left  pagination-left"></i></a>';
     htmltxt+= '</li>';
     htmltxt+= '<li>';
     htmltxt+= '<a ';
     if(page_id < arr.totalpage)
     {  htmltxt+= 'class="np-btn nextPage " tag="'+(parseInt(page_id)+1)+'" title="Next"';
     }
     else 
     {  htmltxt+= 'class="np-btn "';
     } 
     htmltxt+= 'href="javascript:void(0)" type="'+subtype+'"><i class="fa fa-angle-right pagination-right"></i></a></li>';

     $('.in_pg_'+subtype).html(htmltxt);

     $('#inbox_list_pagination_'+subtype).val(arr.page_id);
     $('#pagination_tp_'+subtype).val(arr.page_id);
}

function createMailContentarea(data, subtype)
{
   htmltxt = '';
   for(ii in data)
   {
      htmltxt+= '<tr class="';
      if(data[ii].read == 0) 
       {  htmltxt+='unread ';
       } 
      htmltxt+= ' clickable-row ns_mail_open cursor mail_row'+data[ii].id+'" tag = "'+data[ii].id+'">';
      htmltxt+= '<td class="inbox-small-cells" style="width: 40px">';
      htmltxt+= '<input type="checkbox" class="mail-checkbox " value="'+data[ii].id+'" name="mail_checkbox[]"></td>';
      htmltxt+= '<td class="inbox-small-cells ';
       if(data[ii].favorite == 1) { htmltxt+='importance';} 
      htmltxt+= '" style="width: 40px"><span class="mark_favorite" status="';
      if(data[ii].favorite == 1) { htmltxt+='1'; }else{ htmltxt+='0'; }
      htmltxt+= '" tag="'+data[ii].id+'" ><i class="fa fa-star star-color"></i></span></td>';
      htmltxt+= '<td class="view-message  dont-show">'+data[ii].from;
      if(data[ii].thread > 1)
      {
         htmltxt+= '<span class="th_count">'+data[ii].thread+'<span>'; 
      }
      htmltxt+= '</td>';
      htmltxt+= '<td class="view-message "><div class="subject">'+data[ii].subject+'</div>';
      if(data[ii].attachlist != '')
      {
         htmltxt+='<div class="mail-attach">'+data[ii].attachlist+'</div>';
      }
      htmltxt+='</td>';
      htmltxt+= '<td class="view-message ">';
      if(data[ii].open == 1)
      {
         htmltxt+='<span><img src="<?=base_url();?>assets/icons/double-tick.png" title="Mail Seen" style="width: 20px"></span>';
      } 
      htmltxt+='</td>';

      htmltxt+='<td class="view-message  text-right td_3">'+data[ii].date+'</td>';
      htmltxt+='</tr>';  
   }
   $('#tab_inbox_'+subtype+' .mailListBody').html(htmltxt);
}

$(document).on('keyup', '#multiLeadAttach .searchleadbox', function(){ 
   $('.mailLeadsearchIcon .search').hide();
   $('.mailLeadsearchIcon .searching').show();
   delay(function(){ 
    var val = $('.searchleadbox').val();
    val     = val.trim();
    var n   = val.length; 
    htmltxt = ''; 
    if(n > 1)
    { 
           $.post(baseurl+"action/searchLeadData",{keyword:val},function(data){  
           var json = JSON.parse(data);
           //console.log(data);
           $('.mailLeadsearchIcon .searching').hide();
           $('.mailLeadsearchIcon .search').show(); 
           leadtxt = ''; 
           if(json.lead != '')
           {   
               for(ii in json.lead)
               { leadtxt+= '<a href="javascript:void(0)" class="list-group-item list-group-item-action linkthisLead" tag="'+json.lead[ii].id+'"><span  class="cursor"><img src="'+baseurl+'assets/icons/icon-dollar.png">&nbsp;&nbsp;&nbsp;  '+json.lead[ii].title+'</span> </a>';
               }  
           } 
           else 
           {   leadtxt+= '<a href="javascript:void(0)" class="list-group-item">No lead found</a>'; 
           }
           $('#mail_link_src_lead').html(leadtxt); 
       });
    }else{
      $('.mailLeadsearchIcon .searching').hide();
      $('.mailLeadsearchIcon .search').show();
      $('#mail_link_src_lead').html('');
    }
  }, 600);
 });



$(document).on('click','.mail_desk .attach_lead_btn', function(){ 
    $('#multiLeadAttach').modal('show'); 
    $('.link_lead_search').show();
}); 

$(document).on('click','#multiLeadAttach .linkthisLead', function(){
  tag = $(this).attr("tag");
  vals =  getMail_CheckBoxValues();
  $.post(baseurl+"action/multiLinkMailLead/"+tag,{update_mail:vals},function(data){
    if(data!='')
    {
       json = JSON.parse(data);
       if(json.success == true)
       { 
           $('#multiLeadAttach').modal('hide'); 
           setTimeout(function(){
                  getmailinboxdataData();
           },200);  
       }
    } 
  });
});

$(document).on('click', '.mail_fl_dn_icon', function(){
  html = $('.mail_search_filter').html();
  if(html.trim() == '')
  {
      createMailSearchFilterArea();
  }
  $('.mail_search_filter').show();
});

function createMailSearchFilterArea()
{
     date = moment().format("YYYY-MM-DD");
     from = ''; to = '';  keyword = ''; within = '';  subject = ''; type = ''; attach = '';
     if(typeof advance !== 'undefined' && advance != '')
     {
         addArr  = JSON.parse(advance);
         date    = addArr.date;
         from    = addArr.from;
         to      = addArr.to;
         keyword = addArr.keyword;
         subject = addArr.subject;
         within  = addArr.within;
         type    = addArr.type;
         attach  = addArr.attach;
     } 
     html='';
     html='<form id="mail_inbox_search_advance">';
     html+='<table>';
     html+='<tr>';
     html+='<td style="min-width:100px"><label>From</label></td>';
     html+='<td width="340px" colspan="2"><input type="text" name="from" class="ad_sc_from" value="'+from+'"></td>';
     html+='</tr>';
     html+='<tr>';
     html+='<td><label>To</label></td>';
     html+='<td colspan="2"><input type="text" name="to" class="ad_sc_to" value="'+to+'"></td>';
     html+='</tr>';
     html+='<tr>';
     html+='<td><label>Subject</label></td>';
     html+='<td colspan="2"><input type="text" name="subject" class="ad_sc_subject" value="'+subject+'"></td>';
     html+='</tr>';
     html+='<tr>';
     html+='<td><label>Has the words</label></td>';
     html+='<td colspan="2"><input type="text" name="subject" class="ad_sc_keyword" value="'+keyword+'"></td>';
     html+='</tr>';
     html+='<tr>';
     html+='<td><label>Date within</label></td>';
     html+='<td style="width:170px;padding-right:10px">';
     html+='<select name="within" class="ad_sc_within">';
     html+='<option>1 Day</option><option>3 days</option><option>1 week</option><option>2 weeks</option><option>1 month</option><option>2 months</option><option>6 months</option><option>1 year</option>';
     html+='</select></td>';
     html+='<td><input type="date" name="date" value="'+date+'" required class="ad_sc_date"></td>';
     html+='</tr>';
     html+='<tr>';
     html+='<td><label>Search</label></td>';
     html+='<td colspan="2">';
     html+='<select name="within" class="ad_sc_type">';
     html+='<option value="">All Mail</option><option  value="1">Inbox</option><option  value="2">Sent Mail</option><option value="3">With lead</option><option value="4">Social</option><option value="5">Trash</option>';
     html+='</select></td>';
     html+='</tr>';
     html+='<tr>';
     html+='<td colspan="2"><label><input type="checkbox" class="ad_sc_attach" ';
     if(attach == 1)
     {
       html+=' checked';
     }
     html+='> Has attachment</label></td>';
     html+='<td></td>';
     html+='</tr>';
     html+='<tr>';
     html+='<td> </td>';
     html+='<td colspan="2" class="text-right"><button class="sl-btn submit">Search</button></td>';
     html+='</tr>';
     html+='</table>';
     html+='</form>';
     $('.mail_search_filter').html(html);
     if(within != '')
     {
       $('.ad_sc_within').val(within);
     }
     if(type != '')
     {
       $('.ad_sc_type').val(type);
     }
}

$(document).on('submit', '#mail_inbox_search_advance', function(e){
   e.preventDefault();
   var keyword = $('.ad_sc_keyword').val()  || '';
   var to      = $('.ad_sc_to').val()       || '';
   var from    = $('.ad_sc_from').val()     || '';
   var subject = $('.ad_sc_subject').val()  || '';
   var within  = $('.ad_sc_within').val()   || '';
   var date    = $('.ad_sc_date').val()     || '';
   var type    = $('.ad_sc_type').val()     || '';
   attach      = 0;
   if($('.mail_desk .ad_sc_attach').is(":checked"))
    {
       attach  = 1;
    }
   
   advance = '{"keyword":"'+keyword+'", "to":"'+to+'", "from":"'+from+'", "subject":"'+subject+'", "within":"'+within+'", "date":"'+date+'", "type":"'+type+'", "attach":"'+attach+'"}';
    
   $('.doneTaskBox').show(); 
   $('.doneTaskBox').html('Loading....'); 
      setTimeout(function()
      {
          $('.doneTaskBox').hide();
          $('.doneTaskBox').html('');
      },2000);  
   searchAdvanceMailData(advance);
   
});

function searchAdvanceMailData(advance='')
{
    $.post(baseurl+'mail/searchAdvanceMailData',{data:advance},function(data){$('#mail_filterData').html(data);});
    keyword = '';
    $('.mail_desk #activeSearch').val( );
    urlkeyword = encodeURIComponent(advance);
    updateURLTitle("mail/advanced_search/"+urlkeyword, "Search");  
}

$(document).on('click','body', function(e)
{ 
  if($(e.target).closest(".mail_search_filter").length ===  0 && $(e.target).closest(".mail_fl_dn_icon").length ===  0) 
  {
      $('.mail_search_filter').hide();
  }
});

$(document).on('click', '.mail.templateBox .list li', function(){
  tag = $(this).attr("tag");
  if(tag)
  {   templateArr = JSON.parse(templateJSON);
      if(typeof templateJSON !== "undefined")
      {   templateArr = JSON.parse(templateJSON);
          if(typeof templateArr[tag] !== "undefined") 
          {  
             arr = templateArr[tag];
             msg = arr.template; 
             console.log("1"+templateArr); 
             msg = msg.replace(/<br ?\/?>/g, "\n");
             msg = msg.replace("\n", "<br>");
             //$('#mailComposeBody').prepend(msg); 
             //$('.composeMail').summernote('code',msg);
             console.log(msg); 
             $('.composeMail').summernote('editor.restoreRange');
             $('.composeMail').summernote('editor.focus');
             $('.composeMail').summernote('editor.insertText', msg); 
            // $('.mailTemplate').summernote('pasteHTML', msg);
            // $('.composeMail').summernote('insertText', msg); 
        }
        $('.templateBox').toggle();
 } } })




$(document).on('click', '.link_lead_btn', function(){
  $('.link_lead_btn').hide();
  $('.link_lead_search').show();
  htm = $('#mail_link_src_lead').html();
  if(htm == "")
  {
      loadLeadSearchResultFormail();
  }
  
});

$(document).on('click', '.hideLinkLead', function(){
  $('.link_lead_btn').show();
  $('.link_lead_search').hide();
});


$(document).on('keyup', '.mail_desk .searchleadbox', function(){ 
   $('.mailLeadsearchIcon .search').hide();
   $('.mailLeadsearchIcon .searching').show();
   delay(function(){ 
    var val = $('.searchleadbox').val();
    val     = val.trim();
    var n   = val.length; 
    htmltxt = ''; 
    if(n > 1)
    {  loadLeadSearchResultFormail(val);
    }else{
      $('.mailLeadsearchIcon .searching').hide();
      $('.mailLeadsearchIcon .search').show();
      $('#mail_link_src_lead').html('');
    }
  }, 600);
 });


function loadLeadSearchResultFormail(val='')
{
    $.post(baseurl+"action/searchLeadData",{keyword:val},function(data){  
     var json = JSON.parse(data);
     //console.log(data);
     $('.mailLeadsearchIcon .searching').hide();
     $('.mailLeadsearchIcon .search').show(); 
     leadtxt = ''; 
     if(json.lead != '')
     {   
         for(ii in json.lead)
         { leadtxt+= '<a href="javascript:void(0)" class="list-group-item list-group-item-action linkthisLead" tag="'+json.lead[ii].id+'"><span class="cursor img"><img src="'+baseurl+'assets/icons/icon-dollar.png">&nbsp;&nbsp;&nbsp;</span><span class="main">'+json.lead[ii].title+'<br><span class="contact">'+json.lead[ii].contact_name+'</span></span>  </a>';
         }  
     } 
     else 
     {   leadtxt+= '<a href="javascript:void(0)" class="list-group-item">No lead found</a>'; 
     }
     $('#mail_link_src_lead').html(leadtxt);
     }); 
}

$(document).on('click', '.mail_desk  .linkthisLead', function(){
  tag = $(this).attr("tag");
  mail = $('#openMailId').val();
  $.post(baseurl+"action/linkthisLead/"+tag,{update_mail:mail},function(data){
    if(data!='')
    {
       json = JSON.parse(data);
       if(json.success == true)
       {
         // getmailopneinbox(mail);
          type = $('#defaultPage').val() || 'inbox'; 
          getmailopenData(type, mail);
       }
    } 
  });
});




 
$(document).on('click', '.addLeadMail', function(){
   mail = $('#defMailOpen').val() || 0;
   if(mail)
   {
       $('#addMailLead').modal({backdrop: 'static',keyboard: false});
       $.post(baseurl+'mail/getLeadForm/',{action:'leadform', mail:mail},function(data){ $('#addMailDealForm').html(data); });
   } 
});

$(document).on('submit', '#addMailDealForm', function(e){ 
$(".addleadbtn").attr("disabled", true);
$('.error').html(''); 
e.stopImmediatePropagation();
e.preventDefault(); // avoid to execute the actual submit of the form. 
var form=$('#addMailDealForm');
var url = baseurl+"lms/submitaddDealForm"; 
$.ajax({
       type: "POST",
       url: url,
       data: form.serialize(), // serializes the form's elements.
       success: function(data)
       { 
           var arr=JSON.parse(data);
           if(arr.success == true)
           { 
                $('#addMailLead').modal('hide');
                sc_toastr("Lead Added successfully", "Success"); 

                mail = $('#openMailId').val();
                type = $('#defaultPage').val() || 'inbox'; 

                data = arr.data;
                lead = data.id;
                linkmailTolead(mail,lead);
                setTimeout(function(){ getmailopenData(type, mail); }, 150);
           }
           else if(arr.success == false)
           {
              $('.'+arr.type+'Error').html(arr.error);
              
           }else{
               $('.allError').html('Something went wrong'); 
           }
           $(".addleadbtn").removeAttr("disabled");
       }
     }); 
});

function linkmailTolead(mail,lead)
{
    $.post(baseurl+"action/linkthisLead/"+lead,{update_mail:mail},function(data){
    if(data!='')
    {
       json = JSON.parse(data);
       if(json.success == true)
       { 
       }
    } });
}






// ==========================================================================
// ==========================================================================
// ==========================================================================
// ==========================================================================
// ==========================================================================