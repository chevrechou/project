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
            if(err){
                console.log(err);
                con.end();
            }
            var values = info.join(", ");
            console.log(values);    
            var query = "INSERT INTO event (Title, DateTime, Location, Description, AccessLevel, UserID) SELECT " +values + " FROM DUAL WHERE NOT EXISTS "
            + "(SELECT Title, DateTime, Location, Description, AccessLevel, UserID FROM event WHERE Title="+info[0] + " AND DateTime="+info[1]+ " AND Location="+info[2]+
            " AND Description="+info[3] + " AND AccessLevel="+info[4] + " AND UserID="+info[5]+");";
            con.query(query, function(err, result){
                if(err) {
                    console.log(err);
                    con.end();
                }
                else {
                    console.log(result.insertId);
                    con.query("INSERT INTO action (Type, EventID) VALUES ('add', "+ result.insertId + ");", function(err, result){
                        if(err) console.log(err);
                        con.end();
                    });
                }
            })
        })
    }
    addToFavorites(UserID, EventID){
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err){
                console.log(err);
                con.end();
            }
            var query = "INSERT INTO favorites (UserID, EventID) SELECT " + UserID + ", " + EventID + " FROM DUAL WHERE NOT EXISTS "
            + "(SELECT userID, eventID FROM favorites WHERE userID=" + UserID + " AND eventID=" + EventID + ");";
            con.query(query, function(err, result){
                if(err) {
                    console.log(err);
                }
                con.end();
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
            if(err){
                console.log(err);
                con.end();
            }
            var query = "UPDATE event SET Title="+ mysql.escape(info[0]) + ", DateTime=" + mysql.escape(info[1]) + ", Location=" + mysql.escape(info[2]) + ", Description=" + mysql.escape(info[3]) + ", AccessLevel=" + mysql.escape(info[4]) + ", UserID=" + mysql.escape(info[5]) + " WHERE EventID=" + id;
            con.query(query, function(err, result){
                if(err){
                    console.log(err);
                    con.end();
                }
                else {
                    con.query("INSERT INTO action (Type, EventID) VALUES ('edit', "+id+ ");", function(err, result1){
                        if(err){
                            console.log(err);
                            con.end();
                        }
                        else {
                            console.log("Edited!");
                            var newQuery = "SELECT u.email FROM user u, event e, favorites f WHERE u.UserID = f.UserID AND f.EventID = e.EventID AND e.eventID="+id;
                            con.query(newQuery, function(err, result){
                                if(err){
                                    console.log(err);
                                    con.end();
                                }
                                else {
                                    var emails = [];
                                    for (var i in result){
                                        emails.push(result[i].email);
                                    }
                                    var emailString = emails.join(', ');
                                    if(emails.length > 0){
                                        var mailer = require('nodemailer');
                                        var transporter = mailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: 'usceventhub@gmail.com',
                                                pass: 'Usc_Event_Hub'
                                            }
                                        });
                                        var mailOptions = {
                                            from: 'usceventhub@gmail.com',
                                            to: emailString,
                                            subject: 'An Event has been Updated!',
                                            html: '<h1>An Event you saved has been updated</h1><p>Title: ' 
                                            + info[0] + '</p><p>DateTime: ' + info[1] + '</p><p>Location: '
                                            + info[2] + '</p><p>Description: ' + info[3]
                                        }
                                        transporter.sendMail(mailOptions, function(err, info){
                                            if(err)
                                                console.log(err);
                                            else 
                                                console.log("Email Sent " + info.response)
                                            con.end();
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            })
        });
    }
    deleteEvent(id) {
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        var title = '';
        con.connect(function(err){
            if(err){
                console.log(err);
                con.end();
            }
            con.query("SELECT Title From event WHERE EventID="+id, function(err, result1){
                if(err){
                    console.log(err);
                    con.end();
                }
                else{
                    console.log(result1);
                    var newQuery = "SELECT u.email FROM user u, event e, favorites f WHERE u.UserID=f.UserID AND f.EventID=e.EventID AND e.eventID="+id;
                    con.query(newQuery, function(err, result2){
                        if(err){
                            console.log(err);
                            con.end();
                        }
                        else {
                            var emails = [];
                            for (var i in result2){
                                emails.push(result2[i].email);
                            }
                            var emailString = emails.join(', ');
                            console.log("Emails: " + emailString);
                            con.query("INSERT INTO action (Type, EventID) VALUES ('delete', "+id+ ");", function(err, result3){
                                if(err){
                                    console.log(err);
                                    con.end();
                                }
                                else {
                                    con.query("DELETE FROM event WHERE EventID=" + id, function(err, result4){
                                        if(err){
                                            console.log(err);
                                            con.end();
                                        }
                                        else {
                                            console.log("Deleted from event");
                                            if(emails.length > 0){
                                                var mailer = require('nodemailer');
                                                var transporter = mailer.createTransport({
                                                    service: 'gmail',
                                                    auth: {
                                                        user: 'usceventhub@gmail.com',
                                                        pass: 'Usc_Event_Hub'
                                                    }
                                                });
                                                var mailOptions = {
                                                    from: 'usceventhub@gmail.com',
                                                    to: emailString,
                                                    subject: 'An Event has been Deleted!',
                                                    html: '<h1>An Event you saved has been deleted</h1><p>Title: ' + result1[0].Title + "</p>"
                                                }
                                                transporter.sendMail(mailOptions, function(err, info){
                                                    if(err) console.log(err);
                                                    else console.log("Email Sent " + info.response);
                                                });
                                            }
                                            con.end();
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            })
        });
    }
    removeFromFavorites(UserID, EventID) {
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err){
                console.log(err);
                con.end();
            }
            var query = "DELETE FROM favorites WHERE userID=" + UserID + " AND eventID=" + EventID;
            con.query(query, function(err, result){
                if(err) {
                    console.log(err);
                }
                con.end();
            })
        })
    }
    addTagToEvent(tag, EventID){
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err){
                console.log(err);
                con.end();
            }
            var query = "INSERT INTO tag (Name, EventID) SELECT " + mysql.escape(tag) + ", " + EventID + " FROM DUAL WHERE NOT EXISTS "
            + "(SELECT Name, EventID FROM tag WHERE Name=" + mysql.escape(tag) + " AND EventID=" + EventID + ");";
            con.query(query, function(err, result){
                if(err) {
                    console.log(err);
                }
                con.end();
            })
        })
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
                con.end();
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
};
module.exports = EventManager;
// var em = new EventManager();
// // console.log(date);
// var json = {
//     Title: 'Captai!',
//     DateTime: "04/20/19",
//     Location: 'LA',
//     Description: 'Movie Night!',
//     AccessLevel: '1',
//     UserID: 2
// }
// em.addTagToEvent("Movies!",11);