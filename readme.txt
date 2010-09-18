PREREQ:
    jquery.js
    jquery.event.destroyed.js (optional, see note below)
    rx.js

NOTE:
    For automatic subscriptions clean-up, this plug-in requires the 
    jquery 'destroyed' special event (see jquery.event.destroyed.js).

FUNCTIONS:
    .observe(observable)
        Subscribe DOM elements to changes in the observable. The subscribed 
        DOM property to update is based on the element type: 'val' for input 
        elements and 'text' for all others.

    .observe()
        Unsubscribe DOM elements fom changes in the observable. The 
        unsubscribed DOM property is based on the element type: 'val' for 
        input elements and 'text' for all others.

    .observe('html', observable)
    .observe('text', observable)
    .observe('val', observable)
    .observe('height', observable)
    .observe('width', observable)
    .observe('offset', observable)
    .observe('css', observable)
    .observe('@attribute-name', observable)
        Subscribe DOM elements to changes in the observable. The specified 
        DOM property is subscribed to updates.

    .observe('html')
    .observe('text')
    .observe('val')
    .observe('height')
    .observe('width')
    .observe('offset')
    .observe('css')
    .observe('@attribute-name')
        Unsubscribe DOM elements fom changes in the observable. The specified 
        DOM property is unsubscribed.

    .observe('destroy')
        Unsubscribe all subscriptions in DOM elements.


