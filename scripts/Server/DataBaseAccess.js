/**
 * Created by Luke on 18/01/2015.
 */

    module.exports = {
        createSpreadSheet: function (name,db,callback){
            var spreadsheets = db.get('spreadsheets');
            var spreadSheet = {name : name, tables : [], date : new Date()};
            spreadsheets.insert(spreadSheet, function(err,result){
                if(err) return;
                var id = spreadSheet._id;
                console.log(id);
                callback(id);
            })
        },

        getSpreadSheets: function(db, callback){
            var spreadsheetCollection = db.get('spreadsheets');
            var spreadsheets = spreadsheetCollection.find({},{},function(e,docs){
                callback(docs);
            });

        }
    };
