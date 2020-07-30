'use strict';


var mongoose = require('mongoose'),
    Transaction = mongoose.model('Transaction');

exports.list_all_tasks = async function (req, res) {
    let data = await Transaction.find().sort({ Created_date: -1 })
    res.json(data);
};




exports.create_a_task = async function (req, res) {
    let totalAmount = 0;
    let data = await Transaction.findOne().sort({ Created_date: -1 });
    if (data) {
        totalAmount = data.totalAmount;
    }
    if (req.body.credit) {
        totalAmount += req.body.credit;
    } else {
        if (totalAmount == 0) {
            return res.send("Debit");
        }
        totalAmount -= req.body.debit;
    }

    let postBody = { credit: req.body.credit, debit: req.body.debit, description: req.body.description, totalAmount: totalAmount };


    var new_task = new Transaction(postBody);

    new_task.save(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_task = function (req, res) {
    Transaction.findById(req.params.taskId, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_task = function (req, res) {
    Transaction.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_task = function (req, res) {


    Transaction.remove({
        _id: req.params.taskId
    }, function (err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};
