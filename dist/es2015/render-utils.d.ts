import { AUController, ViewFactoryWithTemplate, ViewCorrect, ViewSlotCorrect } from './_typings';
import { Container } from 'aurelia-dependency-injection';
export declare function recreateView(viewFactory: ViewFactoryWithTemplate, oldViewContainer: Container): any;
export declare function cleanupView(view: ViewCorrect): {
    nextSibling: any;
    parent: any;
    wasBound: any;
    wasAttached: any;
    bindingContext: any;
    overrideContext: any;
    container: any;
};
export declare function rerenderController(e: AUController, type: 'scope' | 'view', newViewFactory: ViewFactoryWithTemplate): void;
export declare function rerenderMatchingSlotChildren(slot: ViewSlotCorrect, newViewFactory?: ViewFactoryWithTemplate, originalFactoryTemplate?: any, onlyViews?: Array<ViewCorrect>): void;
