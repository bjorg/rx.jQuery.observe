/*
 * rx.value.js
 * Copyright (C) 2010-2011 Steve G. Bjorg
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
	var root = this;
	
	/*
	 * 
	 */
	var Value = Rx.Value = function(initial) {
		var _value = initial;
		var observable = function() {
			
			// check if we're setting or getting the state
			if(arguments.length > 0) {
				
				// check if the state has changed
				if(_value !== arguments[0]) {
					_value = arguments[0];
					observable.OnNext(_value);
				}
				return this;
			}
			return _value;				
		};
		
		// inherit from Rx.Subject
		return $.extend(observable, new Rx.Subject());
	};
})();