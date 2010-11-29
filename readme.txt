rx.jQuery.observe (v0.1)
========================

This jQuery plugin is used for subscribing the property of a DOM element to an Observable from
the [Reactive Framework library](http://msdn.microsoft.com/en-us/devlabs/ee794896.aspx).
The plugin ensures that at most one subscription per property for the DOM element is active.  
If the DOM element property is updated to observe another Observable, the previous subscription 
is automatically disposed.  Similarly, if the DOM element is destroyed, all its subscriptions
are disposed as well.

Prerequisites
-------------
This plugin has the following dependencies

* jQuery library: [jquery.js](http://jquery.com)
* Reactive Framework for Javascript: [rx.js](http://msdn.microsoft.com/en-us/devlabs/ee794896.aspx)
* (optional) Javascript MVC DOM destroyed event: jquery.event.destroyed.js (included in redist folder)

Functions
---------

$(select).observe(observable)
    Subscribe DOM elements to changes in the observable. The subscribed 
    DOM property to update is based on the element type: 'val' for input 
    elements and 'text' for all others.

$(select).observe()
    Unsubscribe DOM elements fom changes in the observable. The 
    unsubscribed DOM property is based on the element type: 'val' for 
    input elements and 'text' for all others.

$(select).observe('html', observable)
$(select).observe('text', observable)
$(select).observe('val', observable)
$(select).observe('height', observable)
$(select).observe('width', observable)
$(select).observe('offset', observable)
$(select).observe('css', observable)
$(select).observe('@attribute-name', observable)
    Subscribe DOM elements to changes in the observable. The specified 
    DOM property is subscribed to updates.

$(select).observe('html')
$(select).observe('text')
$(select).observe('val')
$(select).observe('height')
$(select).observe('width')
$(select).observe('offset')
$(select).observe('css')
$(select).observe('@attribute-name')
    Unsubscribe DOM elements fom changes in the observable. The specified 
    DOM property is unsubscribed.

$(select).observe('destroy')
    Unsubscribe all subscriptions in DOM elements.


