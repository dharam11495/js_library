class Interaction_js {

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
        $(document).on("click",".interaction .interaction-append-url", this.open_url_in_modal());
        $(document).off("click",".interaction .interaction-append-url", this.open_url_in_modal());
    } 

    open_url_in_modal() {
        return function(event) {
            let url  = $(event.currentTarget).attr('data-url');
            $('.interaction-modal').attr('src',url);
            $('#exampleModalCenter').modal('show');
        }
    }

}
