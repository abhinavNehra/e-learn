app.controller("commentsController",['$scope','postCommentService','postListCommentService','$timeout','deleteCommentService','editCommentService', function($scope,postCommentService, postListCommentService, $timeout, deleteCommentService, editCommentService){
	$scope.commentFormSubmitted = false;
	$scope.commentList = [];
	$scope.errorComment = false;
	$scope.notificationloader = false;
	$scope.commentProcess = false;
	$scope.hideAllComments = false;
	$scope.remainingComments = 0;
	$scope.fixedComment = false;
	$scope.avatar = APP.currentUser.local.avatar_url;
	
	// watch the activity id	
	$scope.$watch('activityId',function handleIdChange( newValue, oldValue ) {
        $scope.activityId = newValue;
        $scope.UserId = APP.currentUser._id;
        $scope.commentList = [];
        $scope.getComments(1);
	});

	//get the comments 
    $scope.getComments = function(index){
		var limit_start = 0;
		var limit = 6;
		var opts;
		if(index == 1){
			opts = {id : $scope.activityId,skip:limit_start,limit:limit };
		} else {
			opts = {id : $scope.activityId};
		}
		$scope.notificationloader = true;
		postListCommentService.query(opts, function(data){
			if(data.statusCode === 200 && data.message === "ok"){
				$scope.notificationloader = false;
				$scope.commentProcess = false;
				$scope.commentList = data.result.comments;
				/*if(data.result.comments.length > 4){
					$scope.fixedComment = true;
				}*/
				/*var elmnt = document.getElementById("commentBox");
				var txt = "Height including padding and border: " + elmnt.scrollHeight + "px<br>";
				console.log("Height", txt);*/
				if(data.result.totalCount > data.result.comments.length){
					$scope.remainingComments = data.result.totalCount - data.result.comments.length;
				}
				if(index == 2) $scope.hideAllComments = true;
			}  else {
				$scope.notificationloader = false;
				$scope.commentList = [];
				$scope.commentProcess = false;
			}
		});
	};	
	// post the comments
    $scope.postComment = function() {
		$scope.commentFormSubmitted = true;
		var opts = {};
		opts.user = APP.currentUser._id;
		$scope.errorComment = false;
		opts.comment = $scope.txtcomment.trim();
		opts.activity = $scope.activityId;
		postCommentService.save({id:$scope.activityId}, opts , function(data){
			if(data.statusCode === 200 && data.message === "ok"){
				$scope.commentList.push(data.result[0]);
				$scope.txtcomment = '';
				$scope.commentFormSubmitted = false;
			} else {
				$scope.errorComment = false;
				$scope.errCommentMessage = frontendSettings.errorOccured;
				$timeout(function() {
					$scope.errorComment = false;
				}, 3000);
			}
		});
	};
	//delete the comment for id
	$scope.deleteComment = function(index, id){
		$scope.loader[index] = true;
		deleteCommentService.delete({id :$scope.activityId ,commentId : id}, function(data){
			if(data.statusCode === 200 && data.message === "ok"){
				$scope.commentList .splice(index, 1);
				$scope.loader[index] = true;
			}
		}, function(error){
			console.log("delete", error);
		});
	};
	$scope.commentLoading =[];
	$scope.editCommentText = [];
	$scope.isEditComment = [];
	$scope.activeCommentEdit = [];
	$scope.commentErrorMsg = [];
    $scope.commentErrorCls = [];
    // open the edit comment box

	$scope.updateComment = function(index, comment){
		$scope.commentLoading[index] = true;
		$scope.activeCommentEdit = [];
		$scope.commentErrorMsg[index] = '';
        $scope.commentErrorCls[index]= '';
		$scope.isEditComment[index] = false;
		$scope.editCommentText[index] = comment.comment;
		$scope.activeCommentEdit[index] = comment._id;
		$("#commentBox").hide();
	};
	// cancel edit comment
	$scope.cancelPost = function(index){
		$scope.commentLoading[index] = false;
		$scope.commentLoading = [];
		$scope.editCommentText = [];
		$scope.isEditComment = [];
		$scope.activeCommentEdit = [];
		$scope.commentErrorMsg = [];
        $scope.commentErrorCls = [];
        $("#commentBox").show();
	};
	// edit comment
	$scope.editComment = function(index , comment){
		var opts = {};
        $scope.commentErrorMsg[index]= '';
        $scope.isEditComment[index]= false;
        var newText = $scope.editCommentText[index];
        if(newText === undefined || newText === '') {
            $scope.commentErrorCls[index] = 'text-red';
            $scope.commentErrorMsg[index] = "Can not save empty comment";
            $timeout(function(){
                $scope.commentErrorCls[index] = '';
                $scope.commentErrorMsg[index] = '';
            }, 8000);
            return false;
        } 
		var opts1 ={};
		opts1.comment = newText;
		$scope.isEditComment[index]= true;
		editCommentService.update({id :$scope.activityId ,commentId : comment._id},opts1,function(data){
			if(data.statusCode === 200 && data.message === "ok"){
				$scope.activeCommentEdit[index] = '';
				$scope.commentErrorCls[index] = '';
				$scope.commentErrorMsg[index] = '';
				$scope.editCommentText[index] = '';
				$scope.commentList[index].comment = newText;
				$scope.isEditComment[index] = false;
				$("#commentBox").show();
			}  else {
				$scope.commentInProcess[index] = false;
				$scope.isEditComment[index] = false;
				$scope.commentErrorCls[index] = 'text-red';
				$scope.commentErrorMsg[index]= frontendSettings.errorOccured;
				$("#commentBox").show();
			}
			$timeout(function(){
				$scope.commentErrorCls[index] = '';
				$scope.commentErrorMsg[index] = '';
			}, 8000);
		}, function(error){

		});
	};
	// show all comments on click on view all comments
	$scope.showAllComments = function(){
		$scope.commentProcess = true;
		$scope.getComments(2);
	};
}]);