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
        console.log('jota')
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
            },

            ca_CA: {
                fex_ajax: 'La variable fex_ajax ÃƒÂ©s necessÃƒÂ ria',
                type_call: 'La variable type_call ÃƒÂ©s necessÃƒÂ ria',
                id_select_plugin: 'La variable id_select_plugin ÃƒÂ©s necessÃƒÂ ria',
                id_select_hidden: 'La variable id_select_hidden ÃƒÂ©s necessÃƒÂ ria',
                language_error: 'La variable language ÃƒÂ©s erroni. L\'AutoComplete no funcionarÃƒÂ  correctament',
                appstudio: 'La variable appstudio ÃƒÂ©s necessÃƒÂ ria',
                id_select_hidden_exist: 'La variable id_select_hidden contÃƒÂ© un nom erroni. L\'AutoComplete no funcionarÃƒÂ  correctament',
                multiple_default: 'No es pot posar seleccio unica amb mes de 1 seleccio per defecte. L\'AutoComplete no funcionarÃƒÂ  correctament',
                repository: 'La variable repository ÃƒÂ©s necessÃƒÂ ria'
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
                case 'ca_CA':
                    auxReturn = 'ca';
                    break;
            }
            return auxReturn;
        }
        function addOptions(options) {
            var noExistOptions = options.filter((element) => {
                if ($this.find('option[value="' + element.id + '"').length == 0) return true;
                else {
                    $this.find('option[value="' + element.id + '"').prop("selected", "selected");
                    return false;
                }
            });
            $this.append(
                $.map(noExistOptions, function (element, i) {
                    return $("<option>", { val: element.id, text: element.id, selected: "selected" });
                })
            );
        }
        function readInput(file) {
            readFileContent(file)
                .then((content) => {
                    console.log(content);
                    var options = content
                        .split("\r\n")
                        .filter((element) => element !== "")
                        .map((s) => {
                            var element = s.replace(/"/gi, "").trim();
                            return { id: element, text: element };
                        });
                    addOptions(options);
                    $inputField.prop("value", "");
                    $this.trigger("change");
                    $this.trigger("select2:close");
                })
                .catch((error) => console.log(error));
        }
        function readFileContent(file) {
            var reader = new FileReader();
            return new Promise((resolve, reject) => {
                reader.onload = (event) => resolve(event.target.result);
                reader.onerror = (error) => reject(error);
                reader.readAsText(file);
            });
        }

        var settings = $.extend(true, {}, $.fn.jwfselect2.defaults, options);
        $(this).append('<div class=pluginSelect2 style="display:flex;width:100%;align-items:stretch"><div style="flex-grow: 1;"><select multiple="true" id="' + settings.id_select_plugin + '" class="js-example-tags ' + settings.class_select_plugin + '" style="width:100%;"></select></div></div>');

        $(this).find('.pluginSelect2').append(`<div>
                            <div class="file-upload-wrapper">
                                <input id="input-file-${settings.id_select_plugin}" name="file-upload-field-${settings.id_select_plugin}" type="file" class="file-upload-field" value="">
                            </div>
                        </div>`)

        var $this = $(this).find('#' + settings.id_select_plugin);
        var $inputField = $(this).find('#input-file-' + settings.id_select_plugin);

        var select2Language = decodeLanguageSelect2(settings.language);
        var last_load_id = null;
        var tooltip = null;
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
                placeholder: settings.placeholder,
                multiple: true,
                allowClear: settings.allowClear,
                language: select2Language,
                // Ajax call for the Search Results procedure
                ajax: {
                    url: settings.begining_call[settings.type_call],
                    dataType: "JSON",
                    delay: settings.delay,
                    type: settings.callMethod,
                    data: function (params) {
                        var term = (typeof params.term != 'undefined') ? params.term.toUpperCase() : '';
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
                        // Control for last_load (page control, and re-execute Search Results procedure)
                        if (typeof params.page != 'undefined') {
                            jsonData['PAGE'] = params.page;
                        } else {
                            settings.last_load = null;
                            last_load_id = null;
                            tooltip = null;
                            $('#select2-' + $this.attr('id') + '-results li').not('#select2-' + $this.attr('id') + '-results li.loading-results').remove();
                        }
                        if (settings.last_load) {
                            jsonData['LAST_LOAD'] = settings.last_load;
                            jsonData['LAST_LOAD_ID'] = last_load_id;
                            jsonData['TOOLTIP'] = tooltip;

                        }
                        if (settings.addParamsStatic) {
                            $.each(settings.addParamsStatic, function (index, data) {
                                jsonData[index] = data;
                            })
                        }

                        // add token
                        if (WFGlobals) {
                            if (WFGlobals.getSesAuthParm()) {
                                jsonData[WFGlobals.getSesAuthParm()] = WFGlobals.getSesAuthVal();
                            }
                        }

                        $this.find('option:selected').each(function (i) {
                            jsonData['OPT_SEL' + (i + 1)] = $(this).val();
                        });

                        if (settings.addParamsDynamic) {
                            auxJson = settings.addParamsDynamic();
                            if (typeof auxJson == 'object') {
                                $.each(auxJson, function (index, data) {
                                    jsonData[index] = data;
                                });
                            }
                        }
                        return jsonData;
                        // If everything OK, goes to processResults
                    }, processResults: function (data, params) {

                        var myResults = [], tot_lines = 0;
                        //jota
                        if (params.page === undefined) {
                            this.$element.select2('data').forEach(function (selectedElement, index) {
                                if (params.term === undefined) {
                                    myResults.push({
                                        'id': selectedElement.id,
                                        'text': selectedElement.text,
                                        'title': selectedElement.title,
                                    });
                                } else {
                                    if (selectedElement.text.indexOf(params.term.toUpperCase()) != -1) {
                                        myResults.push({
                                            'id': selectedElement.id,
                                            'text': selectedElement.text,
                                            'title': selectedElement.title,
                                        });
                                    }
                                }
                            })
                        }
                        $.each(data.records, function (index, item) {
                            if (index == 0) {
                                tot_lines = item.TOT_LINES;
                            }

                            var elem = document.createElement('textarea');
                            elem.innerHTML = item.DESC;
                            var decoded = elem.value;
                            var my_tooltip = decoded;
                            if (item.TOOLTIP != undefined) {
                                var elem2 = document.createElement('textarea');
                                elem2.innerHTML = item.TOOLTIP;
                                my_tooltip = elem2.value;
                            }
                            myResults.push({
                                'id': item.COD,
                                'text': decoded,
                                'title': my_tooltip
                            });


                            last_load_id = item.COD;
                            settings.last_load = decoded;
                            tooltip = my_tooltip;
                        });
                        if (settings.onRequestLoad) {
                            settings.onRequestLoad.call(this);
                        }
                        params.page = params.page || 1;
                        return {
                            results: myResults,
                            pagination: {
                                more: (params.page * settings.num_lines) < tot_lines
                                //                        more:true
                            }

                        };

                    }, cache: settings.cache
                }, minimumInputLength: 0
            }).on("change", function (e) {
                settings.last_load = null;
                last_load_id = null;
                tooltip = null;
            }).on("select2:close", function (e) {
                if (settings.onClose) settings.onClose(e);
            }).on('select2:opening', function (e) {

                var a = $(this).data().select2.dropdown.$dropdown;
                $(a).find('.select2-results__option').not('.loading-results').remove()
            });
            $inputField.change(function (event) {
                var input = event.target;
                if ("files" in input && input.files.length > 0) {
                    readInput(input.files[0]);
                }
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
        multiple: true,
        cache: true,
        callMethod: 'POST',
        onCompleteLoad: null,
        onChange: null,
        onClose: null,
        onRequestLoad: null,
        sortOrder: 'DESC',
        title: '',
        placeholder: '',
        allowClear: false,
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
        repository: null
    };
}(jQuery));