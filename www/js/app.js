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
				/*
				$scope.proizvods = [
					{p_id: "1", p_name: "The Beatles", p_image: "images/1.jpg", p_price: 350, p_grade: 3},
					{p_id: "2", p_name: "Led Zeppelin", p_image: "images/2.png", p_price: 450, p_grade: 4},
					{p_id: "3", p_name: "The Rolling Stones", p_image: "images/3.png", p_price: 350, p_grade: 2},
					{p_id: "4", p_name: "Pink Floyd", p_image: "images/4.png", p_price: 400, p_grade: 5},
					{p_id: "5", p_name: "AC/DC", p_image: "images/5.png", p_price: 300, p_grade: 4},
					{p_id: "6", p_name: "The Who", p_image: "images/6.png", p_price: 350, p_grade: 4},
					{p_id: "7", p_name: "The Who", p_image: "images/6.png", p_price: 350, p_grade: 3},
					{p_id: "8", p_name: "The Who", p_image: "images/6.png", p_price: 350, p_grade: 3},
					{p_id: "9", p_name: "The Who", p_image: "images/6.png", p_price: 350, p_grade: 5},
					{p_id: "10", p_name: "The Who", p_image: "images/6.png", p_price: 350, p_grade: 2},
					{p_id: "11", p_name: "The Who", p_image: "images/6.png", p_price: 350, p_grade: 1}
				];
				*/
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

				myController.listaKategorija = [];
				myController.kategorijeProizvoda = {};

				myController.kategorija = null;
				myController.proizvod = null;

				$scope.alerts = [];

		    $scope.closeAlert = function(index) {
		        $scope.alerts.splice(index, 1);
		    };


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

				$scope.remove_cart = function(cart){
					if(cart){
						$scope.carts.splice($scope.carts.indexOf(cart), 1);
						$scope.total -= cart.p_price;
					}
				}

				myController.currentPage = 1;
				myController.itemsPerPage = 10;
				myController.totalItems = 10;
				myController.maxSize = 5;
				myController.korisnikPrijavljen = false;

				myController.filterCena = function(el){
					console.log("filter_cena");
				}

				//=========LOGIN============//
				//=========================//

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
		                if($ctrl.password == '123'){
		                    $uibModalInstance.close($ctrl.username);
		                    parent.korisnikPrijavljen = true;
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

			myController.logout = function(){
		      //$ctrl.password = "";
			  vm.message='';
		      parent.korisnikPrijavljen = false;
		      return vm.message = "Izlogovani ste. Hvala sto ste koristili aplikaciju.";
		      $window.localStorage.removeItem('user');
		    }

			myController.checkout = function(){
				console.log($scope.carts);
				if($scope.carts.length>0){
					myController.login();
					vm.message='';
				}else{
					return vm.message="Korpa je prazna. Unesite proizvod";
				}

			}
			myController.init();
	});
