module.exports = function(app) {
    const members = require('./member.control.js');

    app.get('/members',members.findAll);

    app.post('/member',members.create);

    app.get('/members/:UserType',members.findUserType);

    app.get('/members/:BloodGroup',members.findBloodGroup);

    app.get('/memners/:Designation',members.findDesignation);

    app.put('/members/:MobileNo',members.update);
};