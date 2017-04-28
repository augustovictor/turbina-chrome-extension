$(function() {
    $('.go-button').click(function() {
        var closestInputId = $(this).attr('for');
        var procInst = $(`#${closestInputId}`);
        var resourceType;
        if(!procInst.val()) {
            procInst.focus();
            procInst.addClass('error');
            return false;
        }
        procInst.removeClass('error');

        switch($(this).attr('type')) {
            case 'processinstance': {
                resourceType = 'processinstances';
                break;
            }
            case 'task': {
                resourceType = 'tasks';
                break;
            }
            default: {
                alert('No resource type provided.')
                return false;
            }
        }
        window.open(`https://demodev.icolabora.com.br/#${resourceType}/${procInst.val()}`, '_blank')
    });
});