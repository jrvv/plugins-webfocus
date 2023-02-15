/*
jwfselect2.js v1.0
 
jwfselect2.js is a plugin which has the existing Select2 plugin same functionality, but for WebFOCUS use. With this plugin, we can create an Autocomplete, with data from WebFOCUS.
 
*/
/*
Json for multilanguage (editable):
 
The structure is:
First position - language
Second position - another JSON with this structure:
    First position - an identifier
    Second position - the text we want to display.
*/

////////////////////////////////////////////
(function ($) {
    $.fn.jwfselect2 = function (options) {

        var languageJson = {
            en_US: {
                fex_ajax: 'The variable fex_ajax is necessary',
                type_call: 'The variable type_call is necessary',
                id_select_plugin: 'The variable id_select_plugin is necessary',
                id_select_hidden: 'The variable id_select_hidden is necessary',
                appstudio: 'The variable appstudio is necessary',
                language_error: 'The variable language is wrong.Plugin will not work properly',
                id_select_hidden_exist: 'The variable id_select_hidden contains a wrong name. Plugin will not work properly',
                multiple_default: 'Not possible to be single selection with more than 1 default selection. Plugin will not work properly',
                repository: 'The variable repository is necessary'
            },
            es_ES: {
                fex_ajax: 'La variable fex_ajax es necesaria',
                type_call: 'La variable type_call es necesaria',
                id_select_plugin: 'La variable id_select_plugin es necesaria',
                id_select_hidden: 'La variable id_select_hidden es necesaria',
                language_error: 'La variable language es erroneo. El AutoComplete no va a funcionar correctamente',
                appstudio: 'La variable appstudio es necesaria',
                id_select_hidden_exist: 'La variable id_select_hidden contiene un nombre erroneo. El AutoComplete no va a funcionar correctamente',
                multiple_default: 'No es posible poner seleccion unica con mas de 1 seleccion por defecto. El AutoComplete no va a funcionar correctamente',
                repository: 'La variable repository es necesaria'
            }
        };

        function cloneAutoToSelect(idAuto, idSelect, language) {
            var exist = $('#' + idSelect).length;
            if (exist == 0) {
                alert(languageJson[language].id_select_hidden_exist);
            } else {
                $('#' + idSelect).empty();
                $('#' + idAuto).find('option').clone(true).appendTo('#' + idSelect);
                $('#' + idSelect).find('option').each(function () {
                    $(this).prop('selected', $('#' + idAuto).find('option[value="' + $(this).val() + '"]').prop('selected'));
                });
            }

        }
        function single_selection(idAuto, idSelect, language, appstudio) {
            var my_select_length = $('#' + idAuto + ' option').length;

            if (my_select_length > 1) {
                var lastNode = $('#' + idAuto + ' option:last');
                $('#' + idAuto).empty().append(lastNode);
            }
            if (appstudio == 'yes') {
                cloneAutoToSelect(idAuto, idSelect, language);
            }

        }
        //
        function decodeLanguageSelect2(language) {
            var auxReturn = 'en';
            switch (language) {
                case 'en_US':
                    auxReturn = 'en';
                    break;
                case 'es_ES':
                    auxReturn = 'es';
                    break;
            }
            return auxReturn;
        }

        var settings = $.extend(true, {}, $.fn.jwfselect2.defaults, options);
        $(this).append('<select multiple="' + settings.multiple + '" id="' + settings.id_select_plugin + '" class="js-example-tags ' + settings.class_select_plugin + '" style="width:100%;"></select>');
        var $this = $(this).find('#' + settings.id_select_plugin);

        var select2Language = decodeLanguageSelect2(settings.language);
        //default selection

        $.each(settings.defaultSelected, function (index, key) {

            $('#' + settings.id_select_plugin).append('<option value="' + index + '" selected="selected">' + key + '</option>');
        })

        if (settings.appstudio == 'yes') {
            cloneAutoToSelect(settings.id_select_plugin, settings.id_select_hidden, settings.language);
        }
        //Initial function, called when the plugin is executed.
        var init = function () {
            $this.select2({
                //Title for the searchable textbox
                placeholder: settings.title,
                multiple: settings.multiple,
                allowClear: settings.allowClear,
                language: select2Language,
                templateResult: function (_option) {
                    var _return;
                    if (!_option.id) return _option.text;
                    if (settings.templateResult != false) _return = settings.templateResult(_option);
                    else _return = _option.text;
                    return _return;
                },
                // Ajax call for the Search Results procedure
                ajax: {
                    url: settings.begining_call[settings.type_call],
                    dataType: "JSON",
                    delay: settings.delay,
                    type: settings.callMethod,
                    data: function (params) {
                        //						console.log("ajax")
                        //						console.log(params)
                        var term = (typeof params.term !== 'undefined') ? params.term.toUpperCase() : '';
                        //different behaviour, if edaserve or content.
                        if (settings.type_call == 'edaserve') {
                            var jsonData = {
                                IBIAPP_app: settings.repository,
                                IBIF_ex: settings.fex_ajax + '.fex',
                                LINES_PAGE: settings.num_lines,
                                SORT_ORDER: settings.sortOrder,
                                INPUT: term
                            };
                        } else {
                            var jsonData = {
                                BIP_REQUEST_TYPE: settings.bip_run,
                                IBIMR_prompting: settings.ibimr_prompting,
                                BIP_folder: settings.bip_folder + settings.repository,
                                BIP_item: settings.fex_ajax + '.fex',
                                LINES_PAGE: settings.num_lines,
                                SORT_ORDER: settings.sortOrder,
                                INPUT: term
                            };
                        }

                        if (settings.JWF_MAST != null) jsonData['JWF_MAST'] = settings.JWF_MAST;
                        if (settings.JWF_COD != null) jsonData['JWF_COD'] = settings.JWF_COD;
                        if (settings.JWF_COD_IS_NUM != null) jsonData['JWF_COD_IS_NUM'] = settings.JWF_COD_IS_NUM;
                        if (settings.JWF_DESC != null) jsonData['JWF_DESC'] = settings.JWF_DESC;
                        if (settings.JWF_PROPS != null) jsonData['JWF_PROPS'] = settings.JWF_PROPS;
                        if (settings.ORDER_BY != null) jsonData['ORDER_BY'] = settings.ORDER_BY;

                        if (settings.debugMode == true) jsonData['DEBUG_MODE'] = 'TRUE';

                        // Control for last_load (page control, and re-execute Search Results procedure)
                        if (typeof params.page !== 'undefined') {
                            jsonData['PAGE'] = params.page;
                        } else {
                            settings.last_load = null;
                            settings.last_load_id = null;
                            settings.last_peso = null;
                            settings.tooltip = null;
                            $('#select2-' + $this.attr('id') + '-results li').not('#select2-' + $this.attr('id') + '-results li.loading-results').remove();
                        }
                        if (typeof settings.last_load !== null) {
                            jsonData['LAST_LOAD'] = settings.last_load;
                            jsonData['LAST_LOAD_ID'] = settings.last_load_id;
                            if (typeof settings.last_peso !== null) jsonData['LAST_PESO'] = settings.last_peso;
                            jsonData['TOOLTIP'] = settings.tooltip;

                        }
                        if (settings.addParamsStatic) {
                            $.each(settings.addParamsStatic, function (index, data) {
                                jsonData[index] = data;
                            })
                        }

                        // add token
                        if (window['WFGlobals']) {
                            if (WFGlobals.getSesAuthParm()) {
                                jsonData[WFGlobals.getSesAuthParm()] = WFGlobals.getSesAuthVal();
                            }
                        }

                        $this.find('option:selected').each(function (i) {
                            jsonData['OPT_SEL' + (i + 1)] = $(this).val();
                        });

                        if (settings.addParamsDynamic) {
                            auxJson = settings.addParamsDynamic();
                            if (typeof auxJson === 'object') {
                                $.each(auxJson, function (index, data) {
                                    jsonData[index] = data;
                                });
                            }
                        }
                        return jsonData;
                        // If everything OK, goes to processResults
                    }, processResults: function (data, params) {
                        var _optJson,
                            _arrProps;
                        //						console.log("processResults: ")
                        //						console.log(params)
                        var myResults = [],
                            tot_lines = 0;
                        if ((settings.firstOptSearch == true) && (typeof params.term !== "undefined") && (typeof params.page === 'undefined')) {
                            myResults.push({
                                'id': params.term,
                                'text': 'Ver todos los resultados de "' + params.term + '"',
                                'title': params.term,
                                'firstOption': true
                            });
                        }

                        $.each(data.records, function (index, item) {
                            if (index == 0) tot_lines = item.TOT_LINES;

                            var elem = document.createElement('textarea');
                            elem.innerHTML = item.DESC;
                            var decoded = elem.value;
                            var my_tooltip = decoded;
                            if (typeof item.TOOLTIP !== "undefined") {
                                var elem2 = document.createElement('textarea');
                                elem2.innerHTML = item.TOOLTIP;
                                my_tooltip = elem2.value;
                            }
                            _optJson = {
                                'id': item.COD,
                                'text': decoded,
                                'title': my_tooltip
                            };

                            if (settings.JWF_PROPS != null) {
                                _arrProps = settings.JWF_PROPS.split(',');
                                for (var i = 0; i < _arrProps.length; i++) {
                                    _optJson[_arrProps[i]] = item[_arrProps[i]];
                                }
                            }
                            myResults.push(_optJson);

                            settings.last_load_id = item.COD;
                            settings.last_load = decoded;
                            if (typeof item.PESO !== "undefined") settings.last_peso = item.PESO;
                            tooltip = my_tooltip;
                        });
                        if (settings.onRequestLoad) settings.onRequestLoad.call(this);
                        params.page = params.page || 1;
                        return {
                            results: myResults,
                            pagination: {
                                more: (params.page * settings.num_lines) < tot_lines
                                //                        more:true
                            }
                        };
                        //					},beforeSend : function(xhr) {
                        //						xhr.overrideMimeType('text/html; charset=iso-8859-15');
                    },
                    cache: settings.cache
                },
                minimumInputLength: settings.minimumInputLength
            }).on("change", function (e) {
                settings.last_load = null;
                settings.last_load_id = null;
                settings.last_peso = null;
                settings.tooltip = null;
            });

        };
        // Controls for Attribute plugin. If necessary attribute (example. fex_ajax) does not exist, the plugin does not begin.
        return this.each(function () {

            $this.change(function (event, ui) {
                if (settings.appstudio == 'yes') {
                    cloneAutoToSelect(settings.id_select_plugin, settings.id_select_hidden, settings.language);
                }
                if (settings.multiple == false) {
                    single_selection(settings.id_select_plugin, settings.id_select_hidden, settings.language, settings.appstudio);
                }
                if (settings.onChange) {
                    settings.onChange.call(this);
                }
            });
            var jsonlength = Object.keys(settings.defaultSelected).length;
            if (!settings.fex_ajax) {
                alert(languageJson[settings.language].fex_ajax);
            } else if ((!settings.id_select_hidden) && (settings.appstudio == 'yes')) {
                alert(languageJson[settings.language].id_select_hidden);
            } else if ((jsonlength > 1) && (settings.multiple == false)) {
                alert(languageJson[settings.language].multiple_default);
            } else if (!settings.appstudio) {
                alert(languageJson[settings.language].appstudio);
            } else if (!settings.id_select_plugin) {
                alert(languageJson[settings.language].id_select_plugin);
            } else if (!settings.repository) {
                alert(languageJson[settings.language].repository);
            } else if (!settings.type_call) {
                alert(languageJson[settings.language].type_call);
            } else {
                if (!window['myCustomFlag']) {
                    window['myCustomFlag'] = true;
                    $.ajaxSetup({
                        cache: true
                    });
                    $.when(
                        $.getScript(settings.lang_folder + select2Language + '.js'),
                        $.Deferred(function (deferred) {
                            $(deferred.resolve);
                        })
                    ).done(function () {
                        init.call(this);
                        window['myCustomFlag2'] = true;
                        $.ajaxSetup({
                            cache: false
                        });
                    });

                } else {
                    var checkExist = setInterval(function () {
                        if (window['myCustomFlag2']) {
                            init.call(this);
                            clearInterval(checkExist);
                        }

                    }, 5);
                }
            }
            if (settings.language) {
                var correct = 0;
                $.each(languageJson, function (k, v) {
                    var langu = k;

                    if (langu == settings.language) {
                        correct = 1;
                        return false;
                    } else {

                        correct = 0;

                    }
                });
                if (correct == 0) {
                    alert(languageJson['en_US'].language_error);
                }
            }
            if (settings.onCompleteLoad) {
                settings.onCompleteLoad.call(this);
            }

        });

    };
    //Attributes for plugin
    $.fn.jwfselect2.defaults = {
        appstudio: null,
        id_select_plugin: null,
        class_select_plugin: '',
        id_select_hidden: null,
        defaultSelected: {},
        minimumInputLength: 0,
        multiple: true,
        allowClear: false,
        firstOptSearch: false,
        templateResult: false,
        cache: true,
        callMethod: 'POST',
        onCompleteLoad: null,
        onChange: null,
        onRequestLoad: null,
        sortOrder: 'DESC',
        title: '',
        delay: 250,
        addParamsStatic: null,
        addParamsDynamic: null,
        last_load: null,
        num_lines: 10,
        type_call: 'edaserve',
        begining_call: {
            edaserve: '/ibi_apps/WFServlet?',
            content: '/ibi_apps/run.bip'
        },
        bip_run: 'BIP_RUN',
        bip_folder: 'IBFS:/WFC/Repository/',
        ibimr_prompting: 'OFF',
        language: 'en_US',
        lang_folder: '/approot/jwfselect2/js/i18n/',
        fex_ajax: null,
        repository: null,
        JWF_MAST: null,
        JWF_COD: null,
        JWF_COD_IS_NUM: null,
        JWF_DESC: null,
        JWF_PROPS: null,
        ORDER_BY: null,
        debugMode: false
    };
}(jQuery));