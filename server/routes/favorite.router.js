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


router.post('/', (req, res) => {
    const { giphy, category_id } = req.body;
    const sqlText = `INSERT INTO "favorites" ("giphy", "category_id") VALUES ($1, $2)`;
    pool.query(sqlText, [giphy, category_id])
      .then(() => res.sendStatus(201))
      .catch(err => {
        console.error('Error adding favorite image to database', err);
        res.sendStatus(500);
      });
  });
  
  // PUT to update category of a favorite image
  router.put('/:id', (req, res) => {
    const { category_id } = req.body;
    const favoriteId = req.params.id;
    const sqlText = `UPDATE "favorites" SET "category_id" = $1 WHERE "id" = $2`;
    pool.query(sqlText, [category_id, favoriteId])
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.error('Error updating favorite image category', err);
        res.sendStatus(500);
      });
  });

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


router.get('/search', (req, res) => {
    const searchQuery = req.query.q || 'funny+cat';
    axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        q: searchQuery
      }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error => {
      console.error('Error fetching GIFs from Giphy:', error.message);
      res.status(500).json({ error: 'Failed to fetch GIFs from Giphy' });
    });
  });

module.exports = router;





