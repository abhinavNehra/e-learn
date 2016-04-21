var Lesson = require('../models/lessons');
var helper = require('../helper/response');
var validator = require('validator');
var CompletedLesson = require('../models/completedLesson');

module.exports = {
	addLesson : function(req, res, next){
		Lesson.findOne({name:req.body.name,module:req.body.module})
		.then(function(lesson){
			if(!lesson){
				(new Lesson(req.body)).save(function(err, lesson){
					if(err){
						res.json(helper.responseObject(422, err, null, true));
					}else {
						req.result = lesson;
						next();				
					}
				})
			}else{
				throw({message:"lesson name must be unique"});
			}
		})
		.catch(function(err){
			res.json(helper.responseObject(422, err.message, null));
		});
	},
	getAllLesson : function(req, res, next){
		Lesson.find({deleted:false})
		.then(function(lessons){
			req.result = lessons;
			next();
		})
		.catch(function(err){
			res.json(helper.responseObject(422, err, null, true));
		})
	},
	getLesson : function(req, res, next){

		if(validator.isMongoId(req.params.id)){
			Lesson.findOne({_id:req.params.id,deleted:false})
			.then(function(lesson){
				req.result = lesson;
				next();
			})
			.catch(function(err){
				res.json(helper.responseObject(422, err, null, true));
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	},
	editLesson : function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			var editLesson = {
				name:req.body.name,
				activity:req.body.activity,
				Keytakeaways:req.body.Keytakeaways,
				basic_description:req.body.basic_description,
				detailed_description:req.body.detailed_description
			}
			Lesson.update({_id:req.params.id},{ $set : editLesson},function(err, change){
				if(err)
					res.json(helper.handleError(422, err));
				if(change.ok === 1 && change.n === 1){
					req.result = change;
					next();
				}else{
					res.json(helper.handleError(422, "lesson not found sorry"));
				}
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	},
	deleteLesson: function(req, res, next){
		Lesson.remove({_id:req.params.id})
		.then(function(lesson){
			req.result = lesson;
			next();
		})
		.catch(function(err){
			res.json(helper.responseObject(422, err, null, true));
		})	
	},
	addCompletedLesson: function(req, res, next){
		if(validator.isMongoId(req.body.lesson) && validator.isMongoId(req.body.user)){
			CompletedLesson.findOne({user:req.body.user,lesson:req.body.lesson},function(err, completedLesson){
				if(err)
					res.json(helper.responseObject(422, err, null, true));
				else if(completedLesson){
					req.result = { message: "Lesson Already Comleted"};
			    	next();
				}else{
					(new CompletedLesson(req.body)).save(function(err, completedLesson){
			    		if(err)
							res.json(helper.responseObject(422, err, null, true));
			    		req.result = { message: "Lesson Comleted"};
			    		next();
			    	})
			    }
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
    },
    getCompletedLessons: function(req, res, next){

    	CompletedLesson.find({},function(err, completedLesson){
    		if(err)
    			res.json(helper.responseObject(422, err, null, true));
    		req.result = completedLesson;
			next();
    	});

    },
    getCompletedLesson: function(req, res, next){

    	if(validator.isMongoId(req.params.id)){
	    	CompletedLesson.findOne({_id:req.params.id},function(err, completedLesson){
	    		if(err)
	    			res.json(helper.responseObject(422, err, null, true));
	    		req.result = completedLesson;
				next();
	    	});
	    }else{
			res.json(handler.handleError(404, "Not Found"));
		}		
    },
    deleteCompletedLesson: function(req, res, next){
    	CompletedLesson.remove({_id:req.params.id})
		.then(function(completedLesson){
			req.result = completedLesson;
			next();
		})
		.catch(function(err){
			res.json(helper.responseObject(422, err, null, true));
		})	
    }
}