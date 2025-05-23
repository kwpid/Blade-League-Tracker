const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Search endpoint for Roblox usernames
app.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  try {
    // First, get the user ID from username
    const userResponse = await axios.get(`https://users.roblox.com/v1/users/search?keyword=${query}&limit=10`);
    
    if (!userResponse.data.data || userResponse.data.data.length === 0) {
      return res.json([]);
    }

    // Get detailed info for each user
    const results = await Promise.all(userResponse.data.data.map(async (user) => {
      try {
        // Get user's presence
        const presenceResponse = await axios.get(`https://presence.roblox.com/v1/presence/users`, {
          data: { userIds: [user.id] }
        });

        // Get user's thumbnail
        const thumbnailResponse = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png&isCircular=false`);

        return {
          username: user.name,
          displayName: user.displayName,
          id: user.id,
          isOnline: presenceResponse.data.userPresences[0]?.userPresenceType === "Online",
          thumbnail: thumbnailResponse.data.data[0]?.imageUrl || null
        };
      } catch (err) {
        console.error('Error fetching user details:', err);
        return {
          username: user.name,
          displayName: user.displayName,
          id: user.id,
          isOnline: false,
          thumbnail: null
        };
      }
    }));

    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Get player stats from Roblox
app.get('/getstats', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Missing username' });

  try {
    // First get the user ID
    const userResponse = await axios.get(`https://users.roblox.com/v1/users/search?keyword=${username}&limit=1`);
    
    if (!userResponse.data.data || userResponse.data.data.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const userId = userResponse.data.data[0].id;

    // Get user's presence
    const presenceResponse = await axios.get(`https://presence.roblox.com/v1/presence/users`, {
      data: { userIds: [userId] }
    });

    // Get user's thumbnail
    const thumbnailResponse = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`);

    // Get user's game stats (this would need to be implemented based on your game's data structure)
    // For now, we'll return basic user info
    const stats = {
      username: userResponse.data.data[0].name,
      displayName: userResponse.data.data[0].displayName,
      id: userId,
      isOnline: presenceResponse.data.userPresences[0]?.userPresenceType === "Online",
      thumbnail: thumbnailResponse.data.data[0]?.imageUrl || null,
      stats: {
        // These would be populated from your game's data
        Wins: 0,
        Losses: 0,
        CurrentStreak: 0,
        HighestStreak: 0,
        ELO_1v1: 1000,
        ELO_2v2: 1000,
        ELO_3v3: 1000,
        ELO_4v4: 1000
      }
    };

    res.json(stats);
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`)); 