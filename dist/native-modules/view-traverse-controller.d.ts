import { AUController, ViewCorrect, ViewSlotCorrect } from './_typings';
export declare function getViewSlots(view: ViewCorrect): any;
export declare function anyMatchingChildren(viewSlot: ViewSlotCorrect, matchingTemplate: any): boolean;
export declare function traverseControllerForTemplates(auController: AUController, matchingTemplate: any): {
    matchingViewControllers: any[];
    matchingScopeControllers: any[];
    slotsWithMatchingViews: any[];
};
export declare function getElementsToRerender(template: any): {
    viewControllers: Set<any>;
    scopeControllers: Set<any>;
    slots: Set<any>;
};
