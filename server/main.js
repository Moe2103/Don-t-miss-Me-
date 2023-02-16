// Important neccesary stuff to create a simple HTTP server
import express from "express";
import { createBvgHafas } from "bvg-hafas";

const client = createBvgHafas("my-awesome-program");

// Create a new express application instance listening on port 3000.
const app = express();

// Create new route called /route.
// This route will have a JSON object that has 'from' and 'to' properties.
app.get("/api/route", async (req, res) => {
    // Read the 'from' and 'to' properties from the query string.
    const from = req.query.from;
    console.log(from);
    // Wait for fetch to finish and then send the result to the client.
    try {
        const ans = await client.departures(from);
        res.json(ans);
    } catch (error) {
        console.log(error);
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
