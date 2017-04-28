$(function() {
    $('#go-process-instance').click(function() {
        var procInst = $('#process-instance-input').val();
        window.open(`https://demodev.icolabora.com.br/${procInst}`, '_blank')
    });
});