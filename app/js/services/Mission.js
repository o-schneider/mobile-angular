
smurAngular.factory("Mission", function Mission($q, $rootScope, IDBService){
	var storeWrapper = {
		store: undefined,
		getStore: function() {
			var deferred = $q.defer();
			if(this.store)
				deferred.resolve(this.store)
			else
			{
				this.store = new IDBStore({
					dbVersion: 1,
					storeName: 'mission',
					keyPath: 'id',
					autoIncrement: true,
					onStoreReady: function() {
						var storeReady = this;
						$rootScope.$apply(function(){
							deferred.resolve(storeReady);
						});
					}
				});
			}
			return deferred.promise;
		}
	};
	return IDBService.getIDBCrudObject(storeWrapper);
});