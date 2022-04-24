document.addEventListener(
    "DOMContentLoaded", () => {
        let table = new DataTable('#cities-table', {
            dom: 'Bfrtip',
            buttons: [
                {
                    text: 'Add city',
                    action: function ( e, dt, node, config ) {
                        window.location.pathname = '/cities/new'
                    },
                    className: 'btn btn-primary'
                }
            ]
        });
    }
)

