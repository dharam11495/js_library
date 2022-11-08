class User_manage {
    /**
     * 
     * User manage js Class code here 
     * @author dv@emtpl.in
     */
    constructor(users) {
        this.users = users;
        this.add_event_listeners();
        this.init_users_datatable();
        // this.users_list_datatable = "dharam";
    }
    add_event_listeners() {
        $(document).on("click",".expo .expo-add-user", this.add_user());
        $(document).off("click",".expo .expo-add-user", this.add_user());

        $(document).on("keypress", ".expo form#expo-user-add-form", this.add_user_event());
        $(document).off("keypress", ".expo form#expo-user-add-form", this.add_user_event());

        $(document).on("click", ".expo .expo-user-edit", this.edit_user_data());
        $(document).off("click", ".expo .expo-user-edit", this.edit_user_data());

        $(document).on("click", ".expo .expo-user-delete", this.delete_user_data());
        $(document).off("click", ".expo .expo-user-delete", this.delete_user_data());
    } 

    /**
     * Add User ajax call here 
     */
     add_user() {
         let parentClass = this;
         return function() {
            parentClass.submit_add_user();
           
         }
     }
     /**
      * enter form surbmit
      */
      add_user_event() {
          let parentClass = this;
          return function(event) {
              if (event.keyCode == 13) {
                parentClass.submit_add_user();
              }             
          }
      }

     /**
      * Submit Users data 
      * @author dv@emtpl.in
      */
      submit_add_user() {
        let parentClass = this;
        let form_obj = $(".expo form#expo-user-add-form");
        this.validate_user_form();
        if (!$(form_obj).valid()) {
            return false;
        }

        $('.expo .expo-progress').removeClass('hide');
        let loader_obj = $('.expo .expo-add-user');
        $(loader_obj).addClass("expo-disabled");

        expoHttp
        .post({
            url: base_url + `users/add`,
            data: $(form_obj).serialize(),
        }).subscribe()
        .then(
            response => {                  
                setTimeout(function() {
                    $('.expo #large-Modal').modal('hide');
                    parentClass.users_list_datatable.ajax.url(base_url + '/users_list_datatable').load();
                    expoSuccessMessageCustom.successMessage(response.message);
                    $('.expo .expo-progress').addClass('hide');
                    $(loader_obj).removeClass("expo-disabled");
                }, 2000);
            }
        )
        .catch(error => {
            setTimeout(function(){
                expoErrorMessageCustom.errorMessage(error.errorMessage.errorMessage);
                $('.expo .expo-progress').addClass('hide');
                $(loader_obj).removeClass("expo-disabled");
            }, 2000);               
        });
        
      }

      
    /**
     * Edit users data 
     */
     edit_user_data() {
        let parentClass = this
        return function(event) {
        let user_id = $(this).attr('data-id');
        expoHttp
        .post({
            url: base_url + `users/prepare`,
            data: {
                user_id : user_id
            },
        }).subscribe()
        .then(
            response => {  
                $('#large-Modal').html(response.view_file);  
                $(".js-example-basic-multiple").select2();             
                $('#large-Modal').modal('show');               
                
            }
        )
        .catch(error => {
                          
        });
        }
    }

    /**
     * 
     * Delete users function Start here
     */
     delete_user_data() {
         let parentClass = this;
         return function(event) {
             if (!confirm('Are you sure want to delete this user')) {
                return false;
             }
            let user_id = $(this).attr('data-id');
            expoHttp
            .post({
                url: base_url + `users/delete`,
                data: {
                    user_id : user_id
                },
            }).subscribe()
            .then(
                response => {  
                    expoSuccessMessageCustom.successMessage(response.message);
                    parentClass.users_list_datatable.ajax.url(base_url + '/users_list_datatable').load();
                    
                }
            )
            .catch(error => {
                expoErrorMessageCustom.errorMessage(error.errorMessage.errorMessage);            
            });
         }
     }


      /**
       * Validation rules define here
       */
       validate_user_form() {
        $('.expo #expo-user-add-form').validate({
            ignore: [":hidden"],
            rules: {
                first_name: {
                    required: true,
                },
                last_name: {
                    required : true,
                },
                mobile: {
                    required : true,
                    number: true,
                    maxlength : 10
                },
                password: {
                    required : true,
                },
                user_type : {
                    required : true,
                },
                department : {
                    required : true,
                },
                email : {
                    required : true,
                },
                gender : {
                    required : true,
                },
                'roles[]' : {
                    required : true,
                }
        },
    });
    }

    /**
     * init Users datatable
     */
    init_users_datatable() {
        let parentClass = this;
        let prepare_aoColumnDefs = [
            { "aTargets": [0], "sClass": "column1" , "width" : "10%" },
            { "aTargets": [1], "sClass": "column2 expo-name-link-box", "width" : "10%" },
            { "aTargets": [2], "sClass": "column3" , "width" : "10%"},
            { "aTargets": [3], "sClass": "column4", "width" : "10%" },
            { "aTargets": [4], "sClass": "column5 cfx", "width" : "20%" },
            { "aTargets": [5], "sClass": "column6", "width" : "10%" },
            { "aTargets": [6], "sClass": "column7", "width" : "10%" },
            { "aTargets": [7], "sClass": "column8", "width" : "20%" },
           
            { "bSortable": false, "aTargets": [ 1, 4, 6, 7 ] }, 
        ];

        parentClass.users_list_datatable = $('#expo-all-users').DataTable({
            processing: true,
            order: [[ 0, "desc" ]],
            aoColumnDefs: prepare_aoColumnDefs,
            pageLength: 25,
            scrollY: 600,
            scrollX: true,
            
            language: {
                search: 'Search',
                
                searchPlaceholder: "Search user",
                sLengthMenu: 'Users per page: _MENU_ <svg xmlns="http://www.w3.org/2000/svg" width="10.121" height="5.811" viewBox="0 0 10.121 5.811"><g id="Group_109543" data-name="Group 109543" transform="translate(-4.939 -6.939)"><g id="Group_109544" data-name="Group 109544"><path id="Path_12459" data-name="Path 12459" d="M6,8l4,4,4-4" fill="none" stroke="#080808" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></g></g></svg>',
                info: '_START_ - _END_ of _TOTAL_',
                paginate: {
                    "previous": '<svg xmlns="http://www.w3.org/2000/svg" width="5.811" height="10.121" viewBox="0 0 5.811 10.121"><g id="Group_109543" data-name="Group 109543" transform="translate(37.194 111.357)"><g id="Group_109544" data-name="Group 109544"><path id="Path_12459" data-name="Path 12459" d="M-32.444-110.3l-4,4,4,4" fill="none" stroke="#6d6d6d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></g></g></svg>',
                    "next": '<svg xmlns="http://www.w3.org/2000/svg" width="5.811" height="10.121" viewBox="0 0 5.811 10.121"><g id="Group_109543" data-name="Group 109543" transform="translate(37.506 111.357)"><g id="Group_109544" data-name="Group 109544"><path id="Path_12459" data-name="Path 12459" d="M-36.444-102.3l4-4-4-4" fill="none" stroke="#6d6d6d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></g></g></svg>'
                },
                loadingRecords: '&nbsp;',
                
                // fixedHeader: true,
                //processing: expoLoader.getOverlayLoaderElement()
            },
            ajax: {
                "url": base_url + `/users_list_datatable`,
                "type": "POST",
                data: function (d) {
                    //
                }
            },
            fnDrawCallback: function (settings) {
                if (settings.fnRecordsTotal() <= 10 || settings.fnRecordsDisplay() <= 10) {
                    $("div.dataTables_paginate").hide();
                    $("div.dataTables_info").hide();
                } else {
                    $("div.dataTables_paginate").show();
                    $("div.dataTables_info").show();
                }
            }
        });
        if (parentClass.users_list_datatable.page.info().recordsDisplay <= 10) {
            $("div.dataTables_paginate").hide();
            $("div.dataTables_info").hide();
        }
    }

}