class EventManager {
    constructor(){

    }
    createEvent(eventInfo){
        var json = JSON.parse(eventInfo);
        var info = [];
        for(var key in json){
            info.push("'"+json[key]+"'");
        }
        console.log(info);
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) console.log(err);
            var values = info.join(", ");
            console.log(values);    
            var query = "INSERT INTO event (Title, DateTime, Location, Description, AccessLevel, UserID) SELECT " +values + " FROM DUAL WHERE NOT EXISTS "
            + "(SELECT Title, DateTime, Location, Description, AccessLevel, UserID FROM event WHERE Title="+info[0] + " AND DateTime="+info[1]+ " AND Location="+info[2]+
            " AND Description="+info[3] + " AND AccessLevel="+info[4] + " AND UserID="+info[5]+");";
            con.query(query, function(err, result){
                if(err) console.log(err);
                console.log("Success!");
                //at this point, send all data to the front end to display 
            })
        })
    }
    editEvent(id, eventInfo) {
        var json = JSON.parse(eventInfo);
        var info = [];
        for(var key in json){
            info.push(json[key]);
        }
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) return err;
            var query = "UPDATE event SET Title="+ mysql.escape(info[0]) + ", DateTime=" + mysql.escape(info[1]) + ", Location=" + mysql.escape(info[2]) + ", Description=" + mysql.escape(info[3]) + ", AccessLevel=" + mysql.escape(info[4]) + ", UserID=" + mysql.escape(info[5]) + " WHERE EventID=" + id;
            con.query(query, function(err, result){
                if(err) console.log(err);
                // console.log(result.affectedRows);
                console.log("Edited!");
                //at this point, send all data to the front end to display 
            })
        });
    }
    getAllEvents(accessLevel, limit) {
        if(!accessLevel || !limit){
            console.log("Invalid call");
            return;
        }
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) return err;
            var query = "SELECT e.EventID, e.Title, e.DateTime, e.Location, e.Description, e.AccessLevel, u.username FROM event e, user u WHERE u.userID=e.userID AND e.AccessLevel <= "+mysql.escape(accessLevel)+" ORDER BY e.EventID DESC LIMIT "+mysql.escape(limit);
            con.query(query, function(err, result){
                if(err) console.log(err);
                var events = [];
                for(var i in result){
                    // console.log(JSON.stringify(result[i]));
                    events.push(result[i]);
                }
                console.log(JSON.stringify(events));
                //at this point, send all data to the front end to display 
            })
        });
    }
    getEventByID(id) {
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) return err;
            var query = "SELECT e.eventID, e.Title, e.DateTime, e.Location, e.Description, e.AccessLevel, u.username FROM event e, user u WHERE u.userID=e.userID AND u.userID="+mysql.escape(id);
            con.query(query, function(err, result){
                if(err) console.log(err);
                var events = [];
                for(var i in result){
                    // console.log(JSON.stringify(result[i]));
                    events.push(result[i]);
                }
                console.log(events);
                //at this point, send all data to the front end to display 
            })
        });
    }
    getUsersEvents(id){
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) return err;
            var query = "SELECT e.EventID, e.Title, e.DateTime, e.Location, e.Description, e.AccessLevel, u.username FROM event e, user u, favorites f WHERE e.EventID=f.eventID AND e.UserID=u.UserID AND f.userID="+mysql.escape(id);
            con.query(query, function(err, result){
                if(err) console.log(err);
                var events = result;
                console.log(events);
                //at this point, send all data to the front end to display 
            })
            //see user.js getSavedvents func
        });
    }
    getEventsByTag(tag){
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) return err;
            var query = "SELECT e.eventID, e.Title, e.DateTime, e.Location, e.Description, e.AccessLevel, u.username FROM event e, user u, tag t WHERE u.userID=e.userID AND t.EventID = e.EventID AND t.name="+mysql.escape(tag);
            con.query(query, function(err, result){
                if(err) console.log(err);
                var events = [];
                for(var i in result){
                    // console.log(JSON.stringify(result[i]));
                    events.push(result[i]);
                }
                console.log(events);
                //at this point, send all data to the front end to display 
            })
        });
    }
    getEventsByDesc(desc) {
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) return err;
            var query = "SELECT e.EventID, e.Title, e.DateTime, e.Location, e.Description, e.AccessLevel, u.username FROM event e, user u WHERE u.userID=e.userID AND (INSTR(e.Description, '" + desc + "') > 0)";
            console.log(query);
            con.query(query, function(err, result){
                if(err) console.log(err);
                var events = [];
                for(var i in result){
                    // console.log(JSON.stringify(result[i]));
                    events.push(result[i]);
                }
                console.log(events);
                //at this point, send all data to the front end to display 
            })
        });
    }
    getEventsByOwner(id) {
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) return err;
            var query = "SELECT e.EventID, e.Title, e.DateTime, e.Location, e.Description, e.AccessLevel, u.username FROM event e, user u WHERE u.userID=e.userID AND u.userID=" +mysql.escape(id);
            console.log(query);
            con.query(query, function(err, result){
                if(err) console.log(err);
                var events = [];
                for(var i in result){
                    // console.log(JSON.stringify(result[i]));
                    events.push(result[i]);
                }
                console.log(events);
                //at this point, send all data to the front end to display 
            });
        });
    }
    getNewEvents(id){
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) return err;
            var query = "SELECT e.EventID, e.Title, e.DateTime, e.Location, e.Description, e.AccessLevel, u.username FROM event e, user u WHERE u.userID=e.userID AND e.eventID>" +mysql.escape(id) + " ORDER BY e.eventID DESC";
            console.log(query);
            con.query(query, function(err, result){
                if(err) console.log(err);
                var events = [];
                for(var i in result){
                    // console.log(JSON.stringify(result[i]));
                    events.push(result[i]);
                }
                console.log(events);
                //at this point, send all data to the front end to display 
            });
        });
    }
}