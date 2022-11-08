class Query_manage {
  constructor(page) {
    this.add_event_listeners();
    if (page != 'details') {
        //this.init_query_data_table();
    }
    //this.init_query_data_table();
    this.query_scroll_event();
    this.isScroll = 0;

  }

  /**
   * Eevent listner function 
   */
  add_event_listeners() {
    $(document).on("click", ".expo .expo-add-query", this.add_query());
    $(document).off("click", ".expo .expo-add-query", this.add_query());

    $(document).on("click", ".expo .expo-update-query", this.add_query('edit'));
    $(document).off("click", ".expo .expo-update-query", this.add_query('edit'));

    $(document).on("change", ".expo select[name=company_id]", this.get_person());
    $(document).off("change", ".expo select[name=company_id]", this.get_person());

    $(document).on("click", ".expo .expo-edit-query", this.edit_data_prepare_query());
    $(document).off("click", ".expo .expo-edit-query", this.edit_data_prepare_query());

    $(document).on("click", ".expo .expo-qutation-module .expo-app-add-qutation-row", this.add_qutation_row());
    $(document).off("click", ".expo .expo-qutation-module .expo-app-add-qutation-row", this.add_qutation_row());


    $(document).on("click", ".expo .expo-qutation-module .expo-app-delete-quote-row", this.delete_qutation_row());
    $(document).off("click", ".expo .expo-qutation-module .expo-app-delete-quote-row", this.delete_qutation_row());


    $(document).on("click", ".expo .expo-qutation-module .expo-app-copy-quote-row", this.copy_qutation_row());
    $(document).off("click", ".expo .expo-qutation-module .expo-app-copy-quote-row", this.copy_qutation_row());


    $(document).on("click", ".expo .expo-app-upload-folder", this.upload_qutation_folder());
    $(document).off("click", ".expo .expo-app-upload-folder", this.upload_qutation_folder());

    $(document).on("change", ".expo #fileToUpload",  this.upload_data_by_folder());
    $(document).off("change", ".expo #fileToUpload",  this.upload_data_by_folder());

    $(document).on("change", ".expo .expo-app-save-qutation", this.save_qutation_form());
    $(document).off("change", ".expo .expo-app-save-qutation", this.save_qutation_form());


    $(document).on("click", ".expo .expo-app-update-quantity", this.update_quantity());
    $(document).off("click", ".expo .expo-app-update-quantity", this.update_quantity());

    // $(document).on("scroll", ".expo .expo-query-module",  this.query_scroll_event());
    // $(document).off("scroll", ".expo .expo-query-module",  this.query_scroll_event());

  }


  /**
   * Update Quantity js function 
   */
   update_quantity() {
    return function(event) {
      // alert('just check')
      let quantity = $('.expo .expo-app-common-quantity-update').val();
      if (quantity != '') {
        $('.expo .expo-app-quantity-input').val(quantity);
      }
      //alert(quantity)
      // 
    }
   }

  /**
   * Save Qutation form 
   */
   save_qutation_form() {
    let parentClass = this;
    return function() {
        let e_size = $(this).val();
        let  arr_p_size = e_size.split('X');
        var a_x = arr_p_size[0];
        var a_y = arr_p_size[1]; 
        var a_z = arr_p_size[2]; 

        let p_level_of_difficulty = $(this).closest('.expo-app-main-row').find('.expo-app-level-of-difficulty').val();
        let p_no_of_features = $(this).closest('.expo-app-main-row').find('.expo-app-no-of-features').val();

        let plate_x = $('.expo .expo-app-palte-x').val();
        let plate_y = $('.expo .expo-app-palte-y').val();
        let plate_z = $('.expo .expo-app-palte-z').val();

        let plate_type = $('.expo .expo-app-plate-type').val();
       
        let grade_type = $(this).closest('.expo-app-main-row').find('.expo-app-grade').val();
       
        let hourly_price = "";
        let per_kg_price = "";
       // alert(grade_type)
        if (grade_type == "ISEM-8") {
            hourly_price  = $('.expo .expo-app-grade-isem').val();
            per_kg_price = $('.expo .expo-app-grade-isem-price').val();
           
        } 
        if (grade_type == "ISO-63") {
          hourly_price  = $('.expo .expo-app-grade-iso').val(); 
          per_kg_price = $('.expo .expo-app-grade-iso-price').val(); 
        }
        
        //$('#p_price_per_unit'+tag).val(Math.round(a_price_per_unit));
        // expo-app-grade-iso

        $(this).closest('.expo-app-main-row').find('.expo-app-x-value').val(a_x);
        $(this).closest('.expo-app-main-row').find('.expo-app-y-value').val(a_y);
        $(this).closest('.expo-app-main-row').find('.expo-app-z-value').val(a_z);
        let a_unit_weight = '';
        if (plate_type == "plate") {
          let  h_unit_weight = (((+a_x + +plate_x)*(+a_y + +plate_y)*(+a_z + +plate_z)* 1.84) / 1000000); 

          if(h_unit_weight < 0.085) {
             a_unit_weight = 0.085;
            $(this).closest('.expo-app-main-row').find('.expo-app-unit-weight-hours').val(a_unit_weight.toFixed(2)); 
          } else {
            a_unit_weight = h_unit_weight;
            $(this).closest('.expo-app-main-row').find('.expo-app-unit-weight-hours').val(a_unit_weight.toFixed(2));
          }

          
            
          
        }
        let p_unit_mc_hour = "";
        let  a_price_per_unit = ((+p_unit_mc_hour * +hourly_price) + (+a_unit_weight * +per_kg_price)); 

        alert(a_price_per_unit)

        let sys_recommended_hours = parentClass.system_recom_hours(a_unit_weight, p_level_of_difficulty, p_no_of_features);
        //alert(sys_recommended_hours)
        $(this).closest('.expo-app-main-row').find('.expo-app-sys-hours').val(sys_recommended_hours);
        //$('#sys_recommended_hours'+tag).val(sys_recommended_hours);
    }
   }

   /**
    * Calculate System recom hours 
    */
    system_recom_hours(weight, difficulty, profile) {
        var weight = parseFloat(weight).toFixed(1);
    var c_wt = 0;
    var c_s  = 0;
    var hrs  = 0;

    if(weight >= 0 && weight <= 1)
    {
      //===========================================================
      if(difficulty == 'Easy' && profile=='Low')
      {
        c_wt = 0.25;
        c_s  = 1;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Medium')
      {
        c_wt = 1;
        c_s  = 0.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='High')
      {
        c_wt = 1;
        c_s  = 1;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Very High')
      {
        c_wt = 1;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Full/Engraving')
      {
        c_wt = 1;
        c_s  = 3;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================
      if(difficulty == 'Hard' && profile=='Low')
      {
        c_wt = 1;
        c_s  = 0.75;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Medium')
      {
        c_wt = 1;
        c_s  = 1;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='High')
      {
        c_wt = 1;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Very High')
      {
        c_wt = 1;
        c_s  = 3;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Full/Engraving')
      {
        c_wt = 1;
        c_s  = 4;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================
      if(difficulty == 'Very Hard' && profile=='Low')
      {
        c_wt = 1;
        c_s  = 1;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Medium')
      {
        c_wt = 1;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='High')
      {
        c_wt = 1;
        c_s  = 3;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Very High')
      {
        c_wt = 1;
        c_s  = 4;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Full/Engraving')
      {
        c_wt = 1;
        c_s  = 6;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================
    }
    else if(weight >= 1.1 && weight <= 5)
    {
      //===========================================================
      if(difficulty == 'Easy' && profile == 'Low')
      {
        c_wt = weight;
        c_s  = 1;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Medium')
      {
        c_wt = weight;
        c_s  = 1.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='High')
      {
        c_wt = weight;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Very High')
      {
        c_wt = weight;
        c_s  = 3;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Full/Engraving')
      {
        c_wt = weight;
        c_s  = 4;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================
      if(difficulty == 'Hard' && profile=='Low')
      {
        c_wt = weight;
        c_s  = 1.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Medium')
      {
        c_wt = weight;
        c_s  = 2.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='High')
      {
        c_wt = weight;
        c_s  = 3;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Very High')
      {
        c_wt = weight;
        c_s  = 4;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Full/Engraving')
      {
        c_wt = weight;
        c_s  = 5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================
      if(difficulty == 'Very Hard' && profile=='Low')
      {
        c_wt = weight;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Medium')
      {
        c_wt = weight;
        c_s  = 2.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='High')
      {
        c_wt = weight;
        c_s  = 3.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Very High')
      {
        c_wt = weight;
        c_s  = 4.5; 
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Full/Engraving')
      {
        c_wt = weight;
        c_s  = 6 ;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================

    }
    else if(weight >= 5.1 && weight <= 10)
    {
      //===========================================================
      if(difficulty == 'Easy' && profile=='Low')
      {
        c_wt = weight;
        c_s  = 1;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Medium')
      {
        c_wt = weight;
        c_s  = 1.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='High')
      {
        c_wt = weight;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Very High')
      {
        c_wt = weight;
        c_s  = 2.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Full/Engraving')
      {
        c_wt = weight;
        c_s  = 3.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================
      if(difficulty == 'Hard' && profile=='Low')
      {
        c_wt = weight;
        c_s  = 1.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Medium')
      {
        c_wt = weight;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='High')
      {
        c_wt = weight;
        c_s  = 2.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Very High')
      {
        c_wt = weight;
        c_s  = 3;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Full/Engraving')
      {
        c_wt = weight;
        c_s  = 4;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================
      if(difficulty == 'Very Hard' && profile=='Low')
      {
        c_wt = weight;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Medium')
      {
        c_wt = weight;
        c_s  = 3;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='High')
      {
        c_wt = weight;
        c_s  = 4;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Very High')
      {
        c_wt = weight;
        c_s  = 5; 
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Full/Engraving')
      {
        c_wt = weight;
        c_s  = 6 ;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================

    }
    else if(weight >= 10.1 && weight <= 15)
    {
      //===========================================================
      if(difficulty == 'Easy' && profile=='Low')
      {
        c_wt = weight;
        c_s  = 1;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Medium')
      {
        c_wt = weight;
        c_s  = 1.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='High')
      {
        c_wt = weight;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Very High')
      {
        c_wt = weight;
        c_s  = 2.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Full/Engraving')
      {
        c_wt = weight;
        c_s  = 3.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================
      if(difficulty == 'Hard' && profile=='Low')
      {
        c_wt = weight;
        c_s  = 1.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Medium')
      {
        c_wt = weight;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500;
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='High')
      {
        c_wt = weight;
        c_s  = 2.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Very High')
      {
        c_wt = weight;
        c_s  = 3;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Full/Engraving')
      {
        c_wt = weight;
        c_s  = 4;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================
      if(difficulty == 'Very Hard' && profile=='Low')
      {
        c_wt = weight;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Medium')
      {
        c_wt = weight;
        c_s  = 3;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='High')
      {
        c_wt = weight;
        c_s  = 4;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Very High')
      {
        c_wt = weight;
        c_s  = 5; 
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Full/Engraving')
      {
        c_wt = weight;
        c_s  = 6 ;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================

    }
    else if(weight >= 15.1 && weight <= 20)
    {
      //===========================================================
      if(difficulty == 'Easy' && profile=='Low')
      {
        c_wt = weight;
        c_s  = 0.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Medium')
      {
        c_wt = weight;
        c_s  = 1;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='High')
      {
        c_wt = weight;
        c_s  = 1.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Very High')
      {
        c_wt = weight;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Easy' && profile=='Full/Engraving')
      {
        c_wt = weight;
        c_s  = 3.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================
      if(difficulty == 'Hard' && profile=='Low')
      {
        c_wt = weight;
        c_s  = 1;
        hrs  = c_wt*c_s*1000/500; return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Medium')
      {
        c_wt = weight;
        c_s  = 1.5;
        hrs  = c_wt*c_s*1000/500;
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='High')
      {
        c_wt = weight;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Very High')
      {
        c_wt = weight;
        c_s  = 2.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Hard' && profile=='Full/Engraving')
      {
        c_wt = weight;
        c_s  = 3;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================
      if(difficulty == 'Very Hard' && profile=='Low')
      {
        c_wt = weight;
        c_s  = 1.5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Medium')
      {
        c_wt = weight;
        c_s  = 2;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;  
      }
      else if(difficulty == 'Very Hard' && profile=='High')
      {
        c_wt = weight;
        c_s  = 3;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Very High')
      {
        c_wt = weight;
        c_s  = 4; 
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      else if(difficulty == 'Very Hard' && profile=='Full/Engraving')
      {
        c_wt = weight;
        c_s  = 5;
        hrs  = c_wt*c_s*1000/500; 
        return hrs;
      }
      //===========================================================
    }
    }

  /**
   * Folder Input 
   */

   upload_data_by_folder() {
       return function(event) {
            let files = event.target.files;
            let item = [];
            let item1 = [];
            let item2 = [];
        
            for (let i=0; i<files.length; i++) {
        
            var n = files[i].webkitRelativePath;
            var res = n.split("/");
            var l = res.length;
            
            var fn = res[l-1];
            // alert(fn);
            var str = fn.replace(/,/g, "&#44;");
            // var str = fn.replace(",", "&#44;");
            item.push(str); 
        
            var folder_name = res[l-2];
            var str1 = folder_name.replace(",", "&#44;");
            item1.push(str1); 
        
            var fsize1 = files[i].size;
            var fsize2 = Math.round((fsize1 / 1024)); 
            item2.push(fsize2); 
        
            };

            console.log(item)
            console.log(item1)
            console.log(item2)
            $('#file_name_array').val(item);
            $('#folder_name_array').val(item1);
            $('#file_size_array').val(item2);
       }
       
   }

//    document.getElementById("folder_input").addEventListener("change", function(event) {
   
//     // console.log(item);
//   }, false);


  /**
   * Upload Qutation Folder 
   */
   upload_qutation_folder() {
        return function() {
            let form_obj = $('.expo #expo-app-upload-folder-form');

        
        var check = document.getElementById("fileToUpload").value;
        const arr = check.split("\\");
        console.log(check)
        console.log(arr);
        console.log("Is this your folder : " , arr.at(arr.length -1) );
        console.log(check);

            expoHttp.post({
                url: base_url + `qutation/upload_folder_data`,
                data: $(form_obj).serialize(),
                
            }).subscribe()
            .then(
                response => {  
                    console.log(response)
                $('.expo .expo-app-quotation-table').append(response.view_file);
                }
            )
            .catch(error => {
            expoErrorMessageCustom.errorMessage(error.errorMessage.errorMessage);            
            });
        }
   }

  /**
   * Copy row qutaion
   */
   copy_qutation_row() {
    
        return function() {
            let count = 1;
            let total_no_rows = $('.expo .expo-app-copy-quote-row').length;

            expoHttp.post({
                     url: base_url + `qutation/add_rows`,
                     data: {
                        'quotation_row' : count,
                        'expo_no_of_rows' : total_no_rows,
                     },
                     
                 }).subscribe()
                 .then(
                     response => {  
                         console.log(response)
                        $('.expo .expo-app-quotation-table').append(response.view_file);
                     }
                 )
                 .catch(error => {
                  expoErrorMessageCustom.errorMessage(error.errorMessage.errorMessage);            
                 });
        }
    
   }

  /**
   * Delete row 
   */
   delete_qutation_row() {
    return function() {
       $(this).closest('tr').remove();
    }
   }

  /**
   * Add Qutation ROW to make quotation
   */
   add_qutation_row() {
    return function() {
        let count = $('.expo .expo-qutation-module .expo-app-get-number').val();
        if (count > 50 ) {
           return expoErrorMessageCustom.errorMessage('Maximum 50 row`s allowed !');
        }
        let total_no_rows = $('.expo .expo-app-copy-quote-row').length;
        expoHttp.post({
                 url: base_url + `qutation/add_rows`,
                 data: {
                    'quotation_row' : count,
                    'expo_no_of_rows' : total_no_rows,
                 },
                 
             }).subscribe()
             .then(
                 response => {  
                     console.log(response)
                    $('.expo .expo-app-quotation-table').append(response.view_file);
                 }
             )
             .catch(error => {
              expoErrorMessageCustom.errorMessage(error.errorMessage.errorMessage);            
             });
    }
   }

  /**
   * @author DHARAM VEER <dv@emtpl.in>
   */

  query_scroll_event() {

    
        // $('.expo .expo-edit-query').on('scroll',function(){
        //      alert('test') })
   let parentClass = this;
    $(window).on('scroll',function(){
        // var lastId = $('.loader').attr('id');
        var lastId = $('#expo_load_more').find('td').attr('data-last');

        
        // var Page = $('.loader').attr('page');
        var index_id = $('#expo_load_more').find('td').attr('data-index');
        // var last_page = $('#last_page').val();
      
        if(($(window).scrollTop() == $(document).height() - $(window).height()) && (lastId > 0)) { 
           if(parentClass.isScroll == 0) {
            // alert('test')
                parentClass.isScroll = 1;
                parentClass.query_append_data(lastId, index_id);
           }
        }
     });
  }

  /**
   * 
   * @returns 
   */
   get_person() {
       return function() {
           let company_id = $(this).val();
           expoHttp
           .post({
               url: base_url + `query/get_persons`,
               data:  {
                   'company_id' : company_id
               },
           }).subscribe()
           .then(
               response => {  
                $('.expo select[name=person_id]').html(response.view_file);
               }
           )
           .catch(error => {
            expoErrorMessageCustom.errorMessage(error.errorMessage.errorMessage);          
           });
       }
   }

  /**
   * Add Query 
   */
   add_query(isEdit='') {
       let parentClass = this;
       return function(e) {
            if(isEdit == ''){
                parentClass.validate_query_form();
            }
            else{
                parentClass.validate_query_edit_form();
            }
           
            let form_obj = $('.expo form#expo-query-add-form');
            console.log($(form_obj).serialize());
             if (!$(form_obj).valid()) {
                 return false;
             }
             let upload_query_data = $('.expo #upload_query_data')[0].files[0];

             console.log(upload_query_data);
             let form_data = new FormData(document.getElementById('expo-query-add-form'));
             if(upload_query_data != ''){ 
                form_data.append('upload_query_data', upload_query_data);
             }
             

             console.log('dhARAM')
             console.log(form_data)
             $('.expo .expo-progress').removeClass('hide');
             let loader_obj = $('.expo .expo-add-client');
             $(loader_obj).addClass("expo-disabled");
             expoHttp
             .post({
                 url: base_url + `query/add`,
                 data: form_data,
                 dataType: 'json',
                 contentType: false,
                 cache: false,
                 processData:false,
             }).subscribe()
             .then(
                 response => {  
                     console.log(response)
                    $('.expo #large-Modal').modal('hide');
                    expoSuccessMessageCustom.successMessage(response.message);
                    parentClass.query_list_datatable.ajax.url(base_url + '/query_list_datatable').load();
                 }
             )
             .catch(error => {
              expoErrorMessageCustom.errorMessage(error.errorMessage.errorMessage);            
             });
       }
   }
   /**
    * Validation query form
    */
    validate_query_form() {
        $('.expo form#expo-query-add-form').validate({
            ignore: [":hidden"],
            rules: {
                company_id: {
                    required: true,
                },
                person_id: {
                    required: true,
                },
                quantity: {
                    required: true,
                },
                upload_query_data: {
                    required:true,
                }
            },
        });
    }
    validate_query_edit_form() {
        $('.expo form#expo-query-add-form').validate({
            ignore: [":hidden"],
            rules: {
                company_id: {
                    required: true,
                },
                person_id: {
                    required: true,
                },
                quantity: {
                    required: true,
                },
                upload_query_data: {
                    required:false,
                }
            },
        });
    }
/**
 * Data Table initialize
 */
//  init_query_data_table() {
//     let parentClass = this;
//     let prepare_aoColumnDefs = [
//         { "aTargets": [0], "sClass": "column1" , "width" : "5%" },
//         { "aTargets": [1], "sClass": "column2 expo-name-link-box", "width" : "5%" },
//         { "aTargets": [2], "sClass": "column3" , "width" : "5%"},
//         { "aTargets": [3], "sClass": "column4", "width" : "5%" },
//         { "aTargets": [4], "sClass": "column5 cfx", "width" : "23%" },
//         { "aTargets": [5], "sClass": "column6", "width" : "10%" },
//         { "aTargets": [6], "sClass": "column7", "width" : "10%" },
//         { "aTargets": [7], "sClass": "column8", "width" : "10%" },
//         { "aTargets": [8], "sClass": "column8", "width" : "27%" },
       
//         { "bSortable": false, "aTargets": [ 1, 4, 6, 7 ] }, 
//     ];
//     parentClass.query_list_datatable = $('#expo-query-list-table').DataTable({
//         processing: true,
//         order: [[ 0, "asc" ]],
//         aoColumnDefs: prepare_aoColumnDefs,
//         pageLength: 25,
//         scrollY: 600,
//         scrollX: true,
        
//         language: {
//             search: 'Search',
//             searchPlaceholder: "Search query",
//             sLengthMenu: 'Users per page: _MENU_ <svg xmlns="http://www.w3.org/2000/svg" width="10.121" height="5.811" viewBox="0 0 10.121 5.811"><g id="Group_109543" data-name="Group 109543" transform="translate(-4.939 -6.939)"><g id="Group_109544" data-name="Group 109544"><path id="Path_12459" data-name="Path 12459" d="M6,8l4,4,4-4" fill="none" stroke="#080808" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></g></g></svg>',
//             info: '_START_ - _END_ of _TOTAL_',
//             paginate: {
//                 "previous": '<svg xmlns="http://www.w3.org/2000/svg" width="5.811" height="10.121" viewBox="0 0 5.811 10.121"><g id="Group_109543" data-name="Group 109543" transform="translate(37.194 111.357)"><g id="Group_109544" data-name="Group 109544"><path id="Path_12459" data-name="Path 12459" d="M-32.444-110.3l-4,4,4,4" fill="none" stroke="#6d6d6d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></g></g></svg>',
//                 "next": '<svg xmlns="http://www.w3.org/2000/svg" width="5.811" height="10.121" viewBox="0 0 5.811 10.121"><g id="Group_109543" data-name="Group 109543" transform="translate(37.506 111.357)"><g id="Group_109544" data-name="Group 109544"><path id="Path_12459" data-name="Path 12459" d="M-36.444-102.3l4-4-4-4" fill="none" stroke="#6d6d6d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></g></g></svg>'
//             },
//             loadingRecords: '&nbsp;',
            
//             // fixedHeader: true,
//             //processing: expoLoader.getOverlayLoaderElement()
//         },
        
//         ajax: {
//             "url": base_url + `/query_list_datatable`,
//             "type": "POST",
//             data: function (d) {
//                 //
//             }
//         },
//         fnDrawCallback: function (settings) {
//             if (settings.fnRecordsTotal() <= 10 || settings.fnRecordsDisplay() <= 10) {
//                 $("div.dataTables_paginate").hide();
//                 $("div.dataTables_info").hide();
//             } else {
//                 $("div.dataTables_paginate").show();
//                 $("div.dataTables_info").show();
//             }
//             $("dataTables_wrapper table thead").hide();
//         }
//     });
//     // if (parentClass.clients_list_datatable.page.info().recordsDisplay <= 10) {
//     //     $("div.dataTables_paginate").hide();
//     //     $("div.dataTables_info").hide();
//     // }
//  }

/**
 * Append query data to 
 * @returns html
 */
 query_append_data(lastId, index_id) {
    let parentClass = this;
    $('#expo_load_more').removeClass('hide');
    expoHttp.post({
            url: base_url + `/query_list_fetch`,
            data: {
                lastId : lastId,
                index_id : index_id
           },
        }).subscribe()
        .then(
            response => { 
                $('#expo_load_more').remove();
                $('#expo-app-query-table').append(response.view_file);
                parentClass.remove_loader();
                
                parentClass.isScroll = 0;
               
            }
        )
        .catch(error => {
            $('#expo-app-query-table').find('#expo_load_more').addClass('hide');     
        });
 }

 /**
  * Remove Loader from queries
  */
 remove_loader() {
    $('#expo-app-query-table').find('#expo_load_more').addClass('hide');
 }



 edit_data_prepare_query(){
    return function() {
        let query_id = $(this).attr('data-id');
        expoHttp
        .post({
            url: base_url + `query/prepare`,
            data: {
                query_id : query_id
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