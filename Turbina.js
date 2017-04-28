$(function() {
    $('#go-process-instance').click(function() {
        var procInst = $('#process-instance-input');
        if(!procInst.val()) {
            procInst.focus();
            procInst.addClass('error');
            return false;
        }
        procInst.removeClass('error');
        window.open(`https://demodev.icolabora.com.br/#processinstances/${procInst.val()}`, '_blank')
    });
});