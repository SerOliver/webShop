var app = angular.module("myModule", [])
				.controller("myController", function($scope){
				var myController = this;
				$scope.carts=[];
				$scope.products = [
					{p_id: "1", p_name: "The Beatles", p_image: "images/1.jpg", p_price: 350},
					{p_id: "2", p_name: "Led Zeppelin", p_image: "images/2.png", p_price: 450},
					{p_id: "3", p_name: "The Rolling Stones", p_image: "images/3.png", p_price: 350},
					{p_id: "4", p_name: "Pink Floyd", p_image: "images/4.png", p_price: 400},
					{p_id: "5", p_name: "AC/DC", p_image: "images/5.png", p_price: 300},
					{p_id: "6", p_name: "The Who", p_image: "images/6.png", p_price: 350},
					{p_id: "7", p_name: "The Who", p_image: "images/6.png", p_price: 350},
					{p_id: "8", p_name: "The Who", p_image: "images/6.png", p_price: 350}
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
	});