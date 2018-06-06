// Looking at the friends.js file.
var friends = require("../data/friends");

module.exports = function(app){
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){

        var newFriend = req.body; // person that just submitted quiz
        var newFriendScores = newFriend.scores;

        var lowestTotal = 100;

        var match;

        //compairing friends with the inputs for a newFriend. To find a "correct" match
        for(var i = 0;i<friends.length; i++){
            var totalDiff = 0;
            var currentFriend = friends[i];
            var currentFriendScores = currentFriend.scores;
            for(var j = 0; j< currentFriendScores.length;j++){
                totalDiff += Math.abs(parseInt(currentFriendScores[j])- parseInt(newFriendScores[j]));
            }
            if(totalDiff<lowestTotal){
                lowestTotal = totalDiff;
                match = currentFriend;
            }
        }
        //push the new friend into the array of friends.
        friends.push(newFriend);
        
        res.json(match);
    });
}