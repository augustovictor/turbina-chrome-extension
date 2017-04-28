$(function() {
    $('.go-button').click(function() {
        var closestInputId = $(this).attr('for');
        var procInst = $(`#${closestInputId}`);
        var environment = $(`#environments-select option[value=${$('#environments-select').val()}]`);
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
        var url = `${environment.attr('baseurl')}/#${resourceType}/${procInst.val()}`.replace(/(?![\w\d])\/\/+/g, '/'); // Remove excessive bars '/'
        window.open(url, '_blank')
    });

    function slideToggleContainers() {
        $('#new-environment-container').slideToggle();
        $('#actions-container').slideToggle();
    }

    // NEW ENVIRONMENT
    $('#add-environment-btn').click(function() {
        $('#add-environment-btn').toggleClass('toggled-button');
        slideToggleContainers();
    });

    $('#ok-new-env-btn').click(function() {
        var envName    = $('#environment-name-input');
        var envNameVal = envName.val().replace(/ /g, '').toUpperCase();
        var envBaseUrl = $('#environment-baseurl-input');
        
        if(!envNameVal) {
            envName.addClass('error');
            return false;
        } else {
            envName.removeClass('error');
        }

        if(!envBaseUrl.val()) {
            envBaseUrl.addClass('error');
            return false;
        } else {
            envBaseUrl.removeClass('error');
        }

        var newOption = $('<option/>', {
            value  : envNameVal,
            baseurl: envBaseUrl.val().toUpperCase(),
            text   : envName.val().toUpperCase()
        });

        $('#environments-select').append(newOption);
        $('#environments-select').val(envNameVal);
        slideToggleContainers()

    });

    $('#environment-name-input, #environment-baseurl-input').change(function() {
        var envName    = $('#environment-name-input');
        var envBaseUrl = $('#environment-baseurl-input');
        
        if(envName.val()) {
            envName.removeClass('error');
        }

        if(envBaseUrl.val()) {
            envBaseUrl.removeClass('error');
        }
    });
    
});