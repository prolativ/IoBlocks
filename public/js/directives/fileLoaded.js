define(['./module'], function(module){

	module.directive('iobFileLoaded', function ($parse) {
		return {
			restrict: 'A',
			scope: false,
			link: function(scope, element, attrs) {
	            var fn = $parse(attrs.iobFileLoaded);
	            
				element.on('change', function(onChangeEvent) {
					var reader = new FileReader();
	                
					reader.onload = function(onLoadEvent) {
            console.log(onLoadEvent);
						scope.$apply(function() {
							console.log(onLoadEvent.target.result);
              fn(scope, {$fileContent: onLoadEvent.target.result});
						});
					};

          console.log(onChangeEvent.srcElement);
          console.log(onChangeEvent.target);

					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				});
			}
		};
	});
});