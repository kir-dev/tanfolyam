document.addEventListener(
    "DOMContentLoaded", () => {
        let table = new DataTable('#rocket-silos-table', {
            dom: 'Bfrtip',
            buttons: [
                {
                    text: 'Add rocket silo',
                    action: function ( e, dt, node, config ) {
                        window.location.pathname = '/silos/new'
                    },
                    className: 'btn btn-primary'
                }
            ]
        });
    }
)

