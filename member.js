const sql = require('./connect.js');

const Member = function(member) {
    this.UserType = member.UserType;
    this.FirstName = member.FirstName;
    this.LastName = member.LastName;
    this.Designation = member.Designation;
    this.MobileNo = member.MobileNo;
    this.Address = member.Address;
    this.BloodGroup = member.BloodGroup;
    this.Amount = member.Amount;
    this.Year = member.Year;
  };

  Member.getAll = function(result){
    sql.query('SELECT * FROM mandal', function(err,res){
        if(err) {
            console.log('error: ',err);
            result(null,err);
            return;
        }

        //console.log('Members: ',res);
        result(null,res);
    });
  };

  Member.create = function(newMember,result){
    sql.query('INSERT INTO mandal VALUES ?', newMember,(err,res) => {
      if(err){
        console.log('error: ',err);
        result(err,null);
        return;
      }

      result(null,{UserType: res.insertUserType,...newMember});
    });
  };

  Member.findByUserType = (userType,result) => {
    sql.query('SELECT * FROM mandal WHERE UserType = ?',userType, (err,res) => {
      if(err){
        console.log('error: ',err);
        result(err,null);
        return;
      }

      if(res){
        console.log("member found",res);
        result(null,res);
        return;
      }

      result({kind: 'not_found'},null);
    });
  };

  Member.findByBloodGroup = (BloodGroup,result) => {
    sql.query('SELECT * FROM mandal WHERE BloodGroup = ?',BloodGroup,(err,res) =>{
      if(err){
        console.log('error: ',err);
        result(err,null);
        return;
      }

      if(res){
        console.log("member found",res);
        result(null,res);
        return;
      }

      result({kind: 'not_found'},null);
    });
  };

  Member.findByDesignation = (designation,result) => {
    sql.query('SELECT * FROM mandal WHERE Designation = ?',designation,(err,res) => {
      if(err){
        console.log('error: ',err);
        result(err,null);
        return;
      }

      if(res){
        console.log('Member found',res);
        result(null,res);
        return;
      }

      result({kind: 'not_found'},null);
    });
  };

  Member.updateByMobile = (MobileNo,newMember,result) => {
    sql.query('UPDATE mandal SET BloodGroup = ? WHERE MobileNo = ?',[newMember.BloodGroup,MobileNo],(err,res) => {
      if(err){
        console.log('error: ',err);
        result(null,err);
        return;
      }

      if(res.affectedRows == 0){
        //not found member with mobile no
        result({kind: 'not_found'},null);
        return;
      }

      console.log('Member updated',{MobileNo: MobileNo,...newMember});
      result(null,{MobileNo: MobileNo,...newMember});
    });
  };

  module.exports = Member;