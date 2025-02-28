document.addEventListener('DOMContentLoaded', function() {
    const distributionData = [
        { icon: 'https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/21405196-dbc9-4527-91e7-9a41abc6a698.image.png?v=1724335671471', rank: "Rank Placeholder", divisions: ["1,000", "INF"] },
      { icon: 'https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/21405196-dbc9-4527-91e7-9a41abc6a698.image.png?v=1724335671471', rank: "Rank Placeholder", divisions: ["865", "999"] },
    ];

    const tableBody = document.querySelector('#distribution-table tbody');
    distributionData.forEach(row => {
        const tr = document.createElement('tr');
        const iconTd = document.createElement('td');
        const rankTd = document.createElement('td');
        const divisionsTd = document.createElement('td');

        const img = document.createElement('img');
        img.src = row.icon;
        img.alt = `${row.rank} icon`;
        img.className = 'rank-icon';

        iconTd.appendChild(img);
        rankTd.textContent = row.rank;
        divisionsTd.textContent = `${row.divisions[0]} — ${row.divisions[1]}`;
  

        tr.appendChild(iconTd);
        tr.appendChild(rankTd);
        tr.appendChild(divisionsTd);

        tableBody.appendChild(tr);
    });

    // Function to handle tab switching
    function openTab(event, tabName) {
        const tabContents = document.querySelectorAll('.tab-content');
        const navTabs = document.querySelectorAll('.nav-tab');

        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        navTabs.forEach(tab => {
            tab.classList.remove('active');
        });

        document.getElementById(tabName).classList.add('active');
        event.currentTarget.classList.add('active');

        // Show the first sub-tab by default
        const firstSubTab = document.querySelector(`#${tabName} .tab-button`);
        if (firstSubTab) {
            firstSubTab.click();
        }
    }

    // Function to handle sub-tab switching
    function openSubTab(event, subTabName) {
        const subTabContents = event.currentTarget.closest('.tab-content').querySelectorAll('.sub-tab-content');
        const tabButtons = event.currentTarget.closest('.tabs').querySelectorAll('.tab-button');

        subTabContents.forEach(content => {
            content.classList.remove('active');
        });

        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        document.getElementById(subTabName).classList.add('active');
        event.currentTarget.classList.add('active');
    }

    // Attach event listeners to navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            openTab(event, tab.getAttribute('data-tab'));
        });
    });

    // Attach event listeners to sub-tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function(event) {
            openSubTab(event, button.getAttribute('onclick').match(/'([^']+)'/)[1]);
        });
    });

    // Default to showing the first tab content
    openTab({ currentTarget: document.querySelector('.nav-tab') }, 'home');
});

async function fetchLeaderboard(url, listId) {
    try {
        const response = await fetch(url, {
            headers: { 'accept': 'application/json' }
        });
        const data = await response.json();
        
        const list = document.getElementById(listId);
        list.innerHTML = '';
        
        if (data.alltime && Array.isArray(data.alltime)) {
            const sortedData = data.alltime.sort((a, b) => b.data.mmr - a.data.mmr);
            sortedData.forEach((entry, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${index + 1}. ${entry.name}</span>
                    <span>${Math.round(entry.data.mmr)} MMR</span>
                `;
                list.appendChild(listItem);
            });
        } else {
            list.textContent = 'No leaderboard data available';
        }
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        document.getElementById(listId).textContent = 'Failed to load leaderboard';
    }
}

  document.addEventListener('DOMContentLoaded', function () {
    // Function to switch leaderboard tabs
    function switchLeaderboardTab(event) {
        const tabButtons = document.querySelectorAll('.leaderboard-tab-button');
        const tabContents = document.querySelectorAll('.leaderboard-content');

        // Remove active class from all buttons and content
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to the clicked button and corresponding content
        const targetTab = event.currentTarget.getAttribute('data-leaderboard');
        event.currentTarget.classList.add('active');
        document.getElementById(`leaderboard-${targetTab}`).classList.add('active');
    }

    // Attach event listeners to leaderboard tab buttons
    document.querySelectorAll('.leaderboard-tab-button').forEach(button => {
        button.addEventListener('click', switchLeaderboardTab);
    });

    // Default to showing the 1v1 leaderboard
    document.querySelector('.leaderboard-tab-button[data-leaderboard="1v1"]').click();
});


  document.addEventListener('DOMContentLoaded', function () {
    // Function to switch leaderboard tabs
    function switchLeaderboardTab(event) {
        const tabButtons = document.querySelectorAll('.leaderboard-tab-button');
        const tabContents = document.querySelectorAll('.leaderboard-content');

        // Remove active class from all buttons and content
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to the clicked button and corresponding content
        const targetTab = event.currentTarget.getAttribute('data-leaderboard');
        event.currentTarget.classList.add('active');
        document.getElementById(`leaderboard-${targetTab}`).classList.add('active');
    }

    // Attach event listeners to leaderboard tab buttons
    document.querySelectorAll('.leaderboard-tab-button').forEach(button => {
        button.addEventListener('click', switchLeaderboardTab);
    });

    // Default to showing the 1v1 leaderboard
    document.querySelector('.leaderboard-tab-button[data-leaderboard="1v1"]').click();
});
// API base URL
const API_BASE_URL = "https://api.neatqueue.com/api/playerstats/1220373185397264425";

// DOM elements
const userIdInput = document.getElementById("userIdInput");
const searchButton = document.getElementById("searchButton");
const statsPopup = document.getElementById("statsPopup");
const statsContainer = document.getElementById("statsContainer");
const closePopup = document.querySelector(".close");

// Fetch player stats
async function fetchPlayerStats(userId, queue) {
  const url = `${API_BASE_URL}/${userId}/${queue}`;
  const headers = {
    accept: "application/json",
    Authorization: "8n8twaWcZ_SHV3oJor_jgY1SJmfIdP9e",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error("Failed to fetch stats");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
}

// Display stats in the popup
function displayStats(stats) {
  statsContainer.innerHTML = ""; // Clear previous stats

  const queues = ["1v1-Solo", "2v2-Duos", "3v3-Trios"];
  queues.forEach((queue) => {
    const queueStats = stats[queue];
    if (queueStats) {
      const queueContainer = document.createElement("div");
      queueContainer.className = "queue-container";

      queueContainer.innerHTML = `
        <h3>${queue}</h3>
        <p><strong>MMR:</strong> ${Math.ceil(queueStats.mmr)}</p>
        <p><strong>Wins:</strong> ${Math.ceil(queueStats.wins)}</p>
        <p><strong>Losses:</strong> ${Math.ceil(queueStats.losses)}</p>
        <p><strong>Streak:</strong> ${Math.ceil(queueStats.streak)}</p>
        <p><strong>Total Games:</strong> ${Math.ceil(queueStats.totalgames)}</p>
        <p><strong>Peak MMR:</strong> ${Math.ceil(queueStats.peak_mmr)}</p>
        <p><strong>Peak Streak:</strong> ${Math.ceil(queueStats.peak_streak)}</p>
      `;

      statsContainer.appendChild(queueContainer);
    }
  });

  statsPopup.style.display = "flex"; // Show the popup
}

// Handle search button click or Enter key press
async function handleSearch() {
  const userId = userIdInput.value.trim();
  if (!userId) return alert("Please enter a User ID");

  const stats = {};
  const queues = ["1v1-Solo", "2v2-Duos", "3v3-Trios"];

  for (const queue of queues) {
    const queueStats = await fetchPlayerStats(userId, queue);
    if (queueStats) stats[queue] = queueStats;
  }

  displayStats(stats);
}

// Event listeners
searchButton.addEventListener("click", handleSearch);
userIdInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});
closePopup.addEventListener("click", () => {
  statsPopup.style.display = "none";
});
  document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            const tabName = card.getAttribute('data-tab');
            const tabLink = document.querySelector(`.nav-tab[data-tab="${tabName}"]`);
            if (tabLink) {
                tabLink.click(); // Simulate a click on the corresponding nav tab
            }
        });
    });

// Fetch data for all leaderboards
fetchLeaderboard('https://api.neatqueue.com/api/leaderboard/1220373185397264425/1344081250125742173', 'leaderboard-list-1v1'); // 1v1
fetchLeaderboard('https://api.neatqueue.com/api/leaderboard/1220373185397264425/1344081252025892904', 'leaderboard-list-2v2'); // 2v2
fetchLeaderboard('https://api.neatqueue.com/api/leaderboard/1220373185397264425/1344089470672044092', 'leaderboard-list-3v3'); // 3v3

fetchLeaderboard();
