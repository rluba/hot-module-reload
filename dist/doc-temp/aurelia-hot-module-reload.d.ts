import {Loader} from 'aurelia-loader';
import {Container} from 'aurelia-dependency-injection';
import {BehaviorInstruction,Controller,HtmlBehaviorResource,ResourceModule,View,ViewCompileInstruction,ViewFactory,ViewResources,ViewSlot} from 'aurelia-templating';


    export type AUController = Controller & {
        scope: ViewCorrect;
        view: ViewCorrect;
        container: Container;
        instruction?: BehaviorInstruction;
        isBound: boolean;
        isAttached: boolean;
    };
    export interface AU {
        au: {
            controller: AUController;
        };
    }
    export type ResourceList = {
        [name: string]: any;
    };
    export type ViewResources = {
        bindingBehaviors: ResourceList;
        valueConverters: ResourceList;
        parent?: ViewResources;
    };
    export type ViewFactoryWithTemplate = ViewFactory & {
        template: any;
        resources: any;
        instructions: any;
    };
    export type ViewSlotCorrect = ViewSlot & {
        children: Array<ViewCorrect>;
        bindingContext: any;
        overrideContext: any;
    };
    export type ViewCorrect = View & {
        viewFactory: ViewFactoryWithTemplate;
        children: Array<ViewSlotCorrect>;
        controller: AUController;
        controllers?: Array<AUController>;
        resources?: ViewResources;
        isBound: boolean;
        isAttached: boolean;
        firstChild: Node;
        lastChild: Node;
        _isUserControlled: boolean;
        /**
         * added by HMR, reference to the View that replaced this instance
         */
        _replacementView?: ViewCorrect;
        /**
         * added by HMR as true when View isn't up-to-date with the latest template
         */
        _invalidView?: boolean;
    };
    export interface ResourceModuleCorrect extends ResourceModule {
        id: string | null;
        mainResource: {
            metadata: any;
            value: any;
        };
        resources: any;
    }
    export type HtmlBehaviorResourceCorrect = HtmlBehaviorResource & {
        target: any;
        viewFactory: ViewFactoryWithTemplate;
        attributes?: Array<any>;
    };


    export let cssUrlMatcher: RegExp;
    export function fixupCSSUrls(address: string, css: string): string;
    export class CSSResource {
        address: string;
        _scoped: CSSViewEngineHooks | null;
        _global: boolean;
        _alreadyGloballyInjected: boolean;
        injectedElement: HTMLStyleElement | null;
        constructor(address: string);
        initialize(container: Container, target: typeof CSSViewEngineHooks): void;
        register(registry: ViewResources, name?: string): void;
        load(container: Container): Promise<void>;
    }
    export class CSSViewEngineHooks {
        owner: CSSResource;
        css: string | null;
        injectedElements: HTMLStyleElement[];
        constructor(owner: CSSResource);
        beforeCompile(content: DocumentFragment, resources: ViewResources, instruction: ViewCompileInstruction): void;
    }
    export function _createCSSResource(address: string): Function;


    export interface TraversalInfo {
        parentController: AUController;
        previouslyTraversed: Set<any>;
        immediateParent?: any;
        propertyInParent?: string | number;
        childOfViewSlot?: ViewSlotCorrect;
        relatedView?: ViewCorrect;
        instance?: boolean;
        duplicate?: boolean;
    }
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
    export function traverseController(classOrFunction: any, controller: AUController, info: TraversalInfo): TraversalInfo[];
    export function traverseBehaviorResource(classOrFunction: any, behavior: HtmlBehaviorResourceCorrect, info: TraversalInfo): TraversalInfo[];
    export function traverseViewFactory(classOrFunction: any, viewFactory: ViewFactoryWithTemplate, info: TraversalInfo): TraversalInfo[];
    export function traverseViewResources(classOrFunction: any, viewResources: ViewResources | undefined, info: TraversalInfo): TraversalInfo[];
    export function traverseBehaviorInstruction(classOrFunction: any, behaviorInstruction: BehaviorInstruction | undefined, info: TraversalInfo): TraversalInfo[];
    export function traverseViewModel(classOrFunction: any, viewModel: any, info: TraversalInfo): TraversalInfo[];
    export function traverseRouter(classOrFunction: any, router: any, info: TraversalInfo): TraversalInfo[];
    export function traverseRouterView(classOrFunction: any, routerView: any, info: TraversalInfo): TraversalInfo[];
    export function traverseView(classOrFunction: any, view: ViewCorrect, info: TraversalInfo): TraversalInfo[];
    export function traverseOverrideContext(classOrFunction: any, overrideContext: any, info: TraversalInfo): TraversalInfo[];
    export function traverseViewSlot(classOrFunction: any, viewSlot: ViewSlotCorrect, info: TraversalInfo): TraversalInfo[];

    export function getViewSlots(view: ViewCorrect): any;
    export function anyMatchingChildren(viewSlot: ViewSlotCorrect, matchingTemplate: any): boolean;
    export function traverseControllerForTemplates(auController: AUController, matchingTemplate: any): {
        matchingViewControllers: any[];
        matchingScopeControllers: any[];
        slotsWithMatchingViews: any[];
    };
    export function getElementsToRerender(template: any): {
        viewControllers: Set<any>;
        scopeControllers: Set<any>;
        slots: Set<any>;
    };


    export function recreateView(viewFactory: ViewFactoryWithTemplate, oldViewContainer: Container): any;
    export function cleanupView(view: ViewCorrect): {
        nextSibling: any;
        parent: any;
        wasBound: any;
        wasAttached: any;
        bindingContext: any;
        overrideContext: any;
        container: any;
    };
    export function rerenderController(e: AUController, type: 'scope' | 'view', newViewFactory: ViewFactoryWithTemplate): void;
    export function rerenderMatchingSlotChildren(slot: ViewSlotCorrect, newViewFactory?: ViewFactoryWithTemplate, originalFactoryTemplate?: any, onlyViews?: Array<ViewCorrect>): void;



    export function getAuElements(): (Element & AU)[];
    export function getControllersWithClassInstances(oldPrototype: any): TraversalInfo[];
    export class HmrContext {
        loader: Loader & {
            moduleRegistry: Object;
            templateRegistry: Object;
        };
        viewEngine: any;
        moduleAnalyzerCache: {
            [moduleId: string]: ResourceModuleCorrect;
        };
        constructor(loader: Loader & {
            moduleRegistry: Object;
            templateRegistry: Object;
        });
        /**
         * Handles ViewModel changes
         */
        handleModuleChange(moduleId: string, hot: any): Promise<void>;
        /**
         * Handles Hot Reloading when a View changes
         *
         * TODO: make a queue of changes and handle after few ms multiple TOGETHER
         */
        handleViewChange(moduleId: string): Promise<void>;
        /**
         * handles hot-reloading CSS modules
         */
        reloadCss(moduleId: string): void;
        getResourceModuleByTemplate(template: any): ResourceModuleCorrect;
        getResourceModuleById(moduleId: string): ResourceModuleCorrect;
    }
