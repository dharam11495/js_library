
// success message custum notification 

class ExpoSuccessMessageCustom {
    /**
    * toast error message
    *
    * @param message
    */
    successMessage(message = null) {
        expoNotifyCustum.success(message);
    }
}

// create object for success custom message
let expoSuccessMessageCustom = new ExpoSuccessMessageCustom();


// error message custum notification 
class ExpoErrorMessageCustom {
    /**
    * toast error message
    *
    * @param message
    */
    errorMessage(message = null) {
        expoNotifyCustum.error(message);
    }
}

// create object for success custom message
let expoErrorMessageCustom = new ExpoErrorMessageCustom();