myApp.factory('dataService', ['$http', function($http) {
	return {
		getWords: function(){
			return $http.get('assets/json/words.json')
				.success(function(data){
					return data;
				})
				.error(function(err) {
					return err;
				});
		}
	}
}])