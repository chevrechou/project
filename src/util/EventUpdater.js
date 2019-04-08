class EventUpdater{
	constructor() {
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) return err;
            var query = "SELECT TimeStamp FROM action ORDER BY TimeStamp DESC LIMIT 1";
            con.query(query, function(err, result){
                if(err) console.log(err);
                this.latestTime = result[0].timestamp;
                console.log(latestTime);
            });
        });
    }
    twoDigits(d) {
        if(0 <= d && d < 10) return "0" + d.toString();
        if(-10 < d && d < 0) return "-0" + (-1*d).toString();
        return d.toString();
    }
    convertDate(date){
        return date.getUTCFullYear() + "-" + twoDigits(1 + date.getUTCMonth()) + "-" + twoDigits(date.getUTCDate()) + " " + twoDigits(date.getUTCHours()) + ":" + twoDigits(date.getUTCMinutes()) + ":" + twoDigits(date.getUTCSeconds());
    };
}