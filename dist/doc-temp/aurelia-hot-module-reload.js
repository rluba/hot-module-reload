var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define("_typings", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("hmr-css-resource", ["require", "exports", "aurelia-templating", "aurelia-loader", "aurelia-path", "aurelia-pal"], function (require, exports, aurelia_templating_1, aurelia_loader_1, aurelia_path_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // this is almost the same as aurelia-templating-resources/css-resource
    // with the exception that it keeps track of the HTMLStyleElement that is being added
    exports.cssUrlMatcher = /url\((?!['"]data)([^)]+)\)/gi;
    function fixupCSSUrls(address, css) {
        if (typeof css !== 'string') {
            throw new Error("Failed loading required CSS file: " + address);
        }
        return css.replace(exports.cssUrlMatcher, function (match, p1) {
            var quote = p1.charAt(0);
            if (quote === '\'' || quote === '"') {
                p1 = p1.substr(1, p1.length - 2);
            }
            return 'url(\'' + aurelia_path_1.relativeToFile(p1, address) + '\')';
        });
    }
    exports.fixupCSSUrls = fixupCSSUrls;
    var CSSResource = /** @class */ (function () {
        function CSSResource(address) {
            this.injectedElement = null;
            this.address = address;
            this._scoped = null;
            this._global = false;
            this._alreadyGloballyInjected = false;
        }
        CSSResource.prototype.initialize = function (container, target) {
            this._scoped = new target(this);
        };
        CSSResource.prototype.register = function (registry, name) {
            if (name === 'scoped') {
                registry.registerViewEngineHooks(this._scoped);
            }
            else {
                this._global = true;
            }
        };
        CSSResource.prototype.load = function (container) {
            var _this = this;
            return container.get(aurelia_loader_1.Loader)
                .loadText(this.address)
                .catch(function (err) { return null; })
                .then(function (text) {
                if (!text) {
                    return;
                }
                text = fixupCSSUrls(_this.address, text);
                if (_this._scoped) {
                    _this._scoped.css = text;
                }
                if (_this._global) {
                    _this._alreadyGloballyInjected = true;
                    _this.injectedElement = aurelia_pal_1.DOM.injectStyles(text);
                }
            });
        };
        return CSSResource;
    }());
    exports.CSSResource = CSSResource;
    var CSSViewEngineHooks = /** @class */ (function () {
        function CSSViewEngineHooks(owner) {
            this.injectedElements = [];
            this.owner = owner;
            this.css = null;
        }
        CSSViewEngineHooks.prototype.beforeCompile = function (content, resources, instruction) {
            if (instruction.targetShadowDOM) {
                this.injectedElements.push(aurelia_pal_1.DOM.injectStyles(this.css, content, true));
            }
            else if (aurelia_pal_1.FEATURE.scopedCSS) {
                var styleNode = aurelia_pal_1.DOM.injectStyles(this.css, content, true);
                styleNode.setAttribute('scoped', 'scoped');
            }
            else if (!this.owner._alreadyGloballyInjected) {
                this.owner.injectedElement = aurelia_pal_1.DOM.injectStyles(this.css);
                this.owner._alreadyGloballyInjected = true;
            }
        };
        return CSSViewEngineHooks;
    }());
    exports.CSSViewEngineHooks = CSSViewEngineHooks;
    function _createCSSResource(address) {
        var ViewCSS = /** @class */ (function (_super) {
            __extends(ViewCSS, _super);
            function ViewCSS() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ViewCSS = __decorate([
                aurelia_templating_1.resource(new CSSResource(address))
            ], ViewCSS);
            return ViewCSS;
        }(CSSViewEngineHooks));
        return ViewCSS;
    }
    exports._createCSSResource = _createCSSResource;
});
define("view-model-traverse-controller", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *  traverse interesting places in Controller:
     * - behavior.target (class of ViewModel)
     * - behavior.viewFactory (traverse ViewFactory)
     * - behavior.attributes[array] (?)
     *
     * - viewFactory.instructions[ALL-obj].providers[ALL-arr] (original functions/classes, not instances, things like If)
     * - viewFactory.instructions[ALL-obj].viewFactory
     *
     * - viewFactory.resources (ViewResources)
     *      .bindingBehaviors[name] (instances, can fix up .constructor is class)
     *      .valueConverters[name] (instances, can fix up .constructor is class)
     *
     * - boundProperties[array] ??
     * - container //how can we replace instances in container?
     * - container.children[array<ViewSlot>]?
     * - container
     *      .viewModel? (instance)
     *      .viewResources (ViewResources)
     *
     * - instruction (BehaviorInstruction)
     *      .viewFactory
     *      .viewModel (instance)
     *
     * - scope (View)
     *      .bindingContext (instance)
     *      .children[array<ViewSlot>]
     *      .controller (Controller)
     *      .controllers[array<Controller>]
     *      .overrideContext
     *         .bindingContext? (Instance)
     *         .parentOverrideContext
     *               .bindingContext? (and so on...)
     *      .resources (ViewResources)
     *      .viewFactory (ViewFactory)
     * - view (View)
     * - viewModel (instance or RouterView:)
     *      .overrideContext
     *      .router.viewPorts[ALL-obj]. (RouterView)
     *               .overrideContext
     *               .owningView (View)
     *               .view (View)
     *               .viewSlot (ViewSlot)
     *                     .children[array<View>]
     *                     .bindingContext (instance)
     *                     .overrideContext
     **/
    function traverseController(classOrFunction, controller, info) {
        var matches = [];
        if (!controller || info.previouslyTraversed.has(controller))
            return matches;
        info.previouslyTraversed.add(controller);
        matches.push.apply(matches, traverseBehaviorResource(classOrFunction, controller.behavior, __assign({}, info, { parentController: controller, immediateParent: controller, propertyInParent: 'behavior' })).concat(traverseBehaviorInstruction(classOrFunction, controller.instruction, __assign({}, info, { parentController: controller, immediateParent: controller, propertyInParent: 'instruction' })), traverseView(classOrFunction, controller.scope, __assign({}, info, { parentController: controller, immediateParent: controller, propertyInParent: 'scope' })), traverseView(classOrFunction, controller.view, __assign({}, info, { parentController: controller, immediateParent: controller, propertyInParent: 'view' })), traverseViewModel(classOrFunction, controller.viewModel, __assign({}, info, { parentController: controller, immediateParent: controller, propertyInParent: 'viewModel' }))));
        return matches;
    }
    exports.traverseController = traverseController;
    function traverseBehaviorResource(classOrFunction, behavior, info) {
        var matches = [];
        if (!behavior || info.previouslyTraversed.has(behavior))
            return matches;
        info.previouslyTraversed.add(behavior);
        if (behavior.target === classOrFunction) {
            matches.push(__assign({}, info, { immediateParent: behavior, propertyInParent: 'target' }));
        }
        matches.push.apply(matches, traverseViewFactory(classOrFunction, behavior.viewFactory, __assign({}, info, { immediateParent: behavior, propertyInParent: 'viewFactory' })));
        return matches;
    }
    exports.traverseBehaviorResource = traverseBehaviorResource;
    function traverseViewFactory(classOrFunction, viewFactory, info) {
        var matches = [];
        if (!viewFactory || info.previouslyTraversed.has(viewFactory))
            return matches;
        info.previouslyTraversed.add(viewFactory);
        if (viewFactory.instructions) {
            Object.keys(viewFactory.instructions).forEach(function (instructionKey) {
                var instruction = viewFactory.instructions[instructionKey];
                matches.push.apply(matches, traverseViewFactory(classOrFunction, instruction.viewFactory, __assign({}, info, { immediateParent: instruction, propertyInParent: 'viewFactory' })));
                if (instruction.providers && instruction.providers.length) {
                    instruction.providers.forEach(function (providerKey, index) {
                        if (providerKey === classOrFunction) {
                            matches.push(__assign({}, info, { immediateParent: instruction.providers, propertyInParent: index }));
                        }
                    });
                }
            });
        }
        if (viewFactory.resources) {
            matches.push.apply(matches, traverseViewResources(classOrFunction, viewFactory.resources, __assign({}, info, { immediateParent: viewFactory, propertyInParent: 'resources' })));
        }
        return matches;
    }
    exports.traverseViewFactory = traverseViewFactory;
    function traverseViewResources(classOrFunction, viewResources, info) {
        var matches = [];
        if (!viewResources || info.previouslyTraversed.has(viewResources))
            return matches;
        info.previouslyTraversed.add(viewResources);
        ['bindingBehaviors', 'valueConverters'].forEach(function (type) {
            var viewResourceInstances = viewResources[type];
            if (viewResourceInstances) {
                Object.keys(viewResourceInstances).forEach(function (key) {
                    var instance = viewResourceInstances[key];
                    if (instance && instance.constructor === classOrFunction) {
                        matches.push(__assign({}, info, { immediateParent: viewResourceInstances, propertyInParent: key, instance: true }));
                    }
                });
            }
        });
        matches.push.apply(matches, traverseViewResources(classOrFunction, viewResources.parent, __assign({}, info, { immediateParent: viewResources, propertyInParent: 'parent' })));
        return matches;
    }
    exports.traverseViewResources = traverseViewResources;
    function traverseBehaviorInstruction(classOrFunction, behaviorInstruction, info) {
        var matches = [];
        if (!behaviorInstruction || info.previouslyTraversed.has(behaviorInstruction))
            return matches;
        info.previouslyTraversed.add(behaviorInstruction);
        matches.push.apply(matches, traverseViewFactory(classOrFunction, behaviorInstruction.viewFactory, __assign({}, info, { immediateParent: behaviorInstruction, propertyInParent: 'viewFactory' })).concat(traverseViewModel(classOrFunction, behaviorInstruction.viewModel, __assign({}, info, { immediateParent: behaviorInstruction, propertyInParent: 'viewModel' }))));
        return matches;
    }
    exports.traverseBehaviorInstruction = traverseBehaviorInstruction;
    function traverseViewModel(classOrFunction, viewModel, info) {
        var matches = [];
        if (!viewModel)
            return matches;
        var duplicate = info.previouslyTraversed.has(viewModel);
        info.previouslyTraversed.add(viewModel);
        if (viewModel.constructor === classOrFunction) {
            matches.push(__assign({}, info, { instance: true, duplicate: duplicate }));
            if (duplicate) {
                return matches;
            }
        }
        matches.push.apply(matches, traverseOverrideContext(classOrFunction, viewModel.overrideContext, __assign({}, info, { immediateParent: viewModel, propertyInParent: 'overrideContext' })).concat(traverseRouter(classOrFunction, viewModel.router, __assign({}, info, { immediateParent: viewModel, propertyInParent: 'router' }))));
        return matches;
    }
    exports.traverseViewModel = traverseViewModel;
    function traverseRouter(classOrFunction, router, info) {
        var matches = [];
        if (!router || info.previouslyTraversed.has(router))
            return matches;
        info.previouslyTraversed.add(router);
        if (router.viewPorts) {
            Object.keys(router.viewPorts).forEach(function (key) {
                var viewPort = router.viewPorts[key]; // as RouterView;
                matches.push.apply(// as RouterView;
                matches, traverseRouterView(classOrFunction, viewPort, __assign({}, info, { immediateParent: router.viewPorts, propertyInParent: key })));
            });
        }
        return matches;
    }
    exports.traverseRouter = traverseRouter;
    function traverseRouterView(classOrFunction, routerView, info) {
        var matches = [];
        if (!routerView || info.previouslyTraversed.has(routerView))
            return matches;
        info.previouslyTraversed.add(routerView);
        matches.push.apply(matches, traverseOverrideContext(classOrFunction, routerView.overrideContext, __assign({}, info, { immediateParent: routerView, propertyInParent: 'overrideContext' })).concat(traverseView(classOrFunction, routerView.owningView, __assign({}, info, { immediateParent: routerView, propertyInParent: 'owningView' })), traverseView(classOrFunction, routerView.view, __assign({}, info, { immediateParent: routerView, propertyInParent: 'view' })), traverseViewSlot(classOrFunction, routerView.viewSlot, __assign({}, info, { immediateParent: routerView, propertyInParent: 'viewSlot' }))));
        return matches;
    }
    exports.traverseRouterView = traverseRouterView;
    function traverseView(classOrFunction, view, info) {
        var matches = [];
        if (!view || info.previouslyTraversed.has(view))
            return matches;
        info.previouslyTraversed.add(view);
        matches.push.apply(matches, traverseViewModel(classOrFunction, view.bindingContext, __assign({}, info, { relatedView: view, immediateParent: view, propertyInParent: 'bindingContext' })).concat(traverseController(classOrFunction, view.controller, __assign({}, info, { relatedView: view, immediateParent: view, propertyInParent: 'controller' })), traverseOverrideContext(classOrFunction, view.overrideContext, __assign({}, info, { relatedView: view, immediateParent: view, propertyInParent: 'overrideContext' })), traverseViewResources(classOrFunction, view.resources, __assign({}, info, { relatedView: view, immediateParent: view, propertyInParent: 'resources' })), traverseViewFactory(classOrFunction, view.viewFactory, __assign({}, info, { relatedView: view, immediateParent: view, propertyInParent: 'viewFactory' }))));
        if (view.controllers && view.controllers.length) {
            view.controllers.forEach(function (controller, index) {
                matches.push.apply(matches, traverseController(classOrFunction, controller, __assign({}, info, { relatedView: view, immediateParent: view.controllers, propertyInParent: index })));
            });
        }
        if (view.children && view.children.length) {
            view.children.forEach(function (viewSlot, index) {
                matches.push.apply(matches, traverseViewSlot(classOrFunction, viewSlot, __assign({}, info, { childOfViewSlot: viewSlot, relatedView: view, immediateParent: view.children, propertyInParent: index })));
            });
        }
        return matches;
    }
    exports.traverseView = traverseView;
    function traverseOverrideContext(classOrFunction, overrideContext, info) {
        var matches = [];
        if (!overrideContext || info.previouslyTraversed.has(overrideContext))
            return matches;
        info.previouslyTraversed.add(overrideContext);
        matches.push.apply(matches, traverseViewModel(classOrFunction, overrideContext.bindingContext, __assign({}, info, { immediateParent: overrideContext, propertyInParent: 'bindingContext' })).concat(traverseOverrideContext(classOrFunction, overrideContext.parentOverrideContext, __assign({}, info, { immediateParent: overrideContext, propertyInParent: 'parentOverrideContext' }))));
        return matches;
    }
    exports.traverseOverrideContext = traverseOverrideContext;
    function traverseViewSlot(classOrFunction, viewSlot, info) {
        var matches = [];
        if (!viewSlot || info.previouslyTraversed.has(viewSlot))
            return matches;
        info.previouslyTraversed.add(viewSlot);
        matches.push.apply(matches, traverseViewModel(classOrFunction, viewSlot.bindingContext, __assign({}, info, { immediateParent: viewSlot, propertyInParent: 'bindingContext' })).concat(traverseOverrideContext(classOrFunction, viewSlot.overrideContext, __assign({}, info, { immediateParent: viewSlot, propertyInParent: 'overrideContext' }))));
        if (viewSlot.children && viewSlot.children.length) {
            viewSlot.children.forEach(function (child, index) {
                matches.push.apply(matches, traverseView(classOrFunction, child, __assign({}, info, { childOfViewSlot: viewSlot, relatedView: child, immediateParent: viewSlot.children, propertyInParent: index })));
            });
        }
        return matches;
    }
    exports.traverseViewSlot = traverseViewSlot;
});
define("view-traverse-controller", ["require", "exports", "aurelia-templating", "aurelia-hot-module-reload"], function (require, exports, aurelia_templating_2, aurelia_hot_module_reload_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getViewSlots(view) {
        if (view.children && view.children.length) {
            return view.children.filter(function (viewSlot) {
                return viewSlot instanceof aurelia_templating_2.ViewSlot && viewSlot.children && viewSlot.children.length;
            });
        }
        return [];
    }
    exports.getViewSlots = getViewSlots;
    function anyMatchingChildren(viewSlot, matchingTemplate) {
        return !!viewSlot.children.find(function (view) { return view.viewFactory && view.viewFactory.template === matchingTemplate; });
    }
    exports.anyMatchingChildren = anyMatchingChildren;
    function traverseControllerForTemplates(auController, matchingTemplate) {
        var matchingViewControllers = [];
        var matchingScopeControllers = [];
        var view = (auController.view);
        var scope = (auController.scope);
        var slotsWithMatchingViews = [];
        if (view && view.viewFactory && view.viewFactory.template === matchingTemplate) {
            matchingViewControllers = [auController]; // [view.controller] // whole View and all of its children will be rendered
        }
        else if (scope && scope.controller && scope.viewFactory && scope.viewFactory.template === matchingTemplate) {
            matchingScopeControllers = [scope.controller];
        }
        else {
            var viewViewSlots = view ? getViewSlots(view) : [];
            var scopeViewSlots = scope ? getViewSlots(scope) : [];
            slotsWithMatchingViews = Array.from(new Set(viewViewSlots.concat(scopeViewSlots))).filter(function (slot) { return anyMatchingChildren(slot, matchingTemplate); });
        }
        return {
            matchingViewControllers: matchingViewControllers,
            matchingScopeControllers: matchingScopeControllers,
            slotsWithMatchingViews: slotsWithMatchingViews
        };
    }
    exports.traverseControllerForTemplates = traverseControllerForTemplates;
    function getElementsToRerender(template) {
        // get visible elements to re-render:
        var auElements = aurelia_hot_module_reload_1.getAuElements();
        var controllers = auElements.filter(function (el) {
            /* NOTE: viewless components like blur-image do not have el.au.controller set */
            return el.au && el.au.controller && (el.au.controller.view || el.au.controller.scope);
        }).map(function (el) { return el.au.controller; });
        var viewControllers = new Set();
        var scopeControllers = new Set();
        var slots = new Set();
        controllers
            .forEach(function (controller) {
            var _a = traverseControllerForTemplates(controller, template), matchingViewControllers = _a.matchingViewControllers, matchingScopeControllers = _a.matchingScopeControllers, slotsWithMatchingViews = _a.slotsWithMatchingViews;
            matchingViewControllers.forEach(function (controller) { return viewControllers.add(controller); });
            matchingScopeControllers.forEach(function (controller) { return scopeControllers.add(controller); });
            slotsWithMatchingViews.forEach(function (slot) { return slots.add(slot); });
        });
        var toRender = { viewControllers: viewControllers, scopeControllers: scopeControllers, slots: slots };
        return toRender;
    }
    exports.getElementsToRerender = getElementsToRerender;
});
define("render-utils", ["require", "exports", "aurelia-templating"], function (require, exports, aurelia_templating_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function recreateView(viewFactory, oldViewContainer) {
        var parentContainer = oldViewContainer.parent || oldViewContainer;
        var targetInstruction = oldViewContainer.get(aurelia_templating_3.TargetInstruction);
        // const targetInstruction = container.get(TargetInstruction) as TargetInstruction;
        var factoryCreateInstruction = targetInstruction.elementInstruction || { partReplacements: null };
        // let factoryCreateInstruction = ({partReplacements: null} as BehaviorInstruction);
        // console.log(`new element instruction`, targetInstruction, factoryCreateInstruction);
        var newContainer = parentContainer.createChild();
        newContainer._resolvers = oldViewContainer._resolvers;
        // const newContainer = oldViewContainer;
        var newView = viewFactory.create(newContainer, factoryCreateInstruction);
        newView._isUserControlled = true;
        return newView;
    }
    exports.recreateView = recreateView;
    function cleanupView(view) {
        var firstChild = view.firstChild;
        var lastChild = view.lastChild;
        var nextSibling = lastChild.nextSibling;
        var parent = firstChild.parentElement;
        var bindingContext = view.bindingContext, overrideContext = view.overrideContext, container = view.container;
        view.removeNodes();
        var wasAttached = view.isAttached;
        if (wasAttached) {
            view.detached();
        }
        var wasBound = view.isBound;
        if (wasBound) {
            view.unbind();
        }
        view._invalidView = true;
        return { nextSibling: nextSibling, parent: parent, wasBound: wasBound, wasAttached: wasAttached, bindingContext: bindingContext, overrideContext: overrideContext, container: container };
    }
    exports.cleanupView = cleanupView;
    function rerenderController(e, type, newViewFactory) {
        var oldView = e[type];
        if (!oldView) {
            // view was removed from the controller in a previous run, ignore
            return;
        }
        if (oldView._invalidView) {
            // previously re-rendered, ensure controller is set and skip
            if (oldView._replacementView) {
                e[type] = oldView._replacementView;
            }
            return;
        }
        var _a = cleanupView(oldView), nextSibling = _a.nextSibling, parent = _a.parent, wasBound = _a.wasBound, wasAttached = _a.wasAttached, bindingContext = _a.bindingContext, overrideContext = _a.overrideContext, oldViewContainer = _a.container;
        // create & add view:
        var newView = oldView._replacementView = e[type] = recreateView(newViewFactory || oldView.viewFactory, oldViewContainer);
        if (!newView.isBound && wasBound) {
            newView.bind(bindingContext, overrideContext);
        }
        if (nextSibling) {
            newView.insertNodesBefore(nextSibling);
        }
        else {
            newView.appendNodesTo(parent);
        }
        if (!newView.isAttached && wasAttached) {
            newView.attached();
        }
    }
    exports.rerenderController = rerenderController;
    function rerenderMatchingSlotChildren(slot, newViewFactory, originalFactoryTemplate, onlyViews) {
        var previousChildren = slot.children.slice();
        var viewsToReplace = previousChildren.filter(function (view) { return (onlyViews && onlyViews.indexOf(view) >= 0) || (view.viewFactory && view.viewFactory.template === originalFactoryTemplate); });
        var bindingContexts = new Map();
        var overrideContexts = new Map();
        var controllers = new Map();
        viewsToReplace.forEach(function (oldView) {
            // store contexts because they'll be removed when unbound:
            bindingContexts.set(oldView, oldView.bindingContext);
            overrideContexts.set(oldView, oldView.overrideContext);
            controllers.set(oldView, oldView.controller);
            if (oldView.isBound) {
                oldView.unbind();
            }
            oldView._invalidView = true;
        });
        slot.removeMany(viewsToReplace, false, true);
        // recreate removed Views in the same place:
        previousChildren.forEach(function (oldView, index) {
            if (!oldView._invalidView) {
                // don't do anything to non-matching Views
                return;
            }
            var bindingContext = bindingContexts.get(oldView);
            var overrideContext = overrideContexts.get(oldView);
            var controller = controllers.get(oldView);
            var view = recreateView(newViewFactory || oldView.viewFactory, oldView.container);
            // setup _replacementView in case the same view is looped over again
            oldView._replacementView = view;
            if (controller) {
                controller.view = view;
            }
            if (!view.isBound) {
                view.bind(bindingContext, overrideContext);
            }
            // indicies should match up and grow as we iterate up
            slot.insert(index, view);
        });
    }
    exports.rerenderMatchingSlotChildren = rerenderMatchingSlotChildren;
});
define("aurelia-hot-module-reload", ["require", "exports", "aurelia-pal", "aurelia-metadata", "aurelia-templating", "aurelia-dependency-injection", "hmr-css-resource", "view-model-traverse-controller", "view-traverse-controller", "render-utils"], function (require, exports, aurelia_pal_2, aurelia_metadata_1, aurelia_templating_4, aurelia_dependency_injection_1, hmr_css_resource_1, view_model_traverse_controller_1, view_traverse_controller_1, render_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UndefinedResourceModule = { id: null, mainResource: { metadata: {}, value: undefined } };
    function getAuElements() {
        return Array.from(aurelia_pal_2.DOM.querySelectorAll('.au-target'));
    }
    exports.getAuElements = getAuElements;
    function getControllersWithClassInstances(oldPrototype) {
        var _a, _b;
        // get visible elements to re-render:
        var auElements = getAuElements();
        /* NOTE: viewless components like blur-image do not have el.au.controller set */
        var controllersLists = auElements.map(function (el) { return el.au && Object.values(el.au) || []; });
        // list of unique controllers
        var controllers = Array.from(new Set((_a = []).concat.apply(_a, controllersLists)));
        var previouslyTraversed = new Set();
        var traversalInfo = (_b = []).concat.apply(_b, controllers.map(function (parentController) {
            return view_model_traverse_controller_1.traverseController(oldPrototype, parentController, {
                previouslyTraversed: previouslyTraversed,
                parentController: parentController
            });
        }));
        return traversalInfo;
    }
    exports.getControllersWithClassInstances = getControllersWithClassInstances;
    var HmrContext = /** @class */ (function () {
        function HmrContext(loader) {
            var _this = this;
            this.loader = loader;
            this.viewEngine = aurelia_dependency_injection_1.Container.instance.get(aurelia_templating_4.ViewEngine);
            this.moduleAnalyzerCache = this.viewEngine.moduleAnalyzer.cache;
            var styleResourcePlugin = {
                fetch: function (moduleId) {
                    var _a;
                    return _a = {},
                        _a[moduleId] = hmr_css_resource_1._createCSSResource(moduleId),
                        _a;
                },
                hot: function (moduleId) {
                    _this.reloadCss(moduleId);
                }
            };
            ['.css', '.less', '.sass', '.scss', '.styl'].forEach(function (ext) { return _this.viewEngine.addResourcePlugin(ext, styleResourcePlugin); });
        }
        /**
         * Handles ViewModel changes
         */
        HmrContext.prototype.handleModuleChange = function (moduleId, hot) {
            return __awaiter(this, void 0, void 0, function () {
                var previousModule, newModule, oldResourceModule, newResourceModule, origin, normalizedId, moduleMember, keys;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            previousModule = this.loader.moduleRegistry[moduleId];
                            if (!previousModule) {
                                return [2 /*return*/];
                            }
                            console.log("Running default HMR for " + moduleId);
                            // reload fresh module:
                            delete this.loader.moduleRegistry[moduleId];
                            return [4 /*yield*/, this.loader.loadModule(moduleId)];
                        case 1:
                            newModule = _a.sent();
                            oldResourceModule = this.moduleAnalyzerCache[moduleId];
                            if (oldResourceModule) {
                                origin = aurelia_metadata_1.Origin.get(newModule);
                                normalizedId = origin.moduleId;
                                moduleMember = origin.moduleMember;
                                newResourceModule = this.viewEngine.moduleAnalyzer.analyze(normalizedId, newModule, moduleMember);
                                if (!newResourceModule.mainResource && !newResourceModule.resources) {
                                    hot.decline(moduleId);
                                    return [2 /*return*/];
                                }
                                if (newResourceModule.mainResource) {
                                    newResourceModule.initialize(this.viewEngine.container);
                                }
                                // monkey patch old resource module:
                                // would be better to simply replace it everywhere
                                Object.assign(oldResourceModule, newResourceModule);
                            }
                            // TODO: kinda CompositionEngine.ensureViewModel()
                            // TODO: to replace - use closest container: childContainer.get(viewModelResource.value);
                            if (previousModule instanceof Object) {
                                keys = Object.keys(previousModule);
                                keys.forEach(function (key) {
                                    var newExportValue = newModule[key];
                                    if (!newExportValue) {
                                        return;
                                    }
                                    var previousExportValue = previousModule[key];
                                    var type = typeof previousExportValue;
                                    if (type === 'function' || type === 'object') {
                                        // these are the only exports we can reliably replace (classes, objects and functions)
                                        console.log("Analyzing " + moduleId + "->" + key);
                                        var traversalInfo = getControllersWithClassInstances(previousExportValue);
                                        // console.log(traversalInfo);
                                        traversalInfo.forEach(function (info) {
                                            if (info.propertyInParent === undefined) {
                                                return;
                                            }
                                            if (info.instance) {
                                                var entry = info.immediateParent[info.propertyInParent];
                                                var newPrototype = newExportValue.prototype;
                                                if (newPrototype) {
                                                    Object.setPrototypeOf(entry, newPrototype);
                                                }
                                                else {
                                                    console.warn("No new prototype for " + moduleId + "->" + key);
                                                }
                                                if (info.relatedView && info.relatedView.isBound) {
                                                    var _a = info.relatedView, bindingContext = _a.bindingContext, overrideContext = _a.overrideContext;
                                                    info.relatedView.unbind();
                                                    info.relatedView.bind(bindingContext, overrideContext);
                                                }
                                                // if (info.parentController && info.parentController.isBound) {
                                                //   const scope = info.parentController.scope;
                                                //   info.parentController.unbind();
                                                //   info.parentController.bind(scope);
                                                // }
                                            }
                                            else {
                                                console.log("Replacing", info.immediateParent[info.propertyInParent], "with", newExportValue);
                                                info.immediateParent[info.propertyInParent] = newExportValue;
                                            }
                                        });
                                    }
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Handles Hot Reloading when a View changes
         *
         * TODO: make a queue of changes and handle after few ms multiple TOGETHER
         */
        HmrContext.prototype.handleViewChange = function (moduleId) {
            return __awaiter(this, void 0, void 0, function () {
                var templateModuleId, entry, originalFactory, _a, mainResource, associatedModuleId, htmlBehaviorResource, targetClass, compileInstruction, newViewFactory, elementsToReRender, factoryToRenderWith;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            templateModuleId = this.loader.applyPluginToUrl(moduleId, 'template-registry-entry');
                            console.log("Handling HMR for " + moduleId);
                            entry = this.loader.getOrCreateTemplateRegistryEntry(moduleId);
                            // delete it, and the module from caches:
                            delete this.loader.templateRegistry[moduleId];
                            delete this.loader.moduleRegistry[moduleId];
                            delete this.loader.moduleRegistry[templateModuleId];
                            originalFactory = entry.factory;
                            // just to be safe, lets patch up the old ViewFactory
                            if (!originalFactory) {
                                console.error("Something's gone wrong, no original ViewFactory?!");
                                return [2 /*return*/];
                            }
                            _a = this.getResourceModuleByTemplate(originalFactory.template), mainResource = _a.mainResource, associatedModuleId = _a.id;
                            htmlBehaviorResource = mainResource.metadata, targetClass = mainResource.value;
                            if (entry.factory !== htmlBehaviorResource.viewFactory) {
                                console.info("Different origin factories", entry.factory, htmlBehaviorResource.viewFactory);
                            }
                            compileInstruction = new aurelia_templating_4.ViewCompileInstruction(htmlBehaviorResource.targetShadowDOM, true);
                            compileInstruction.associatedModuleId = associatedModuleId;
                            return [4 /*yield*/, this.viewEngine.loadViewFactory(moduleId, compileInstruction, null, targetClass)];
                        case 1:
                            newViewFactory = (_b.sent());
                            // TODO: keep track of hidden Views, e.g. 
                            // using beforeBind or mutation-observers https://dev.opera.com/articles/mutation-observers-tutorial/
                            // NOTES:
                            // the document-fragment in the newViewFactory has different numbers for the same resources:
                            // newViewFactory.instructions -- have different numbers than originalFactory
                            // newViewFactory.resources.elements -- contains the resources of children but not the SELF HtmlBehaviorResource
                            // monkey-patch the template just in case references to it are lying still around somewhere:
                            originalFactory.template = newViewFactory.template;
                            originalFactory.instructions = newViewFactory.instructions;
                            originalFactory.resources = newViewFactory.resources;
                            elementsToReRender = view_traverse_controller_1.getElementsToRerender(originalFactory.template);
                            factoryToRenderWith = newViewFactory;
                            // const factoryToRenderWith = originalFactory;
                            elementsToReRender.slots.forEach(function (slot) { return render_utils_1.rerenderMatchingSlotChildren(slot, factoryToRenderWith, originalFactory.template); });
                            elementsToReRender.viewControllers.forEach(function (e) { return render_utils_1.rerenderController(e, 'view', factoryToRenderWith); });
                            elementsToReRender.scopeControllers.forEach(function (e) { return render_utils_1.rerenderController(e, 'scope', factoryToRenderWith); });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * handles hot-reloading CSS modules
         */
        HmrContext.prototype.reloadCss = function (moduleId) {
            if (!(moduleId in this.loader.moduleRegistry)) {
                return; // first load
            }
            var extensionIndex = moduleId.lastIndexOf('.');
            var moduleExtension = moduleId.substring(extensionIndex + 1);
            var pluginName = moduleExtension + "-resource-plugin";
            var cssPluginModuleId = this.loader.applyPluginToUrl(moduleId, pluginName);
            console.log("Handling HMR for " + moduleId);
            delete this.loader.moduleRegistry[moduleId];
            delete this.loader.moduleRegistry[cssPluginModuleId];
            var analyzedModule = this.moduleAnalyzerCache[cssPluginModuleId];
            if (typeof analyzedModule === 'undefined') {
                console.error("Unable to find module, check the plugin exists and the module has been loaded with the expected plugin");
                return;
            }
            else if (!analyzedModule.resources || !analyzedModule.resources.length) {
                console.error("Something's wrong, no resources for this CSS file " + moduleId);
                return;
            }
            var mainResource = analyzedModule.resources[0];
            var cssResource = mainResource.metadata;
            if (cssResource._scoped && cssResource._scoped.injectedElements.length) {
                console.error("Hot Reloading scopedCSS is not yet supported!");
                return;
                // cssResource._scoped.injectedElements.forEach(el => el.remove());
            }
            if (cssResource.injectedElement) {
                cssResource.injectedElement.remove();
            }
            // reload resource
            cssResource.load(aurelia_dependency_injection_1.Container.instance);
        };
        HmrContext.prototype.getResourceModuleByTemplate = function (template) {
            // find the related ResourceModule (if any)
            var relatedResourceModule = Object.values(this.moduleAnalyzerCache).find(function (resourceModule) {
                return resourceModule.mainResource &&
                    resourceModule.mainResource.metadata &&
                    resourceModule.mainResource.metadata.viewFactory &&
                    resourceModule.mainResource.metadata.viewFactory.template === template;
            });
            return relatedResourceModule || UndefinedResourceModule;
        };
        HmrContext.prototype.getResourceModuleById = function (moduleId) {
            return moduleId in this.moduleAnalyzerCache ? this.moduleAnalyzerCache[moduleId] : UndefinedResourceModule;
        };
        return HmrContext;
    }());
    exports.HmrContext = HmrContext;
});
