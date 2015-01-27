/**
 * Created by Luke on 18/01/2015.
 */

    module.exports = {
        createSpreadSheet: function (name,db,callback){
            var spreadsheets = db.get('spreadsheets');
            var spreadSheet = {name : name, tables : {}, date : new Date()};
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

        },

        getSpreadSheet: function (id, db, callback) {
          var spreadSheetCollection = db.get('spreadsheets');
            spreadSheetCollection.findOne({_id: id}, function(e,doc){
                callback(doc);
            })
        },

        addTable: function (id,table, db, callback) {
            var spreadSheetCollection = db.get('spreadsheets');
            spreadSheetCollection.findOne({_id: id}, function(e,spreadSheet){
                spreadSheet.tables[table.name] = table;
                spreadSheetCollection.update({_id:spreadSheet._id}, {$set:{tables:spreadSheet.tables}},{upsert:false},function(err,res){
                    callback();
                });
            });
        },

        updateTablePosition: function(id,tableName, top, left, db, callback){
            var spreadSheetCollection = db.get('spreadsheets');
            spreadSheetCollection.findOne({_id:id}, function(e,spreadSheet){
               spreadSheet.tables[tableName].top =  top;
                spreadSheet.tables[tableName].left = left;
                spreadSheetCollection.update({_id:spreadSheet._id},{$set:{tables:spreadSheet.tables}},{upsert:false},function(err,res){
                    callback();
                });
            });
        },

        save: function(id,tables,db,callback){
            var spreadSheetCollection = db.get('spreadsheets');
            spreadSheetCollection.findOne({_id:id}, function(e, spreadSheet){
                for(var tableName in tables){
                    for(var cellName in tables[tableName].cells){
                        var cell = tables[tableName].cells[cellName];
                        spreadSheet.tables[tableName].cells[cell.row][cell.column] = cell;
                    }
                }
                spreadSheetCollection.update({_id:spreadSheet._id},{$set:{tables:spreadSheet.tables}},{upsert:false},function(err,res){
                    callback();
                })
            })
        }

    };
