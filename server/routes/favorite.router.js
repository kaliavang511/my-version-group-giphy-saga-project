const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')


// return all favorite images
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM "favorite" ORDER BY "id"`;
    pool.query(sqlText).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})





// add a new favorite


// router.get('/search', async (req, res) => {
//   try {
//     const searchQuery = req.query.q || 'funny+cat';
//     const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
//       params: {
//         api_key: process.env.GIPHY_API_KEY,
//         q: searchQuery
//       }
//     });
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error('Error fetching GIFs from Giphy:', error.message);
//     res.status(500).json({ error: 'Failed to fetch GIFs from Giphy' });
//   }
// });

// favorite.router.js
router.get('/search', (req, res) => {
    const searchQuery = req.query.q || 'funny+cat';
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchQuery}`)
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((error) => {
            console.error('Error fetching GIFs from Giphy:', error);
            res.status(500).json({ error: 'Failed to fetch GIFs from Giphy' }); // Return detailed error response
        });
});

module.exports = router;





