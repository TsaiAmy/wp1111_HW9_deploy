import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();
router.delete("/cards", (_, res) => {
    deleteDB();
    res.json({ message: 'Database cleared'})
});
router.post("/card", async(req, res) => {
    const data = req.body;
    var have = await exist(data.name, data.subject)
    //console.log(have);
    if(have) {
        updateScore(data.name, data.subject, data.score);
        var mes = "Updating(" + data.name + "," + data.subject + "," + data.score + ")";
        res.json({ message: mes, card: data})
    } else {
        saveScore(data.name, data.subject, data.score);
        var mes = "Adding(" + data.name + "," + data.subject + "," + data.score + ")";
        res.json({ message: mes, card: data})
    }
    // const data = req.body;
    // var mes = saveScore(data.name, data.subject, data.score);
    // console.log("h3", mes)
    // res.json({ message: mes, card: data});
});
router.get("/cards", async (req, res) => {
    // console.log("hi", req.query);
    if(req.query.type === 'name'){
        var search = [];
        ScoreCard.find( {name: req.query.queryString} ).exec(function(err, items) {
            if(err) throw err;
            var length = items.length;
            //console.log(items.length);
            if(length != 0) {
                for(var i = 0; i < length; i++) {
                    search[i] = "Found card with name: (" + items[i].name + "," + items[i].subject + "," + items[i].score + ")";
                }
               //console.log(search)
               res.json({messages: search, message: ""})
            } else {
               res.json({messages: "" , message: "Name ("+ req.query.queryString+ ") not found!"});
            }
        });
    } else if(req.query.type === 'subject') {
        var search = [];
        ScoreCard.find( {subject: req.query.queryString} ).exec(function(err, items) {
            if(err) throw err;
            var length = items.length;
            //console.log(items.length);
            if(length != 0) {
                for(var i = 0; i < length; i++) {
                    search[i] = "Found card with subject: (" + items[i].name + "," + items[i].subject + "," + items[i].score + ")";
                }
               //console.log(search)
               res.json({messages: search, message: ""})
            } else {
               res.json({messages: "" , message: "Subject ("+ req.query.queryString+ ") not found!"});
            }
        });
    }
});

const exist = async (name, subject) => {
    const existing = await ScoreCard.findOne({ name: name, subject: subject });
    //console.log(existing)
    if(existing === null){
        return false
    } else {
        return true
    }
}

const saveScore = async (name, subject, score) => {
    try {
        const newCard = new ScoreCard({ name, subject, score });
        console.log("Create card", newCard);
        return newCard.save();
    } catch (e) { throw new Error("Card creation error: " + e); }
};

const updateScore = async (name, subject, score) => {
    try {
        ScoreCard.updateOne({name: name, subject: subject} , {$set: {score: score}}, function(err, res) {
            if (err) throw err;
            console.log("Update card");
        }) 
    } catch (e) { throw new Error("Card update error: " + e); }
};


const deleteDB = async () => {
    try {
        await ScoreCard.deleteMany({});
        console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
};

export default router;
