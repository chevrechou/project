var io = require('socket.io').listen(2900);
var lastDateTime = convertDate(new Date());

function pad2(word) {
    var str = '' + word;
    while (str.length < 2) {
        str = '0' + str;
    }
    return str;

}
function formatDate(dt){
    var dtstring = dt.getFullYear()
        + '-' + pad2(dt.getMonth()+1)
        + '-' + pad2(dt.getDate())
        + ' ' + pad2(dt.getHours())
        + ':' + pad2(dt.getMinutes())
        + ':' + pad2(dt.getSeconds());
    return dtstring;
} 

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}
function convertDate(date){
    console.log(date.getUTCHours() -7);
    return date.getUTCFullYear() + "-" + twoDigits(1 + date.getUTCMonth())
    + "-" + twoDigits(date.getUTCDate()) + " " + twoDigits(date.getUTCHours()-7)
    + ":" + twoDigits(date.getUTCMinutes()) + ":" + twoDigits(date.getUTCSeconds());
};

function getHistory(latestTime, callback){
    console.log(latestTime);
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'events'
    });
    connection.query('SELECT a.EventID FROM action a WHERE a.TimeStamp > "' + latestTime + '"', function(err, result){
        if(err){
            console.log(err);
        }
        else {
            console.log(result);
            return callback(result);
        }
    });
    connection.end();
}

function eventUpdater(){
    setInterval( function() {
        // console.log(lastDateTime);
        console.log("Checking for updates...")
        getHistory(lastDateTime, function(result) {
            console.log(result);
          if (typeof result!=="undefined"){
            if(result.length > 0){
                // Emit update stuff
                console.log("Emitting update!");
                lastDateTime = convertDate(new Date());
            }
            else{
                console.log("No new updates.");
            }
          }

        });
    }, 1000);

}

console.log("Server started!");
eventUpdater();


io.sockets.on('connection', function(socket){
    socket.on('authenticate', function(data) {
        var username = data.user;
        var password = data.pass;
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) {
                console.log(err);
                con.end();
            }
            var query = "SELECT UserID, username, accessLevel FROM user WHERE username=" + mysql.escape(username) + " AND password=" + mysql.escape(password);
            con.query(query, function(err, result){
                if(err) {
                    console.log(err);
                    con.end();
                }
                else {
                    var returnString = '';
                    if(result.length == 0){
                        con.end();
                        console.log("Username/Password do not match!")
                        socket.emit('authenticateResponse', -1);
                    }
                    else {
                        returnString = result[0].UserID + "," + result[0].username + "," + result[0].accessLevel;
                        console.log(returnString);
                        con.end();
                        socket.emit('authenticateResponse', returnString);
                    }
                }
            });
        });
    });
    socket.on('register', function(data){
        console.log(data);
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) {
                console.log(err);
                con.end();
            }
            var query = "INSERT INTO user (Username, Password, Email, AccessLevel) SELECT " + mysql.escape(data.Username) + ", " + mysql.escape(data.Password) + ", " + mysql.escape(data.Email) + ", 1 FROM DUAL WHERE NOT EXISTS "
            + "(SELECT Username, Password, Email, AccessLevel FROM user WHERE Username="+mysql.escape(data.Username) + ");";
            con.query(query, function(err, result){
                if(err) {
                    console.log(err);
                    con.end();
                }
                else {
                    if(result.affectedRows == 0){
                        con.end();
                        console.log("Username was taken!")
                        socket.emit('registerResponse', -1);
                    }
                    else {
                        con.end();
                        console.log(result.insertId);
                        socket.emit('registerResponse', result.insertId);
                    }
                }
            });
        });
    });
    socket.on('loadEvents', function(data){
        console.log(data);
        var accessLevel = data.userAC;
        var limit = data.limit;
        if(accessLevel == undefined || !limit){
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
            if(err) {
                console.log(err);
                con.end();
                socket.emit('loadEventsResponse', -1);
            };
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
                socket.emit('loadEventsRepsonse', events);
            })
        });
    });
    socket.on('loadMyEvents', function(id){
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
                socket.emit('loadMyEventsResponse', events);
            })
        });
    });
    socket.on('addToFavorites', function(data){
        console.log('EVENT DATA');
        console.log(data);
        var UserID = data.UserID;
        var EventID = data.EventID;
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
                console.log('SUCCESSFUL ADDITION');
                con.end();
            })
        });
    });
    socket.on('removeFromFavorites', function(data){
        var UserID = data.UserID;
        var EventID = data.EventID;
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
                console.log('DELETED FROM FAVORITES');
            })
        })
    });
    socket.on('createEvent', function(data){
        console.log('in creation');
        var title = data.Title;
        var date = new Date (data.DateTime);
        var location = data.Location;
        var description = data.Description;
        var accessLevel = data.AccessLevel;
        var userId= data.UserID;
        var info = [];
        for(var s in data){
            if(s == 'DateTime')
                info.push("'" + formatDate(date)+ "'");
            else if(s != 'tags')
                info.push("'"+data[s]+"'");
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
            var query = "INSERT INTO event (Title, DateTime, Location, Description, AccessLevel, UserID) SELECT " + values + " FROM DUAL WHERE NOT EXISTS "
            + "(SELECT Title, DateTime, Location, Description, AccessLevel, UserID FROM event WHERE Title="+ mysql.escape(title) + " AND DateTime=" + mysql.escape(formatDate(date)) + " AND Location=" + mysql.escape(location) +
            " AND Description=" + mysql.escape(description) + " AND AccessLevel="+ accessLevel+ " AND UserID=" + userId + ");";
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
    });
    socket.on('getAllUsers', function(){
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
			else {
				var query = "SELECT username, userID, accessLevel FROM user";
				con.query(query, function(err, result){
					if(err) {
						console.log(err);
					}
					else {
                        console.log("Changed access level!");
                        console.log(result);
                        var res=result;
                        socket.emit('getUsersResponse', res);
					}
					con.end();
				})
			}
		});
    });
    socket.on('deleteEvent', function(id){
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
    });
    socket.on('updateEvent', function(data){
        console.log(data);
        var values = JSON.parse(data.values);
        var User= JSON.parse(data.User);
        console.log(values);
        console.log(User);
        var eventId = data.EventID;
        var title = values.Title;
        var date = values.DateTime;
        var location = values.Location;
        var description = values.Description;
        var UserID = User.userID;
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
            var query = "UPDATE event SET Title="+ mysql.escape(title) + ", DateTime=" + mysql.escape(date) + ", Location=" + mysql.escape(location)
                + ", Description=" + mysql.escape(description)
                + " WHERE EventID=" + eventId;
            console.log(query);
            con.query(query, function(err, result){
                if(err){
                    console.log(err);
                    con.end();
                }
                else {
                    con.query("INSERT INTO action (Type, EventID) VALUES ('edit', "+eventId+ ");", function(err, result1){
                        if(err){
                            console.log(err);
                            con.end();
                        }
                        else {
                            console.log("Edited!");
                            var newQuery = "SELECT u.email FROM user u, event e, favorites f WHERE u.UserID = f.UserID AND f.EventID = e.EventID AND e.eventID="+eventId;
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
                                            + title + '</p><p>DateTime: ' + date + '</p><p>Location: '
                                            + location + '</p><p>Description: ' + description
                                        }
                                        transporter.sendMail(mailOptions, function(err, info){
                                            if(err)
                                                console.log(err);
                                            else
                                                console.log("Email Sent " + info.response)
                                        });
                                        socket.emit('updateEventResponse', "Success!");
                                    }
                                    con.end();
                                }
                            });
                        }
                    });
                }
            })
        });
    });
    socket.on('changeAccessLevel', function(data){
        var userId = data.UserID;
        var newAccessLevel = data.AccessLevel;
        console.log("Changing user: " + userId + "'access level to " + newAccessLevel);
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
			else {
				var query = "UPDATE user SET AccessLevel=" + newAccessLevel + " WHERE UserID=" + userId;
				con.query(query, function(err, result){
					if(err) {
						console.log(err);
					}
					else {
						console.log("Changed access level!");
					}
					con.end();
				})
			}
		});
    });
})
