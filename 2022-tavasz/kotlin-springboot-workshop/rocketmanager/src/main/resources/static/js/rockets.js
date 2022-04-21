document.addEventListener(
    "DOMContentLoaded", () => {
        let table = new DataTable('#rockets-table', {
            dom: 'Bfrtip',
            buttons: [
                {
                    text: 'Add rocket',
                    action: function ( e, dt, node, config ) {
                        window.location.pathname = '/rockets/new'
                    },
                    className: 'btn btn-primary'
                }
            ]
        });
    }
)

