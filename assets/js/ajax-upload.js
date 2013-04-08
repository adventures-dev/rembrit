$(document).ready(function () {
    $('#image').on('change', function () {
        $("#preview").html('');
        $("#preview").html('<i class="icon-spinner icon-spin"></i>');
        $("#imageform").ajaxForm({
            target: '#preview'
        }).submit();
    });
});