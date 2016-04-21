var APP = APP || {};
APP.currentUser = {};
var serverAddress = "http://localhost:3000";

APP.endpoints = {
	module: "/modules/",
	lesson: "/modules/:id/lessons",
	lessonDetail: "/lessons/:id",
	validateEmail: "/auth/validateEmail",
	signup: "/signup",
	login: "/login",
	profile: "/profile",
	logout: "/logout",
	statistics :"/auth/statistics",
	actions : "/lessons/:id/actions",
	actionUser : "/lessons/:id/actions/:actionId/save",
	actionSave : "/actions/saves",
	createActivity : "/activity",
	mySpace: "/activity/users/:id",
	moduleCommunity : "/activity/modules/:id",
	lessonCommunity : "/activity/lessons/:id",
	completedLesson : "/completedLessons",
	viewActivity : "/activity/:id",
	forgotPassword : "/auth/resetPassword",
	resetPassword : "/auth/newPassword",
	saveCompleteAction : "/actions/saves/:id",
	changeUserName : "/users/:id/name",
	changeUserEmail : "/users/:id/email",
	changeUserPass : "/users/:id/password",
	changeUserDob : "/users/:id/dob",
	changeUserImage : "/users/:id/avatar",
	isAuthenticated: "/isAuthenticated",
	deleteAccount : "/users/:id",
	likeActivity : "/activity/:id/likes",
	unlikeActivity : "/activity/:id/unlikes",
	deleteActivity : "/activity/:id",
	editActivity : "/activity/:id",
	getNotification : "/users/:id/notifications",
	viewAllNotification  : "users/:id/notifications/unseen",
	viewOneNotification  :  "users/:id/notifications/:nid/seen",
	getListLike : "/activity/:id/likes",
	postComment: "/activity/:id/comments",
	updateComment : "/activity/:id/comments/:commentId"
};
APP.resetPasswordUrl = 'http://localhost:3000/#/reset';
APP.facebookLogin = "http://localhost:3000/facebook";
APP.twitterLogin = "http://localhost:3000/twitter";
