// chrome.runtime.sendMessage('Hello world')

var global_keys = {
    DEFAULT_ENV: 'activeOption'
}

$(function() {
    var ENVIRONMENTS_CONFIGS_KEY = 'environments_configs';
    // UTILS
    function getEnvironmentsConfigs() {
        chrome.storage.sync.set({ ENVIRONMENTS_CONFIGS_KEY: "myBody" }, function(){
            console.log('Data saved');
        });
        var currentConfigs = chrome.storage.sync.get([ENVIRONMENTS_CONFIGS_KEY], function(items) {
            console.log(`Items: ${items}`);
        })
    }

    function slideToggleContainers() {
        $('#new-environment-container').slideToggle();
        $('#actions-container').slideToggle();
    }

    function getFormattedEnvName(envName) {
        return envName.replace(/[\W]_?|__+/g, '_').toUpperCase().replace(/_+/g, '_');
    }

    function addOptionToSelectEnvs(option) {
        $('#environments-select').append(option);
    }

    function clearSelectEnvsOptions() {
        $('#environments-select').find('option').remove().end();
    }

    function saveData(data) {
        chrome.storage.sync.set(data, function() {
            console.log(`Saved config:`);
            console.log(data);
        });
    }

    function selectDefaultEnv() {
        chrome.storage.sync.get([global_keys.DEFAULT_ENV], function(optionValue) {
            $('#environments-select').val(optionValue[global_keys.DEFAULT_ENV]);
        })
    }

    function getSortedObjectByKey(unsortedObject) {
        var sortedObject = {};
        Object.keys(unsortedObject).sort().forEach(function(key) {
            sortedObject[key] = unsortedObject[key];
        })

        return sortedObject;
    }

    function removeEnvPrefixFromKey(key) {
        return key.replace(/ENV_/g, '');
    }

    function clearAllKeys() {
        chrome.storage.sync.clear();
        return false;
    }

    function checkIfThereIsEnvToShowActions() {
        chrome.storage.sync.get(global_keys.DEFAULT_ENV, function(data) {
            if(data[global_keys.DEFAULT_ENV]) {
                $('#actions-container').slideDown();
            } else {
                $('actions-container').slideUp();
            }
        })
    }

    function buildConfigs() {
        chrome.storage.sync.get(null, function(envs) {
            clearSelectEnvsOptions();
            sortedEnvs = getSortedObjectByKey(envs);
            for(var env in sortedEnvs) {
                if(env.indexOf('ENV_') != -1) {
                    var option = $('<option/>', {
                        value: removeEnvPrefixFromKey(env),
                        baseurl: envs[env],
                        text: removeEnvPrefixFromKey(env)
                    });
                    addOptionToSelectEnvs(option);
                }
            }
        });
    }

    // APPLICATION

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

    // NEW ENVIRONMENT
    $('#add-environment-btn').click(function() {
        $('#add-environment-btn').toggleClass('toggled-button');
        slideToggleContainers();
        $('#actions-container').hide();
    });


    $('#ok-new-env-btn').click(function() {
        var envName     = $('#environment-name-input');
        var envNameVal  = getFormattedEnvName(envName.val());
        var envBaseUrl  = $('#environment-baseurl-input');
        var envNameValLower = envNameVal.toLowerCase();
        
        
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
        $('#environments-select').val(envNameVal).trigger('change');
        slideToggleContainers();

        saveData({[`ENV_${envNameVal}`]: envBaseUrl.val()});

        envName.val('');
        envBaseUrl.val('');
    });

    // APPLICATION CHANGES
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

    $('#environments-select').change(function() {
        saveData({[global_keys.DEFAULT_ENV]: $(this).val()});
    });

    // INIT APPLICATION
    (function init() {
        // clearAllKeys();
        buildConfigs();
        selectDefaultEnv();
        checkIfThereIsEnvToShowActions();
    })();
    
});