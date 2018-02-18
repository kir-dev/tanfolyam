function newItemTypeChange() {
    var value = $('#item_type').val();
    $('#item_flavor').prop('disabled', value != 'tobacco')
}
