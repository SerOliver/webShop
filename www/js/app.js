var app = angular.module("myModule", ['ui.bootstrap']);
				app.controller("myCtrl", function($scope, $window, $http, $uibModal){
				var myController = this;
				$scope.carts=[];
				$window.message = "";
				$scope.products = [
					{p_id: "1", p_name: "The Beatles", p_image: "images/1.jpg", p_price: 350},
					{p_id: "2", p_name: "Led Zeppelin", p_image: "images/2.png", p_price: 450},
					{p_id: "3", p_name: "The Rolling Stones", p_image: "images/3.png", p_price: 350},
					{p_id: "4", p_name: "Pink Floyd", p_image: "images/4.png", p_price: 400},
					{p_id: "5", p_name: "AC/DC", p_image: "images/5.png", p_price: 300},
					{p_id: "6", p_name: "The Who", p_image: "images/6.png", p_price: 350},
					{p_id: "7", p_name: "The Who", p_image: "images/6.png", p_price: 350},
					{p_id: "8", p_name: "The Who", p_image: "images/6.png", p_price: 350},
					{p_id: "9", p_name: "The Who", p_image: "images/6.png", p_price: 350},
					{p_id: "10", p_name: "The Who", p_image: "images/6.png", p_price: 350},
					{p_id: "11", p_name: "The Who", p_image: "images/6.png", p_price: 350}
				];


				$scope.add_cart = function(product){
					if(product){
						$scope.carts.push({p_id: product.p_id, p_name: product.p_name, p_price: product.p_price});
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
				myController.itemsPerPage = 4;
				myController.totalItems = 20;
				myController.maxSize = 5;

				myController.filterCena = function(el){
		        console.log("filter_cena");
		    }

				//=========LOGIN============//
				//=========================//
				myController.login = function () {
					console.log("click");
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
		      }, function () {
		        console.log('modal-component dismissed at: ' + new Date());
		      });
		    };

				myController.logout = function(){
		      //$ctrl.password = "";
		      //vm.autorizovan = false;
		      $window.message = "Hvala sto ste koristili aplikaciju.";
		      $window.localStorage.removeItem('user');
		    }
	});
