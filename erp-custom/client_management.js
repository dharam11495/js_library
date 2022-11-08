class Client_management {

    constructor(page) {
        this.add_event_listeners();
        if (page != 'details') {
            this.init_clients_data_table();
        }
        this.clients_list_datatable 
    }

    /** Event listner function */
    add_event_listeners() {
        $(document).on("click", ".expo .expo-add-client", this.add_client_form());
        $(document).off("click", ".expo .expo-add-client", this.add_client_form());

        $(document).on("click",".expo .expo-add-user", this.add_user_form());
        $(document).off("click",".expo .expo-add-user", this.add_user_form());

        $(document).on("click", ".expo .expo-edit-company", this.edit_data_prepare_company());
        $(document).off("click", ".expo .expo-edit-company", this.edit_data_prepare_company());

        $(document).on("click", ".expo .expo-user-delete", this.delete_user());
        $(document).off("click", ".expo .expo-user-delete", this.delete_user());
    }

    /**
     * 
     * @returns void
     */
     delete_user() {
         return function() {
             let person_id = $(this).attr('data-id');
            if (!confirm("Are you sure want to delete this user!")) {
                return false;
            }
            expoHttp
            .post({
                url: base_url + `clients/delete`,
                data:  {
                    'person_id' : person_id
                },
            }).subscribe()
            .then(
                response => {  
                    expoSuccessMessageCustom.successMessage(response.message);
                    window.location.reload();
                }
            )
            .catch(error => {
                expoErrorMessageCustom.errorMessage(error.errorMessage.errorMessage);  
            });
         }
     }

    /**
     * Add clients 
     */
     add_client_form() {
         let parentClass = this;
         return function() {
            parentClass.validate_client_form();
            let form_obj = $('.expo form#expo-client-add-form');
             
             if (!$(form_obj).valid()) {
                 return false;
             }
     
             $('.expo .expo-progress').removeClass('hide');
             let loader_obj = $('.expo .expo-add-client');
             $(loader_obj).addClass("expo-disabled");

            expoHttp
            .post({
                url: base_url + `clients/add`,
                data:  $(form_obj).serialize(),
            }).subscribe()
            .then(
                response => {  
                    setTimeout(function() {
                        $('.expo #large-Modal').modal('hide');
                        expoSuccessMessageCustom.successMessage(response.message);
                        if (response.update) {
                            window.location.reload();
                        } else {
                            parentClass.clients_list_datatable.ajax.url(base_url + '/clients_list_datatable').load();
                        }
                        $('.expo .expo-progress').addClass('hide');
                        $(loader_obj).removeClass("expo-disabled");
                    }, 2000);
                    
                }
            )
            .catch(error => {
               
                setTimeout(function() {
                    $('.expo #large-Modal').modal('hide');
                    expoErrorMessageCustom.errorMessage(error.errorMessage.errorMessage);  
                    $('.expo .expo-progress').addClass('hide');
                    $(loader_obj).removeClass("expo-disabled");
                }, 2000);          
            });
         }
     }

     /**
      * Validation form 
      */
    validate_client_form() {
        $('.expo form#expo-client-add-form').validate({
            ignore: [":hidden"],
            rules: {
                company_name: {
                    required: true,
                },
                company_email: {
                    required: true,
                },
                company_full_address: {
                    required: true,
                },
                designation_sales_person: {
                    required: true,
                },
                company_state: {
                    required: true,
                },
                c_city: {
                    required: true,
                },
                c_pin_code: {
                    required: true,
                },
                contact_person_name: {
                    required: true,
                },
                contact_mobile_no: {
                    required: true,
                },
                c_category: {
                    required: true,
                },
                application_category: {
                    required: true,
                },
                application_type: {
                    required: true,
                },
                specify: {
                    required: true,
                },
                quote_from: {
                    required: true,
                },
                company_zone: {
                    required: true,
                },
                company_rating: {
                    required: true,
                },
                give_purchase_order: {
                    required: true,
                },
            },
        });
    }

    /**
     * Init clients data table
     */
     init_clients_data_table() {
        let parentClass = this;
        let prepare_aoColumnDefs = [
            { "aTargets": [0], "sClass": "column1" , "width" : "5%" },
            { "aTargets": [1], "sClass": "column2 expo-name-link-box", "width" : "5%" },
            { "aTargets": [2], "sClass": "column3" , "width" : "5%"},
            { "aTargets": [3], "sClass": "column4", "width" : "5%" },
            { "aTargets": [4], "sClass": "column5 cfx", "width" : "23%" },
            { "aTargets": [5], "sClass": "column6", "width" : "10%" },
            { "aTargets": [6], "sClass": "column7", "width" : "10%" },
            { "aTargets": [7], "sClass": "column8", "width" : "10%" },
            { "aTargets": [8], "sClass": "column8", "width" : "27%" },
           
            { "bSortable": false, "aTargets": [ 1, 4, 6, 7 ] }, 
        ];
        parentClass.clients_list_datatable = $('#expo-clients-list').DataTable({
            processing: true,
            order: [[ 0, "asc" ]],
            aoColumnDefs: prepare_aoColumnDefs,
            pageLength: 50,
            scrollY: 600,
            scrollX: true,
            
            language: {
                search: 'Search',
                searchPlaceholder: "Search company",
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
                "url": base_url + `/clients_list_datatable`,
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
                $("dataTables_wrapper table thead").hide();
            }
        });
        if (parentClass.clients_list_datatable.page.info().recordsDisplay <= 10) {
            $("div.dataTables_paginate").hide();
            $("div.dataTables_info").hide();
        }
     }

     /**
      * Add 
      */
      add_user_form() {
        let parentClass = this;
          return function(event) {
            parentClass.validate_user_form();
            let form_obj = $('.expo form#expo-client-user-add-form');
             
             if (!$(form_obj).valid()) {
                 return false;
             }

             $('.expo .expo-progress').removeClass('hide');
             let loader_obj = $('.expo .expo-add-user');
             $(loader_obj).addClass("expo-disabled");

            expoHttp
            .post({
                url: base_url + `clients/add_user`,
                data:  $(form_obj).serialize(),
            }).subscribe()
            .then(
                response => {  
                    $('.expo #expo_user_modal').modal('hide');
                    $('.expo .expo-progress').addClass('hide');
                    $(loader_obj).removeClass("expo-disabled");
                    expoSuccessMessageCustom.successMessage(response.message);
                    setTimeout(function() {
                        window.location.reload();
                    }, 1500)
                    // parentClass.users_list_datatable.ajax.url(base_url + '/users_list_datatable').load();
                    
                }
            )
            .catch(error => {
                expoErrorMessageCustom.errorMessage(error.errorMessage.errorMessage);    
                $('.expo .expo-progress').addClass('hide');
                $(loader_obj).removeClass("expo-disabled");        
            });
     
          }
      }
      /**
       * User Form validation
       */
       validate_user_form() {
        $('.expo form#expo-client-user-add-form').validate({
            ignore: [":hidden"],
            rules: {
                person_name: {
                    required: true,
                },
                person_email: {
                    required: true,
                },
                person_mobile: {
                    required: true,
                }
            },
        });
       }
       /**
        * edit_data_prepare_company 
        */
        edit_data_prepare_company() {
            return function() {
                let company_id = $(this).attr('data-id');
                expoHttp
                .post({
                    url: base_url + `clients/prepare`,
                    data: {
                        company_id : company_id
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
}