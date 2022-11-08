/*
* class used to handle Notification Message
*/
class ExpoNotifyCustum {

    constructor() {
        this.delayTiming;
        this.add_event_listeners();
    }


    add_event_listeners(){
        $(document).on('click', '#expo-notification-close', this.expoRemoveNotificationHanlder());
    }


    /* Function used to show success notification message
    * param @messaage
    * return @notification Message
    */
    success(message = null){
        let parentClass = this;
        let messageType = 'expo-success';
        parentClass.expoNotificationCommon(message, messageType);
    }


    /* Function used to show error notification message
    * param @messaage
    * return @notification Message
    */
    error(message = null) {
        let parentClass = this;
        let messageType = 'expo-error';
        parentClass.expoNotificationCommon(message ? message : "Something went wrong", messageType);
    }


    expoRemoveNotificationHanlder() {
        let parentClass = this;
        return function() {
            $("#expo-notification").css({"right":"24px"}).animate({"right":"-460px"}, "500");
            setTimeout(function() {
                $('#expo-notification').remove();
                clearInterval(parentClass.delayTiming);
            }, 800); 
        }
    }



    expoNotificationCommon(message, messageType){
        let parentClass = this;
        let delay = 2000;
        let animateDelay = 800;
        let notificationHTML = '<div id="expo-notification"><div class="expo-notification-inner ' + messageType +'"><span class="expo-notification-message">' + message + '</span><i id="expo-notification-close" class="fa fa-times"></i></div></div>';
        if($('body').find('#expo-notification').length == " "){
            $('body').append(notificationHTML);
            $("#expo-notification").css({"right":"-460px"}).animate({"right":"24px"}, "500");
            parentClass.delayTiming = setTimeout(function() { 
                $("#expo-notification").css({"right":"24px"}).animate({"right":"-460px"}, "500");
                setTimeout(function() { 
                    $('#expo-notification').remove();
                }, animateDelay); 
            }, delay); 
        }
    }
}
let expoNotifyCustum = new ExpoNotifyCustum();
