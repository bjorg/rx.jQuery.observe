/*
 * PREREQ:
 *     jquery.js
 *     jquery.event.destroyed.js (optional, see note below)
 *     rx.js
 *
 * NOTE:
 *     For automatic subscriptions clean-up, this plug-in requires the 
 *     jquery 'destroyed' special event (see jquery.event.destroyed.js).
 *
 * FUNCTIONS:
 *     .observe(observable)
 *         Subscribe DOM elements to changes in the observable. The subscribed 
 *         DOM property to update is based on the element type: 'val' for input 
 *         elements and 'text' for all others.
 *
 *     .observe()
 *         Unsubscribe DOM elements fom changes in the observable. The 
 *         unsubscribed DOM property is based on the element type: 'val' for 
 *         input elements and 'text' for all others.
 *
 *     .observe('html', observable)
 *     .observe('text', observable)
 *     .observe('val', observable)
 *     .observe('height', observable)
 *     .observe('width', observable)
 *     .observe('offset', observable)
 *     .observe('css', observable)
 *     .observe('@attribute-name', observable)
 *         Subscribe DOM elements to changes in the observable. The specified 
 *         DOM property is subscribed to updates.
 *
 *     .observe('html')
 *     .observe('text')
 *     .observe('val')
 *     .observe('height')
 *     .observe('width')
 *     .observe('offset')
 *     .observe('css')
 *     .observe('@attribute-name')
 *         Unsubscribe DOM elements fom changes in the observable. The specified 
 *         DOM property is unsubscribed.
 *
 *     .observe('destroy')
 *         Unsubscribe all subscriptions in DOM elements.
 *
 */

(function($) {	

	// helper function that returns a function to update the desired property
	var computeSetValue = function(property) {
	
		// ensure property is a string
		if(typeof property !== 'string') {
			return $.noop;
		}

		// check if property is a known jquery dom function		
		switch(property) {
		case 'html':
		case 'text':
		case 'val':
		case 'height':
		case 'width':
		case 'offset':
		case 'css':
			return function(value) {
				this[property](value);
			};
		}
	
		// check if property is an attribute starting with '@'
		if(property.substr(0, 1) === '@') {
			var name = property.substr(1);
			return function(value) {
				this.attr(name, value);
			};
		}
		
		// assume property is a css attribute name
		return function(value) {
			this.css(property, value);
		};
	};

	$.fn.observe = function(property, observable) {
	
		// check if the shorthand notation was used
		if(typeof property !== 'string' && property !== null) {
			observable = property;
			property = null;
		} else if(property === 'destroy') {
		
			// remove all subscriptions
			return this.each(function() {
				var $this = $(this);
				var subscriptions = $this.data('observe');
				
				// check if there are any subscriptions to remove
				if(subscriptions) {
				
					// first unbind the 'destroyed' event since it is triggered by clearing the data
					$this.unbind('destroyed');
					
					// cancle all subscriptions
					$.each(subscriptions, function(key, value) {
						value.Dispose();
					});
					
					// clean-up the associated subscription data
					$this.removeData('observe');
				}
			});
		}
		
		// update subscription for each dom element
		return this.each(function() {
			var $this = $(this);
			var propName = property || ($this.is(':input') ? 'val' : 'text');
			var propSetValue = computeSetValue(propName);
			var subscriptions = $this.data('observe');
			
			// check if we need to remove an existing subscription
			if(subscriptions && subscriptions[propName]) {			
				subscriptions[propName].Dispose();
				delete subscriptions[propName];
			}
			
			// check if we need to add a new subscription
			if(observable) {
			
				// check if this is the first subscription
				if(!subscriptions) {
					subscriptions = { };
					
					// associate subscription data with element
					$this.data('observe', subscriptions);
					
					// register callback when element is destroyed to automatically cancel all subscriptions
					$this.bind('destroyed', function() {
						$(this).observe('destroy');
					});
				}
				
				// subscribe to observable and clean-up subscription when it's done or fails
				subscriptions[propName] = observable.Subscribe({
					OnNext: function(value) {
						propSetValue.call($this, value);
					},
					OnError: function(value) {
						delete subscriptions[propName];
					},
					OnDone: function(value) {
						delete subscriptions[propName];
					}
				});
			}
		});
	};
})(jQuery);