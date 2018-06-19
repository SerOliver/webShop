var app = angular.module("myModule", ['ui.bootstrap']);
				app.controller("myCtrl", function($scope, $window, $http, $uibModal){
				var myController = this;

				var vm = this;
				vm.message = '';
				myController.searchText = "";

				myController.svi_proizvodi = [];
				myController.proizvodi = [];

				$scope.carts=[];
				$window.message = "";


				//==== LOAD INIT PRODUCTS =====//
				//============================//

				myController.init = function(){
				  var req = {
					  method: "GET",
					  url: "/k2_proizvodi.json"
				  }
				  $http(req).then(
					  function(resp){
						console.log(resp);
						var lista = [];
						myController.svi_proizvodi = resp.data;
						myController.kategorijeProizvoda = {};
						myController.listaKategorija = [];
						for(var i in myController.svi_proizvodi){
						  var proizvod = myController.svi_proizvodi[i];
						  if(!(proizvod.kategorija in myController.kategorijeProizvoda)){
										myController.listaKategorija.push(proizvod.kategorija);
										myController.kategorijeProizvoda[proizvod.kategorija] = [proizvod];
						  }else{
										myController.kategorijeProizvoda[proizvod.kategorija].push(proizvod);
						  }
						  if(proizvod.p_name.toLowerCase().indexOf(myController.searchText.toLowerCase())!=-1){
									lista.push(proizvod);
						  }
						}
						myController.totalItems = lista.length;
						myController.proizvodi = lista;
					  }, function(resp){
						  vm.message = 'error';
					  });
				};


				//===== PRICE SORT ======//
				//======================//

				myController.p_price =-1;
				myController.filterCena = function (el) {
					myController.p_grade = -1;
					myController.p_price = el;
					myController.proizvod = null;
					if (myController.kategorija != null) {
						myController.proizvodi = myController.kategorijeProizvoda[myController.kategorija];
					} else {
						myController.proizvodi = myController.svi_proizvodi;
					}
					if (myController.p_price != -1) {
						var lista = myController.proizvodi;
						var rez = [];
						for (var i in lista) {
							if (myController.p_price == 1 && lista[i].p_price > 0 && lista[i].p_price <= 40) {
								rez.push(lista[i]);
							}
							if (myController.p_price == 2 && lista[i].p_price > 40) {
								rez.push(lista[i]);
							}
						}
						myController.proizvodi = rez;
					}
				}


				//===== COUNT SORT =====//
				//=====================//

				myController.kolicina = -1;
				myController.filterKolicine = function (el) {
					console.log("Hello!");
					myController.p_grade = -1;
					myController.p_price = -1;
					myController.kolicina = el;
					myController.proizvod = null;
					if (myController.kategorija != null) {
						myController.proizvodi = myController.kategorijeProizvoda[myController.kategorija];
					} else {
						myController.proizvodi = myController.svi_proizvodi;
					}
					if (myController.kolicina != -1) {
						var lista = myController.proizvodi;
						var rez = [];
						for (var i in lista) {
							if (myController.kolicina == 1 && lista[i].kolicina > 0 && lista[i].kolicina <= 25) {
								rez.push(lista[i]);
							}
							if (myController.kolicina == 2 && lista[i].kolicina > 25) {
								rez.push(lista[i]);
							}
						}
						myController.proizvodi = rez;
					}
				}
				

				//======== GRADE SORT ========//
				//===========================//

				myController.p_grade = -1;
				myController.filterOcene = function (el) {
					myController.p_grade = el;
					myController.proizvod = null;
					if (myController.kategorija != null) {
						myController.proizvodi = myController.kategorijeProizvoda[myController.kategorija];
					} else {
						myController.proizvodi = myController.svi_proizvodi;
					}
					if (myController.p_grade != -1) {
						var lista = myController.proizvodi;
						var rez = [];
						for (var i in lista) {
							if (myController.p_grade == lista[i].p_grade) {
								rez.push(lista[i]);
							}
						}
						myController.proizvodi = rez;
						console.log(rez)
					}
				}

				myController.listaKategorija = [];
				myController.kategorijeProizvoda = {};

				myController.kategorija = null;
				myController.proizvod = null;

				$scope.alerts = [];

		    $scope.closeAlert = function(index) {
		        $scope.alerts.splice(index, 1);
		    };

				//======== ADD TO CART =========//
				//=============================//

				$scope.add_cart = function(proizvod){
					if(proizvod){
						$scope.carts.push({p_id: proizvod.p_id, p_name: proizvod.p_name, p_price: proizvod.p_price});
					}
				}


				$scope.total = 0;

				$scope.setTotals = function(cart){
					if(cart){
						$scope.total += cart.p_price;
					}
				}

				//===== REMOVE FROM CART =====//
				//===========================//

				$scope.remove_cart = function(cart){
					if(cart){
						$scope.carts.splice($scope.carts.indexOf(cart), 1);
						$scope.total -= cart.p_price;
					}
				}

				myController.currentPage = 1;
				myController.itemsPerPage = 20;
				myController.totalItems = 10;
				myController.maxSize = 5;
				myController.korisnikPrijavljenUser = false;
				myController.korisnikPrijavljenAdmin = false;

				//========= LOGIN ===========//
				//==========================//

				myController.login = function () {
						var modalInstance = $uibModal.open({
		        animation: true,
		        templateUrl: 'myModalContent.html',
		        controller: function($uibModalInstance, parent){
		            var $ctrl = this;

		            $ctrl.stanje = 'Login';
		            $ctrl.username = parent.username;
		            $ctrl.password = '';
		            $ctrl.poruka = '';

		            $ctrl.login = function(){
		                if($ctrl.password == '123' && $ctrl.username == 'korisnik'){
		                    $uibModalInstance.close($ctrl.username);
		                    parent.korisnikPrijavljenUser = true;
												$window.localStorage.setItem('user', $ctrl.username);
												return vm.message = "ulogovani ste kao: " + $ctrl.username;
		                }
										if($ctrl.password == '456' && $ctrl.username == 'admin'){
		                    $uibModalInstance.close($ctrl.username);
		                    parent.korisnikPrijavljenAdmin = true;
												$window.localStorage.setItem('user', $ctrl.username);
												return vm.message = "ulogovani ste kao: " + $ctrl.username;
		                }else{
		                    $ctrl.poruka = 'Pogresna lozinka';
		                }
		            }

		            $ctrl.register = function(){
		              $uibModalInstance.close($ctrl.username);
		            }

		            $ctrl.cancel = function () {
		              $uibModalInstance.dismiss('cancel');
		            };
		        },
		        controllerAs: '$ctrl',
		        resolve: {
		          parent: function () {
		            return myController;
		          }
		        }
		      });

		      modalInstance.result.then(function (username) {
		        console.log(username);
						console.log(vm.message);
		      }, function () {
		        console.log('modal-component dismissed at: ' + new Date());
		      });
				};
				

				//==== LOGOUT ====//
				//===============//

				myController.logout = function(){
		      //$ctrl.password = "";
			  	vm.message='';
		      myController.korisnikPrijavljenUser = false;
			    myController.korisnikPrijavljenAdmin = false;
		      return vm.message = "Izlogovani ste. Hvala sto ste koristili aplikaciju.";
		      $window.localStorage.removeItem('user');
		    }



			//===== CHECKOUT =======//
			//=====================//

			myController.checkout = function(){
				console.log($scope.carts);
				if (myController.korisnikPrijavljenAdmin == true || myController.korisnikPrijavljenUser == true){
					if ($scope.carts.length > 0){
						return vm.message = "proizvod je ubacen u korpu"
					}else{
						return vm.message = "Korpa je prazna unesite proizvod"
					}
					//parent.korisnikPrijavljenUser = false;
					//parent.korisnikPrijavljenAdmin = false;
				}else{
					myController.login();
					return vm.message="Morate se ulogovati da nastavite kupovinu";
				}

			}
			myController.init();
	});
