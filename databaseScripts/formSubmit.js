const  {sql , azurePromise} = require("./sqlPool")
var moment = require('moment');

//Function for logging a user submission into a SQL database for auditing
async function logAttendee(name, email, guestCount, favoriteSong, comments, res) {
    timestamp = moment().format();
    try {
        let azurePool = await azurePromise
        let result = await azurePool.request()
            .input('full_name', sql.VarChar(sql.max), name)
            .input('email', sql.VarChar(sql.max), email)
            .input('guest_count', sql.Int, guestCount)
            .input('favorite_song', sql.VarChar(sql.max), favoriteSong)
            .input('comments', sql.VarChar(sql.max), comments)
            .input('timestamp', sql.DateTime2, timestamp)
            .query('INSERT INTO attendees VALUES (@full_name, @email, @guest_count, @favorite_song, @comments, @timestamp);')      

            if (result.rowsAffected >= 1){
                res.end('{"success" : "Thanks for the Information!", "status" : 200}');
            } else{
                res.end('{"error" : "There was a problem submitting your RSVP!", "status" : 404}');
            }
            
            
    } catch (err) {
        res.end('{"error" : "There was a problem submitting your RSVP!", "status" : 404}');
    }
    
}
//Function is exported to allow main server file to use
module.exports.logAttendee = logAttendee;