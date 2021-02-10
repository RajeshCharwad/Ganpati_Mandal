const Member = require('./member.js');

exports.create = function(req,res){
    //validate request
    if(!req.body)
    {
        res.send(440).send({
            message: 'Content can not be empty!'
        });
    }

    //create member
    const member = new Member({
        UserType: req.body.UserType,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Designation: req.body.Designation,
        MobileNo: req.body.MobileNo,
        Address: req.body.Address,
        BloodGroup: req.body.BloodGroup,
        Amount: req.body.Amount,
        Year: req.body.Year
    });

    //save member in database
    Member.create(member,function(err,data){
        if(err){
            res.status(550).send({
                message:
                    err.message || 'Some error occured while creating the member'
            });
        }
        else{
            res.send(data);
        }      
    });
};

exports.findAll = function(req,res) {
    Member.getAll(function(err,data) {
        if(err)
            res.status(500).send({
                message:
                    err.message || 'Some error occured while retriving members'
            });
        else res.send(data);
    });
};

exports.findUserType = function(req,res){
    Member.findByUserType(req.params.UserType,(err,data)=>{
        if(err){
            if(err.kind == 'not_found'){
                res.status(440).send({
                    message: 'Member not found with user type'
                });
            }else{
                res.status(500).send({
                    message: 'Error finding member with user type' + req.params.UserType
                });
            }
        }
        else{
            res.send(data);
        }
    });
};

exports.findBloodGroup = function(req,res){
    Member.findByBloodGroup(req.params.BloodGroup,(err,data) =>{
        if(err){
            if(err.kind == 'not_found'){
                res.status(440).send({
                    message: 'Member not found with blood group'
                });
            }
        }
        else{
            res.send(data);
        }
    });
};

exports.findDesignation = function(req,res){
    Member.findByDesignation(req.params.Designation,(err,data) => {
        if(err){
            if(err.kind == 'not_found'){
                res.status(440).send({
                    message: 'Member not found with designation'
                });
            }
        }
        else{
            res.send(data);
        }
    });
};

exports.update = function(req,res){
    //validate request
    if(!req.body){
        res.status(440).send({
            message: 'Content can not be empty'
        });
    }

    Member.updateByMobile(req.params.MobileNo,new Member(req.body),(err,data) => {
        if(err){
            if(err.kind == 'not_found'){
                res.status(404).send({
                    message: 'Member not found with mobile no'
                });
            }
            else{
                res.status(500).send({
                    message: 'Error updating member' + req.params.MobileNo
                });
            }
        }
        else{
            res.send(data);
        }
    });
};

exports.delete = function(req,res){
    Member.deletebyMobile(req.params.MobileNo,(err,res) => {
        
    })
}