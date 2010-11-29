java \
 	-jar google-compiler-20100917.jar \
 	--js ../src/jquery.event.destroyed.js \
 	--js ../src/rx.jQuery.observe.js \
 	--js_output_file ../dist/rx.jQuery.observe.js
cp ../redist/* ../dist