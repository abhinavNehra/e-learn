app.controller('ModalController', ['$scope', '$uibModalInstance',
    function ($scope, $uibModalInstance) {

        $scope.$on('closeModal', function () {
            $uibModalInstance.dismiss('cancel');
        });

        $scope.closeModal = function () {
           $uibModalInstance.dismiss('cancel');
        };
        $scope.closePostActivityModal = function () {
			$uibModalInstance.dismiss('cancel');
			angular.element('#fadein').removeClass('color-overlay');
        };
	}
]);