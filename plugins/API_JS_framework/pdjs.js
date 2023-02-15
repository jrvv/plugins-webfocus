/*polyfill*/
!function (e, n) { "object" == typeof exports && "undefined" != typeof module ? n() : "function" == typeof define && define.amd ? define(n) : n() }(0, function () { "use strict"; function e(e) { var n = this.constructor; return this.then(function (t) { return n.resolve(e()).then(function () { return t }) }, function (t) { return n.resolve(e()).then(function () { return n.reject(t) }) }) } function n() { } function t(e) { if (!(this instanceof t)) throw new TypeError("Promises must be constructed via new"); if ("function" != typeof e) throw new TypeError("not a function"); this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], u(e, this) } function o(e, n) { for (; 3 === e._state;)e = e._value; 0 !== e._state ? (e._handled = !0, t._immediateFn(function () { var t = 1 === e._state ? n.onFulfilled : n.onRejected; if (null !== t) { var o; try { o = t(e._value) } catch (f) { return void i(n.promise, f) } r(n.promise, o) } else (1 === e._state ? r : i)(n.promise, e._value) })) : e._deferreds.push(n) } function r(e, n) { try { if (n === e) throw new TypeError("A promise cannot be resolved with itself."); if (n && ("object" == typeof n || "function" == typeof n)) { var o = n.then; if (n instanceof t) return e._state = 3, e._value = n, void f(e); if ("function" == typeof o) return void u(function (e, n) { return function () { e.apply(n, arguments) } }(o, n), e) } e._state = 1, e._value = n, f(e) } catch (r) { i(e, r) } } function i(e, n) { e._state = 2, e._value = n, f(e) } function f(e) { 2 === e._state && 0 === e._deferreds.length && t._immediateFn(function () { e._handled || t._unhandledRejectionFn(e._value) }); for (var n = 0, r = e._deferreds.length; r > n; n++)o(e, e._deferreds[n]); e._deferreds = null } function u(e, n) { var t = !1; try { e(function (e) { t || (t = !0, r(n, e)) }, function (e) { t || (t = !0, i(n, e)) }) } catch (o) { if (t) return; t = !0, i(n, o) } } var c = setTimeout; t.prototype["catch"] = function (e) { return this.then(null, e) }, t.prototype.then = function (e, t) { var r = new this.constructor(n); return o(this, new function (e, n, t) { this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof n ? n : null, this.promise = t }(e, t, r)), r }, t.prototype["finally"] = e, t.all = function (e) { return new t(function (n, t) { function o(e, f) { try { if (f && ("object" == typeof f || "function" == typeof f)) { var u = f.then; if ("function" == typeof u) return void u.call(f, function (n) { o(e, n) }, t) } r[e] = f, 0 == --i && n(r) } catch (c) { t(c) } } if (!e || "undefined" == typeof e.length) throw new TypeError("Promise.all accepts an array"); var r = Array.prototype.slice.call(e); if (0 === r.length) return n([]); for (var i = r.length, f = 0; r.length > f; f++)o(f, r[f]) }) }, t.resolve = function (e) { return e && "object" == typeof e && e.constructor === t ? e : new t(function (n) { n(e) }) }, t.reject = function (e) { return new t(function (n, t) { t(e) }) }, t.race = function (e) { return new t(function (n, t) { for (var o = 0, r = e.length; r > o; o++)e[o].then(n, t) }) }, t._immediateFn = "function" == typeof setImmediate && function (e) { setImmediate(e) } || function (e) { c(e, 0) }, t._unhandledRejectionFn = function (e) { void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", e) }; var l = function () { if ("undefined" != typeof self) return self; if ("undefined" != typeof window) return window; if ("undefined" != typeof global) return global; throw Error("unable to locate global object") }(); "Promise" in l ? l.Promise.prototype["finally"] || (l.Promise.prototype["finally"] = e) : l.Promise = t });
/*OnCreate*/
!function (t) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t : t(jQuery) }(function (t, e) { t || (t = t.fn.jquery ? t : jQuery), e || (e = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || !1); var i = 0; function a(t) { var i; this.observe = function (a, n) { e ? (i = i || new e(t)).observe(a, n) : i = setInterval(t, 50) }, this.disconnect = function () { i && (e ? i.disconnect() : clearInterval(i)) } } function n(e, a, n) { this.callback = e, this.conditions = a, this.multi = n || !1, this.cbid = i++, this.processed = t([]) } function c(e) { var i = {}; return e.attributes && t.each(e.attributes, function (t, e) { i[e.name] = e.value }), i } function r(e, i) { var a = []; return t.each(e, function (t, e) { void 0 !== i[t] && e === i[t] || a.push({ attributeName: t }) }), t.each(i, function (t) { void 0 === e[t] && a.push({ attributeName: t }) }), a } var o = { attach: function (i) { var o = i.type, s = i.callback, u = i.multi || !1, l = i.conditions; this.data("onMutate") || this.data("onMutate", { create: { callbacks: [], ignore: !1 }, modify: { callbacks: [], ignore: !1 }, text: { callbacks: [], ignore: !1 } }); var d = this.data("onMutate")[o], f = d.callbacks, h = new n(s, l, u); f.unshift(h), e || "modify" !== o || (d.attributeMap = c(this[0])), "text" === o && (d.text = this.text()); var b, v, p = this, y = d.mutcallback = d.mutcallback || function (i) { if (f = d.callbacks, !d.ignore) { var a, n, s, u, l, h, y, m, g, x; for (d.ignore = !0, "modify" === o && (a = c(p[0])), "text" === o && (n = p.text()), b = f.length - 1; b >= 0; b--) { console.log(f[b]); var M = "create" === o ? t(f[b].conditions, p) : p, w = f[b].processed, j = M.not(w); if ("modify" === o) { v = !1, e || (i = r(a, d.attributeMap)); for (var O = 0; O < i.length; O++)v = v || (s = i[O], u = p, l = f[b], h = void 0, y = void 0, m = void 0, g = void 0, x = void 0, h = s.attributeName, y = u.attr(h), m = l.conditions || !1, g = !!m && m[0], x = !(!m || !m[1]) && m[1], (!g || g.indexOf(h) > -1) && (!x || y.search(x) >= 0)) } if ("text" === o) { v = !1; var C = f[b].conditions; n !== d.text && (v = !C || n.search(C) > -1) } j.length > 0 && ("create" === o || v) && ("create" === o && (w = w.add(j)), f[b].processed = w, f[b].callback.call(p, j), f[b].multi || f.splice(b, 1)), "modify" === o && (d.attributeMap = c(p[0])), "text" === o && (d.text = p.text()) } if (d.ignore && setTimeout(function () { d.ignore = !1 }, 1), 0 === f.length) { if (!k) return !0; k.disconnect() } } }; if ("create" === o && y()) return this; var m, k = d.observer = d.observer || new a(y); switch (o) { case "create": m = { childList: !0, subtree: !0 }; break; case "modify": m = { attributes: !0 }, l && (m.attributeFilter = l[0].split(" ")); break; case "text": m = { childList: !0, characterData: !0, subtree: !0 } }return k.observe(p[0], m), this }, detach: function (t) { if (!this.data("onMutate")) return this; var e = t.type, i = this.data("onMutate")[e], a = i.callbacks, n = t.callback; if (n) for (var c = a.length - 1; c >= 0; c--)a[c].callback.prototype.cbid === n.prototype.cbid && a.splice(c, c + 1); else i.callbacks = []; return a.length || i.observer.disconnect(), this } }; t.fn.extend({ onCreate: function () { var t = Array.prototype.slice.call(arguments); return "string" != typeof t[0] ? this : "detach" === t[0] ? o.detach.call(this, { type: "create", callback: t[1] }) : "string" == typeof t[0] && "function" == typeof t[1] ? o.attach.call(this, { type: "create", conditions: t[0], callback: t[1], multi: t[2] }) : this } }), t.onCreate = function (e, i, a) { t(document).onCreate(e, i, a) } });

//############################################# BASE #############################################
(function (win, $) {

	if (typeof win.$pd == 'function') {
		return;
	}

	var $pd = function (selector) {
		var arrayElements = $(selector).get();
		if (arrayElements.length) {
			var pdObj = new pdClass(arrayElements);
			return pdObj;
		} else {
			return null;
		}
	};

	function isPanelContainer(selector) {
		return $(selector).filter('[data-ibx-type!="pdContainer"]').length === 0
			&& $(selector).find('[data-ibxp-type=bip_launch]').length > 0;
	}

	function isSimplePanelContainer(selector) {
		return isPanelContainer(selector) &&
			$(selector).filter('[data-ibxp-type!="panel"]').length === 0;
	}

	function isTabPanelContainer(selector) {
		return isPanelContainer(selector) &&
			$(selector).filter('[data-ibxp-type!="tab"]').length === 0;
	}

	function isAccordionPanelContainer(selector) {
		return isPanelContainer(selector) &&
			$(selector).filter('[data-ibxp-type!="accordion"]').length === 0;
	}

	function isSlidePanelContainer(selector) {
		return isPanelContainer(selector) &&
			$(selector).filter('[data-ibxp-type!="carousel"]').length === 0;
	}

	function isLaunchContainer(selector) {
		return $(selector).filter('[data-ibx-type!="bip_launch"]').length === 0;
	}

	function isIframeContainer(selector) {
		return $(selector).filter('[data-ibx-type!="pdIFrame"]').length === 0;
	}

	function getParentPanelContainer(elem) {
		return $(elem).closest('[data-ibx-type="pdContainer"]')[0];
	}

	function getParentLaunchContainer(elem) {
		return $(elem).closest('[data-ibxp-type="bip_launch"]')[0];
	}

	$pd.onCreate = function (selector, callback) {
		return $.onCreate(selector, callback);
	}

	$pd.onCreateDaemon = function () {
		var _self = _self || this,
			_arguments = arguments,
			callback = _arguments[_arguments.length - 1],
			numExist = 0;
		for (var i = 0; i < _arguments.length - 1; i++) {
			if ($(_arguments[i]).length > 0) numExist++;
		}
		if (numExist == _arguments.length - 1) {
			if (callback) callback();
		} else {
			setTimeout(function () {
				$pd.onCreateDaemon.apply(undefined, _arguments);
			}, 500)
		}
	}

	//TODO: Add Filter as part of pdClass
	$pd.addFilter = function (options) {
		var filterObj = new pdFilterClass(options);
		filterObj.createFilter();
		return filterObj;
	};

	$pd.setFilterValue = function (selector, value) {
		//TODO: Set Filter by type
		$(selector).val(value);

		var e = jQuery.Event('keydown', { which: $.ui.keyCode.ENTER });
		$(selector).trigger(e);
	};

	function pdFilterClass(options) {

		var _this = this;

		var _headHtml = options.headHtml || 'Filter',
			_id = options.id || ('pdCustomFilter_' + (Math.floor(Math.random() * 20))),
			_type = options.type || 'input',
			_width = options.width || '25%',
			_filtersContainer = options.filtersContainer || '[data-ibx-type=pdFilterGrid]:last';

		_this.createFilter = function () {

			var $parentElem = $('[data-ibx-type=pdFilterGrid]'),
				htmlCode = '';
			//TODO: Create filter by type

			switch (_type) {
				// case div
				case 'div':
					//htmlCode = '<div id="' + _id + '" class="pdCustomFilter ibx-flexbox ibx-flexbox-horizontal pd-filter-cell fbx-block fbx-row fbx-wrap fbx-justify-content-center fbx-justify-items-center fbx-align-items-start fbx-align-content-start fbx-child-sizing-content-box pd-iss ibx-flex-grid-cell ibx-flex-grid-span-1" style="width:' + _width + '">' + 
					htmlCode = '<div id="' + _id + '" class="pdCustomFilter ibx-flexbox ibx-flexbox-horizontal fbx-block fbx-row fbx-wrap fbx-justify-content-center fbx-justify-items-center fbx-align-items-start fbx-align-content-start fbx-child-sizing-content-box pd-iss ibx-flex-grid-cell ibx-flex-grid-span-1" style="width:' + _width + '">' +
						//   '   <div class="ibx-flexbox ibx-flexbox-vertical pd-filter-panel undefined pd-iss fbx-block fbx-column fbx-nowrap fbx-align-items-stretch fbx-align-content-stretch fbx-child-sizing-content-box">' +
						'   <div class="ibx-flexbox ibx-flexbox-vertical  pd-iss fbx-block fbx-column fbx-nowrap fbx-align-items-stretch fbx-align-content-stretch fbx-child-sizing-content-box" style="width:100%">' +
						'      <div class="pdCustomFilterPanel pd-filter-panel-content ibx-flexbox fbx-block fbx-column fbx-nowrap fbx-justify-content-center fbx-justify-items-center fbx-align-items-stretch fbx-align-content-stretch fbx-child-sizing-content-box top">' +
						'         <div class="pd-amper-label ibx-flexbox ibx-label ibx-label-no-icon icon-left fbx-inline fbx-row fbx-nowrap fbx-justify-content-center fbx-justify-items-center fbx-align-items-center fbx-align-content-center fbx-child-sizing-content-box">' +
						'            <div class="ibx-label-text" style="white-space: nowrap;">' + _headHtml + '</div>' +
						'         </div>' +
						'         <div class="ibx-flexbox ibx-text-field fbx-inline fbx-row fbx-nowrap fbx-justify-content-start fbx-justify-items-start fbx-align-items-center fbx-align-content-center fbx-child-sizing-content-box"><div class="pd-custom-filter-input" style="width:100%;"></div></div>' +
						'      </div>' +
						'   </div>' +
						'</div>';
					break;
				// case input
				default:
					htmlCode = '<div id="' + _id + '" class="ibx-flexbox ibx-flexbox-horizontal pd-filter-cell fbx-block fbx-row fbx-wrap fbx-justify-content-center fbx-justify-items-center fbx-align-items-start fbx-align-content-start fbx-child-sizing-content-box pd-iss ibx-flex-grid-cell ibx-flex-grid-span-1" style="width:' + _width + '">' +
						'   <div class="ibx-flexbox ibx-flexbox-vertical pd-filter-panel undefined pd-iss fbx-block fbx-column fbx-nowrap fbx-align-items-stretch fbx-align-content-stretch fbx-child-sizing-content-box">' +
						'      <div class="pd-filter-panel-content ibx-flexbox fbx-block fbx-column fbx-nowrap fbx-justify-content-center fbx-justify-items-center fbx-align-items-stretch fbx-align-content-stretch fbx-child-sizing-content-box top">' +
						'         <div class="pd-amper-label ibx-flexbox ibx-label ibx-label-no-icon icon-left fbx-inline fbx-row fbx-nowrap fbx-justify-content-center fbx-justify-items-center fbx-align-items-center fbx-align-content-center fbx-child-sizing-content-box">' +
						'            <div class="ibx-label-text" style="white-space: nowrap;">' + _headHtml + '</div>' +
						'         </div>' +
						'         <div class="ibx-flexbox ibx-text-field fbx-inline fbx-row fbx-nowrap fbx-justify-content-start fbx-justify-items-start fbx-align-items-center fbx-align-content-center fbx-child-sizing-content-box"><input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="pd-custom-filter-input ui-autocomplete-input" type="text"></div>' +
						'      </div>' +
						'   </div>' +
						'</div>';


			}

			var $container = $(htmlCode);

			if (_filtersContainer == '[data-ibx-type=pdFilterGrid]:last') {
				$(_filtersContainer).append($container);
			} else {
				$(_filtersContainer).after($container);
			}


			_this.getFilterDOMElement = function () {
				return $('#' + _id)[0];
			};

			_this.getInputDOMElement = function () {
				return $('#' + _id + ' .pd-custom-filter-input')[0];
			};

			return _this;

		}

	}

	function pdClass(selector) {

		//Only panels are allowed
		var panelElements = $(selector).filter(function (i, elem) {
			var isPanel = isPanelContainer(elem);
			if (!isPanel) {
				console.error("ERROR pdClass: Elem is not panel");
			}
			return isPanel;
		}).get();

		if (panelElements.length == 0) {
			throw 'ERROR pdClass: No panel is selected';
		}

		var _panelObjects = $(panelElements).map(function (i, DOMObj) {
			return new pdPanelClass(DOMObj);
		}).get();

		this.getPanelObjects = function () {
			return _panelObjects;
		};

	}

	function pdPanelClass(panelDOMObj) {

		var _self = this;

		_self.element = panelDOMObj;
		_self.selectedPanelDOMObjIndex = 0;

		var _type = $(panelDOMObj).attr('data-ibxp-type');

		_self.isSimplePanel = function () {
			return isSimplePanelContainer(_self.element)
		},
			_self.isTabPanel = function () {
				return isTabPanelContainer(_self.element)
			},
			_self.isSlidePanel = function () {
				return isSlidePanelContainer(_self.element)
			},
			_self.isAccordionPanel = function () {
				return isAccordionPanelContainer(_self.element)
			};
		if (_self.isTabPanel() || _self.isSlidePanel() || _self.isAccordionPanel()) {
			_self.getSubsectionLinkDOMElements = function () {

				var subsectionLinksDOMElements = {
					linksDomElements: [],
					prev: undefined,
					next: undefined
				};
				if (_self.isTabPanel()) {
					subsectionLinksDOMElements.linksDomElements = 'div[data-ibx-type="ibxRadioButton"][role="tab"]';
				} else if (_self.isSlidePanel()) {
					subsectionLinksDOMElements.linksDomElements = 'div[role="option"][aria-checked]';
					subsectionLinksDOMElements.prev = '[data-ibxp-class="ibx-csl-prev-btn"][role="button"]';
					subsectionLinksDOMElements.next = '[data-ibxp-class="ibx-csl-next-btn"][role="button"]';

				} else if (_self.isAccordionPanel()) {
					subsectionLinksDOMElements.linksDomElements = 'div[data-ibx-type="pdAccordionPage"]';
				}
				return subsectionLinksDOMElements;
			}
		}

		var _launchContainers = $(panelDOMObj).find('[data-ibx-type="pdContent"]').map(function (i, contentDOMObj) {
			return new pdLaunchContainerClass(contentDOMObj, _self);
		}).get();

		_self.getLaunchContainerByIndex = function (index) {
			return _launchContainers[index];
		};

		_self.getType = function () {
			return _type;
		};

		_self.getLaunchContainers = function () {
			return _launchContainers;
		};

		function _getParentPageDOM() {
			return $(_self.element).closest('[data-ibx-type="pdPage"]')[0];
		}

		function _getParentPageRunnerDOM() {
			return $(_self.element).closest('[data-ibx-type="pdPageRunner"]')[0];
		}

		function _hideInfoButtons() {
			$('.pd-info-tooltip').remove();
		}

		_self.showInfoButton = function (title, body) {
			_hideInfoButtons();
			$(_getParentPageRunnerDOM()).off('scroll', _hideInfoButtons);
			$(_getParentPageRunnerDOM()).on('scroll', _hideInfoButtons);

			_removeHeaderButton("pd-info-gadget-button");
			if (body) {
				_addHeaderButton({
					mainClass: "pd-container-title-button-resize",
					extraOptions: {
						"tooltip": 'Show Info',
						"glyphClasses": "fa fa-info-circle"
					},
					extraClasses: ["pd-info-gadget-button"],
					clickEventFn: function (e) {
						var position = $(this).offset(),
							buttonWidth = $(this).outerWidth(true),
							buttonHeight = $(this).outerHeight(true);

						var $tooltip = $('<div/>').addClass('pd-info-tooltip').css({
							'min-height': buttonHeight + "px",
							'min-width': ($pd.utils.isIE()) ? '200px' : 'auto'
						});

						$('<span>')
							.attr('class', 'pd-tooltip-info-gadget-close-button fa fa-window-close-o fa-3')
							.click(_hideInfoButtons)
							.appendTo($tooltip);

						if (title) {
							$('<h4/>')
								.css('margin-top', '0px')
								.html(title)
								.appendTo($tooltip);
						}

						bodyWithLineBreaks = body.replace(/\n/g, '<br>');
						var $summary = $('<div/>')
							.html(bodyWithLineBreaks)
							.appendTo($tooltip);

						$('body').append($tooltip);

						$tooltip.css('top', position.top + "px")
							.css('left', (position.left + buttonWidth) + "px");

						$tooltip.mouseleave(function () {
							setTimeout(_hideInfoButtons, 200);
						});
					}
				});
			}
		};

		function _removeHeaderButton(className) {
			_self.element.ibaObject.removeButton("." + className);
		}

		function _addHeaderButton(customOptions) {
			var defaultOptions = {
				mainClass: "pd-container-title-button-resize",
				extraOptions: {
					"glyphClasses": "fa fa-info-circle"
				},
				extraClasses: [],
			};

			var options = $.extend(defaultOptions, customOptions);

			var DOMButton = _self.element.ibaObject.addButton(options.extraOptions, "." + options.mainClass, true);

			$(options.extraClasses).each(function (i, classToAdd) {
				if ($(DOMButton).hasClass(classToAdd)) {
					return true;
				}

				$(DOMButton).addClass(classToAdd);
			});

			if (typeof options.clickEventFn === "function") {
				$(DOMButton).click(options.clickEventFn);
			}
		}
	}

	function pdLaunchContainerClass(contentDOMObj, parentPanelObj) {
		var _self = this;

		_self.getPdPanel = function () {
			return parentPanelObj;
		};

		var _path = $(contentDOMObj).ibxWidget('option', 'path'),
			_file = $(contentDOMObj).ibxWidget('option', 'file');

		_self.getFilePath = function () {
			return _path;
		};

		_self.getFileName = function () {
			return _file;
		};

		_self.getFileUrl = function () {
			return _path + _file;
		};

		_self.showInfoButtonAsync = function () {
			var $d = $.Deferred();

			var getTitlePromise = _self.getTitleInfoAsync(),
				getSummaryPromise = _self.getSummaryInfoAsync();

			Promise.all([getTitlePromise, getSummaryPromise]).then(function (arrayValues) {
				var title = arrayValues[0],
					summary = arrayValues[1],
					pdPanel = _self.getPdPanel();

				pdPanel.showInfoButton(title, summary);
				$d.resolve();
			});

			return $d.promise();
		};

		_self.getTitleInfoAsync = function () {
			return _self.getPropertyValueByNameAsync("description");
		};

		_self.getSummaryInfoAsync = function () {
			return _self.getPropertyValueByNameAsync("summary");
		};

		_self.getPropertyValueByNameAsync = function (name) {
			var $d = $.Deferred();

			_getPropertiesByLaunchContainerAsync()
				.done(function (properties) {
					var propValue = $(_properties).filter(function (i, prop) {
						return prop.name == name
					})[0].value;
					$d.resolve(propValue);
				}).fail(function (error) {
					debugger;
					$d.reject(error);
				});

			return $d.promise();
		}

		var _properties = [];

		function _getPropertiesByLaunchContainerAsync() {
			var $d = $.Deferred();

			if (_properties.length) {
				$d.resolve(_properties);
			} else {
				$pd.utils.ajax({
					url: '/ibi_apps/properties.bip',
					data: {
						BIP_REQUEST_TYPE: 'BIP_VIEWPROPS',
						path: _self.getFileUrl()
					},
					dataType: 'xml'
				}).done(function (response) {
					_properties = $(response).find('property').map(function (i, prop) {
						return {
							name: $(prop).attr('name'),
							value: $(prop).attr('value')
						};
					}).get()
					$d.resolve(_properties);
				}).fail(function (error) {
					debugger;
					$d.reject(error);
				});
			}

			return $d.promise();
		};
	}

	pdClass.prototype.addInfo = function () {
		var _self = this;

		var pdPanels = _self.getPanelObjects();

		$(pdPanels).each(function (i, pdPanel) {

			var isSimplePanel = isSimplePanelContainer(pdPanel.element),
				isTabPanel = isTabPanelContainer(pdPanel.element),
				isSlidePanel = isSlidePanelContainer(pdPanel.element),
				isAccordionPanel = isAccordionPanelContainer(pdPanel.element);

			if (pdPanel.isSimplePanel()) {
				var pdLaunchContainer = pdPanel.getLaunchContainers()[0];
				return pdLaunchContainer.showInfoButtonAsync();
			} else {
				var pdLaunchContainer = pdPanel.getLaunchContainerByIndex(0);
				$(pdPanel.element).on('click', pdPanel.getSubsectionLinkDOMElements().linksDomElements, function (e) {
					var target = this,
						clickedIndex = 0;

					$(pdPanel.element).find(pdPanel.getSubsectionLinkDOMElements().linksDomElements).each(function (subsectionIndex, subsectionLinkDOMElement) {
						if (target === subsectionLinkDOMElement) {
							clickedIndex = subsectionIndex;
							return false;
						}
					});
					pdPanel.selectedPanelDOMObjIndex = clickedIndex;
					var pdLaunchContainer = pdPanel.getLaunchContainerByIndex(clickedIndex);
					pdLaunchContainer.showInfoButtonAsync();
				});

				if (pdPanel.getSubsectionLinkDOMElements().prev) {
					$(pdPanel.element).on('click', pdPanel.getSubsectionLinkDOMElements().prev, function (e) {
						var subsectionLinkDOMElements = pdPanel.getSubsectionLinkDOMElements();
						if (pdPanel.selectedPanelDOMObjIndex == 0) {
							pdPanel.selectedPanelDOMObjIndex = $(pdPanel.element).find(subsectionLinkDOMElements.linksDomElements).length - 1;
						} else {
							pdPanel.selectedPanelDOMObjIndex--;
						}

						var pdLaunchContainer = pdPanel.getLaunchContainerByIndex(pdPanel.selectedPanelDOMObjIndex);
						pdLaunchContainer.showInfoButtonAsync();
					});
				}

				if (pdPanel.getSubsectionLinkDOMElements().next) {
					$(pdPanel.element).on('click', pdPanel.getSubsectionLinkDOMElements().next, function (e) {
						var subsectionLinkDOMElements = pdPanel.getSubsectionLinkDOMElements();
						if (pdPanel.selectedPanelDOMObjIndex == $(pdPanel.element).find(subsectionLinkDOMElements.linksDomElements).length - 1) {
							pdPanel.selectedPanelDOMObjIndex = 0;
						} else {
							pdPanel.selectedPanelDOMObjIndex++;
						}

						var pdLaunchContainer = pdPanel.getLaunchContainerByIndex(pdPanel.selectedPanelDOMObjIndex);
						pdLaunchContainer.showInfoButtonAsync();
					});
				}
				return pdLaunchContainer.showInfoButtonAsync();
			}

		});

		return _self;
	};

	if (typeof win.$pd != 'function') {
		win.$pd = $pd;
	}

})(window, jQuery);

//############################################# UTILS #############################################
(function (win, $pd, $) {

	if (typeof $pd.utils == 'object') {
		return;
	}

	$.getStylesheet = function (href) {
		var $d = $.Deferred();
		var $link = $('<link/>', {
			rel: 'stylesheet',
			type: 'text/css',
			href: href
		}).appendTo('head');
		$d.resolve($link);
		return $d.promise();
	};

	function _getComponents(components, $d) {
		var aux_url = '/ibi_apps/run.bip?BIP_REQUEST_TYPE=BIP_LAUNCH&BIP_folder=',
			_extension,
			_url_partition,
			_item,
			_folder,
			$dTotal = 0,
			$dCont = 0;

		function checkPromiseController() {
			$dCont++;
			if ($dCont == $dTotal) {
				components.shift();
				if (components.length > 0) {
					_getComponents(components, $d);
				} else {
					$d.resolve();
				}
			}
		}
		for (var i = 0; i < components[0].length; i++) {
			$dTotal = components[0].length;
			_extension = components[0][i].split('.').pop();
			_url_partition = components[0][i].split('/');
			_item = _url_partition.pop();
			_folder = _url_partition.join('/');
			_url = aux_url + _folder + '/&BIP_item=' + _item;
			switch (_extension) {
				case 'js':
					$.getScript(_url, function () {
						checkPromiseController();
					});
					break;
				case 'css':
					$.when($.getStylesheet(_url)).done(function () {
						checkPromiseController();
					});
					break;
			}
		}
	}

	var utils = {
		log: function (msg) {
			console.log(msg);
		},
		ajax: function (userOptions, callBack) {

			var defaultOptions = {
				url: '/ibi_apps/run.bip',
				data: {},
				cache: true,
				async: true,
				dataType: 'text',
			};

			var options = $.extend(defaultOptions, userOptions);

			return $.ajax({
				url: options.url,
				data: options.data,
				cache: options.cache,
				async: options.async,
				dataType: options.dataType,
				success: function (data, textStatus, jqXHR) {
					if (callBack) callBack(data, textStatus, jqXHR);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					utils.log(XMLHttpRequest, textStatus, errorThrown);
				}
			});
		},
		getToken: function () {
			var returnToken = {}
			returnToken[WFGlobals.ses_auth_parm] = WFGlobals.ses_auth_val;
			return returnToken;
		},
		isIE: function msieversion() {
			var ua = window.navigator.userAgent,
				msie = ua.indexOf("MSIE "),
				isIeReturn = false;

			if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
				isIeReturn = true;
				console.log(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
			}
			return isIeReturn;
		},
		getComponents: _getComponents
	}

	if (typeof $pd.utils != 'object') {
		$pd.utils = utils;
	}

})(window, $pd, jQuery);

///////////////////////////////////////////////////////////////////////////////////////////////

//############################################# FACILITIES #############################################
(function (win, $pd, $) {

	if (typeof $pd.facilities == 'object') {
		return;
	}

	var facilities = {
		plugins: function () {
			function checkArrayPosition(arrayComponent) {
				var arraReturn = new Array();
				if (arrayComponent) {
					arraReturn = arrayComponent;
				}
				return arraReturn;
			}
			var arrayComponents = new Array();
			for (var i = 0; i < arguments.length - 1; i++) {
				switch (arguments[i]) {
					case 'jwfselect2':
						arrayComponents[0] = checkArrayPosition(arrayComponents[0]).concat([
							'IBFS:/WFC/Repository/public/plugins/jwfselect2/select2/select2.css',
							'IBFS:/WFC/Repository/public/plugins/jwfselect2/select2/select2.js'
						]);
						arrayComponents[1] = checkArrayPosition(arrayComponents[1]).concat([
							'IBFS:/WFC/Repository/public/plugins/jwfselect2/jwfselect2.js'
						]);
						break;
					case 'ibxRadioGroup_selectedToFirst':
						arrayComponents[0] = checkArrayPosition(arrayComponents[0]).concat([
							'IBFS:/WFC/Repository/public/plugins/ibxRadioGroup_selectedToFirst/ibxradiogroup_selectedtofirst.js',
						]);
						break;
					case 'hideSection_onSubmit':
						arrayComponents[0] = checkArrayPosition(arrayComponents[0]).concat([
							'IBFS:/WFC/Repository/public/plugins/hideSectionsOnsubmit/hidesectiononsubmit.js',
						]);
						break;

				}
			}
			$pd.utils.getComponents(arrayComponents, arguments[arguments.length - 1]);
		},
		createJwfSelect2: function (options) {
			debugger
			var _defaults = {
				id: null,
				target_text: null,
				debug_mode: false,
				width: '50%',
				title: 'Title',
				placeholder: null,
				defaultSelected: {},
				fex_ajax: 'jwfselect2_parser',
				repository: 'public/plugins/jwfselect2/',
				order_by: null,
				language: 'en_US',
				num_lines: 15,
				multiple: true,
				upLoadFile: false,
				allowClear: false,
				query_config: {},
				onChange: function () { },
				onCompleteLoad: function () { },
				onCloseOption: function () { },
				onRequestLoad: function () { },
				addParamsDynamic: function () {
					return {};
				},
				addParamsStatic: {},
				dependecies: []
			},
				settings = $.extend(true, {}, _defaults, options);

			var filterObj = $pd.addFilter({
				width: settings.width,
				headHtml: settings.title,
				id: 'pdCustomFilter_' + settings.id, //jot
				//                    filtersContainer: $(settings.page._element).find('[data-ibx-type="pdFilterGrid"]')[0],
				filtersContainer: $(options.target_text).get(0),
				type: "div"
			});

			var $div_jwfselect2 = $(filterObj.getInputDOMElement());
			$div_jwfselect2.jwfselect2({
				appstudio: 'no',
				id_select_plugin: settings.id,
				title: settings.title,
				placeholder: settings.placeholder == null ? settings.title : settings.placeholder,
				allowClear: settings.allowClear,
				fex_ajax: settings.fex_ajax,
				type_call: 'content',
				defaultSelected: settings.defaultSelected,
				repository: settings.repository,
				bip_run: 'BIP_LAUNCH',

				language: settings.language,
				lang_folder: '/ibi_apps/run.bip?BIP_REQUEST_TYPE=BIP_LAUNCH&BIP_folder=IBFS:/WFC/Repository/public/plugins/jwfselect2/select2/i18n/&BIP_item=',
				num_lines: settings.num_lines,
				multiple: settings.multiple,
				upLoadFile: settings.upLoadFile,
				onChange: function () {
					settings.onChange();
					var terms = $('#' + settings.id + ' option:selected');
					var textWhere = '';
					for (var i = 0; i < terms.length; i++) {
						//    textWhere += (i > 0)? "," : ""; //jot cambiar por OR
						textWhere += (i > 0) ? " OR " : "";
						textWhere += "'" + $(terms[i]).val() + "'";
						if ($('#' + $(terms[i]).val().replace(/([#;&,.+\-_=?{}*~\':%"!^$[\]()=>|\/])/g, "\\$1")).length == 0) { //jot replace
							$('body').append(
								$('<input/>').attr({
									'id': $(terms[i]).val(),
									'value': $(terms[i]).text(),
									'type': 'hidden'
								})
							);
						}
					}
					var e = jQuery.Event('keydown', { which: $.ui.keyCode.ENTER });
					settings.target_text.find("input").val(textWhere).trigger(e);

				},
				onCompleteLoad: function () {
					settings.onCompleteLoad();
					if (!settings.debug_mode) {
						settings.target_text.hide();
					}
				},
				onClose: function () {
					settings.onClose();
				},
				onRequestLoad: settings.onRequestLoad,
				addParamsDynamic: function () {
					settings.addParamsDynamic();

					var auxJson = settings.addParamsDynamic();
					if (settings.order_by != null) {
						auxJson['ORDER_BY'] = settings.order_by;
					}
					if (settings.dependecies) {
						var dependencyIndex = 0;
						for (var i = 0; i < settings.dependecies.length; i++) {
							dependencyIndex = i + 1;
							if (!settings.dependecies[i].condition) {
								settings.dependecies[i].condition = function () { return true; };
							}
							if (settings.dependecies[i].condition()) {
								switch (settings.dependecies[i].type) {
									case 'text':
										auxJson['DEPENDENCY' + dependencyIndex] = $(settings.dependecies[i].selector + ' input[type="text"]').val();
										break
									case 'calendar':
										auxJson['DEPENDENCY' + dependencyIndex] = $(settings.dependecies[i].selector + ' .ibx-datepicker-input .ibx-label-text').text();
										break
									case 'select_multiple':
										var allOption = ($(settings.dependecies[i].selector + ' div[data-ibxp-amper-show-all="true"]').length == 0) ? false : true,
											inCondition = '',
											dependencyIndexCont = 0;
										$(settings.dependecies[i].selector + ' input[type="checkbox"]').closest('div[role="checkbox"][aria-checked]').each(function (index) {
											if ($(this).attr('aria-checked') == "true") {
												if ((index != 0) || (!allOption)) {
													dependencyIndexCont++;
													inCondition += (inCondition == '') ? '' : ',';
													inCondition += (settings.dependecies[i].isNumber) ? $(this).find('div.ibx-label-text').text() : "'" + $(this).find('div.ibx-label-text').text() + "'";
												}
											}
										});
										if (dependencyIndexCont > 0) auxJson['DEPENDENCY' + dependencyIndex] = inCondition;
										break;
								}
							}
						}
					}
					if (settings.query_config) auxJson = $.extend(true, {}, auxJson, settings.query_config);
					return auxJson;
				},
				addParamsStatic: settings.addParamsStatic
			});
			$("#" + settings.id + "").on('select2:unselecting', function (e) {
				if (settings.onCloseOption) {
					settings.onCloseOption(e);
				}
			});
		},
		createIbxRadioGroup_selectedToFirst: function (options) {
			ibxRadioGroup_selectedToFirst.init(options.page)
		},
		hideSection_onSubmit: function (options) {
			hideSectionOnSubmit.init(options.page)
		}
	};

	if (typeof $pd.facilities != 'object') {
		$pd.facilities = facilities;
	}

})(window, $pd, jQuery);