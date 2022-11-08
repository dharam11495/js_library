/**
 * Expo login js class 
 */
class Expo_login {
    /**  
     * @author DHARAM VEER <dv@emtpl.in> 
     * 
     *  expoHttp
            .post({
                url: base_url + `url_path`,
                data: {
                    "key": value
                }
            }).subscribe()
            .then(
                response => {
                   write somthing response 
                }
            )
            .catch(error => {
                write somthing if error
            });
     */
    constructor() {
        this.add_event_listeners();
    }
    add_event_listeners() {
        $(document).on("click",".expo .expo-app-login", this.login_user());
        $(document).off("click",".expo .expo-app-login", this.login_user());

        $(document).on("keypress", ".expo form#expo-login-form", this.login_user_event());
        $(document).off("keypress", ".expo form#expo-login-form", this.login_user_event());
    } 
    /**
     * 
     * @returns  url redirect
     */
    login_user() {
        let parentClass = this;
        return function(event) {
           parentClass.login_functionality();
        }
    }

    /**
     * Enter event function 
     */
     login_user_event() {
         let parentClass  = this;
         return function(event) {
            if (event.keyCode == 13) {
               parentClass.login_functionality();
            }
         }
     }

    /**
     * validate 
     */

        validate_login_form() {
        $('.expo #expo-login-form').validate({
                ignore: [":hidden"],
                rules: {
                user_name: {
                    required: true,
                },
                password: {
                    required : true,
                }
            },
        });
    }

    /**
     * Login functionality
     */
    login_functionality() {
        let form_obj = $('.expo .expo-app-login').parents("form#expo-login-form");
        if (!$(form_obj).valid()) {
        return false;
        }

        $('.expo .expo-progress').removeClass('hide');
        let loader_obj = $('.expo .expo-app-login');
        $(loader_obj).addClass("expo-disabled");

        expoHttp
        .post({
            url: base_url + `auth/login`,
            data: $(form_obj).serialize(),
        }).subscribe()
        .then(
            response => {                    
                setTimeout(function() {
                    expoSuccessMessageCustom.successMessage(response.message);
                    $('.expo .expo-progress').addClass('hide');
                    $(loader_obj).removeClass("expo-disabled");
                    window.location.href = response.redirect_url
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
}

