document.addEventListener('DOMContentLoaded', function() {
   const distributionData = [
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/c28f3b1a-1396-4f24-aec7-f289695e5695.image.png?v=1724335556235", rank: "Champion", divisions: ["1400", "INF"] },
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/07082c63-cce6-4ff1-bff3-c3fceedf2e54.image.png?v=1724335508559", rank: "Diamond III", divisions: ["1300", "1399"] },
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/76c9b43e-d0f6-4b05-9f32-7243d522c5f1.image.png?v=1724335504082", rank: "Diamond II", divisions: ["1200", "1299"] },
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/db671aad-2dd6-4328-897f-3f259be82fc5.image.png?v=1724335489836", rank: "Diamond I", divisions: ["1125", "1199"] },
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/d3a3b2fc-6fcf-4bdc-85cc-8da4f40b2993.image.png?v=1724334914955", rank: "Gold III", divisions: ["1050", "1124"] },
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/a0dedb5b-6bc3-4322-afbb-77cc07184fec.image.png?v=1724334909730", rank: "Gold II", divisions: ["975", "1049"] },
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/df499a57-8fc0-4524-bdd0-2fae76ec9301.image.png?v=1724334902060", rank: "Gold I", divisions: ["900", "974"] },
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/faa8edc7-b482-4cc4-b5b0-ceed84627079.image.png?v=1724334871163", rank: "Silver III", divisions: ["825", "899"] },
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/6caddf21-bee3-46c3-9d27-05823806cb67.image.png?v=1724334861872", rank: "Silver II", divisions: ["750", "824"] },
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/28b40287-5562-45ab-a236-5647e96f1d48.image.png?v=1724334852235", rank: "Silver I", divisions: ["675", "749"] },
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/a274e890-4257-4cd9-a02a-56bc80be47d3.image.png?v=1724334816902", rank: "Bronze III", divisions: ["600", "674"] },
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/9965effe-4989-4504-9200-7f04b6b665a2.image.png?v=1724334793116", rank: "Bronze II", divisions: ["500", "599"] },
    { icon: "https://cdn.glitch.global/c16ac13c-9db1-4fbb-a599-4c729f45d485/939597fb-c29f-4607-9a76-9a6c5f1edf48.image.png?v=1724334781837", rank: "Bronze I", divisions: ["0", "499"] }
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
 // Function to update the page title based on the active tab
    function updatePageTitle(tabName) {
        const tabTitleMap = {
            'home': 'Home',
            'leaderboards': 'Leaderboards',
            'ranks': 'Ranks',
            'support': 'Support',
            'tournaments': 'Tournaments'
        };

        const tabTitle = tabTitleMap[tabName] || 'Blade League Tracker';
        document.title = `Blade League Tracker | ${tabTitle}`;
    }
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

        // Update the page title
        updatePageTitle(tabName);

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

document.addEventListener('DOMContentLoaded', function () {
    const leaderboardTypeSelect = document.getElementById('leaderboard-type-select');
    const leaderboardUrls = {
        '1v1': 'https://api.neatqueue.com/api/leaderboard/1220373185397264425/1344081250125742173',
        '2v2': 'https://api.neatqueue.com/api/leaderboard/1220373185397264425/1344081252025892904',
        '3v3': 'https://api.neatqueue.com/api/leaderboard/1220373185397264425/1344089470672044092'
    };

    async function fetchLeaderboard(url, listId, type) {
    const loadingSpinner = document.getElementById('loading');
    const list = document.getElementById(listId);

    // Show loading spinner
    loadingSpinner.style.display = 'flex';
    list.innerHTML = ''; // Clear the list before appending new data

    try {
        const response = await fetch(url, {
            headers: { 'accept': 'application/json' }
        });
        const data = await response.json();

        if (data.alltime && Array.isArray(data.alltime)) {
            let sortedData;
            if (type === 'ranked') {
                sortedData = data.alltime.sort((a, b) => b.data.mmr - a.data.mmr);
            } else if (type === 'all-time') {
                sortedData = data.alltime.sort((a, b) => b.data.wins - a.data.wins);
            }

            // Clear the list before appending new data
            list.innerHTML = '';

            sortedData.forEach((entry, index) => {
                const listItem = document.createElement('li');
                if (type === 'ranked') {
                    listItem.innerHTML = `
                        <span>${index + 1}. ${entry.name}</span>
                        <span>${Math.round(entry.data.mmr)} ELO</span>
                    `;
                } else if (type === 'all-time') {
                    listItem.innerHTML = `
                        <span>${index + 1}. ${entry.name}</span>
                        <span>Losses: ${entry.data.losses}</span>
                        <span>Wins: ${entry.data.wins}</span>
                    `;
                }

                // Apply different colors for top 3
                if (index === 0) {
                    listItem.querySelector('span').style.color = '#FFD700'; // Gold for #1
                } else if (index === 1) {
                    listItem.querySelector('span').style.color = '#C0C0C0'; // Silver for #2
                } else if (index === 2) {
                    listItem.querySelector('span').style.color = '#CD7F32'; // Bronze for #3
                }

                list.appendChild(listItem);
            });
        } else {
            list.textContent = 'No leaderboard data available';
        }
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        list.textContent = 'Failed to load leaderboard';
    } finally {
        // Hide loading spinner
        loadingSpinner.style.display = 'none';
    }
}

    // Function to update all leaderboards
    function updateAllLeaderboards() {
        const leaderboardType = leaderboardTypeSelect.value;
        fetchLeaderboard(leaderboardUrls['1v1'], 'leaderboard-list-1v1', leaderboardType);
        fetchLeaderboard(leaderboardUrls['2v2'], 'leaderboard-list-2v2', leaderboardType);
        fetchLeaderboard(leaderboardUrls['3v3'], 'leaderboard-list-3v3', leaderboardType);
    }

    // Function to calculate the next update time
    function getNextUpdateTime() {
        const now = new Date();
        const minutes = now.getMinutes();
        const nextUpdate = new Date(now);

        if (minutes < 15) {
            nextUpdate.setMinutes(15);
        } else if (minutes < 30) {
            nextUpdate.setMinutes(30);
        } else if (minutes < 45) {
            nextUpdate.setMinutes(45);
        } else {
            nextUpdate.setHours(now.getHours() + 1);
            nextUpdate.setMinutes(0);
        }

        nextUpdate.setSeconds(0);
        nextUpdate.setMilliseconds(0);
        return nextUpdate;
    }

    function updateCountdown() {
    const now = new Date();
    const nextUpdate = getNextUpdateTime();
    const diff = nextUpdate - now;

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (diff <= 0) {
        updateAllLeaderboards();
        setTimeout(updateCountdown, 1000);
    } else {
        setTimeout(updateCountdown, 1000);
    }
}

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

    // Fetch and update the leaderboard data for the selected tab
    const leaderboardType = document.getElementById('leaderboard-type-select').value;
    const url = leaderboardUrls[targetTab];
    const listId = `leaderboard-list-${targetTab}`;
    fetchLeaderboard(url, listId, leaderboardType);
}

    // Attach event listeners to leaderboard tab buttons
    document.querySelectorAll('.leaderboard-tab-button').forEach(button => {
        button.addEventListener('click', switchLeaderboardTab);
    });

    // Attach event listener to leaderboard type dropdown
    leaderboardTypeSelect.addEventListener('change', updateAllLeaderboards);

    // Update leaderboards immediately on page load
    updateAllLeaderboards();

    // Start the countdown timer
    updateCountdown();

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
async function fetchPlayerStats(userId) {
    const url = `${API_BASE_URL}/${userId}`;
    const headers = {
        accept: "application/json",
        Authorization: "Lq4-Mc-ebhFYxc6kESUYuABmDz99u9fh",
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        return data; // Return full data to extract needed fields
    } catch (error) {
        console.error("Error fetching stats:", error);
        return null;
    }
}

function displayStats(data) {
    statsContainer.innerHTML = ""; // Clear previous stats

    if (!data) {
        statsContainer.innerHTML = "<p>Error fetching data.</p>";
        return;
    }

    // Extract required fields
    const { name, banned, ban_reason, last_match_end, last_winner_vote, queued, mvps, teams, ign, queues } = data;
    const allowedQueues = ["1v1-Solo", "2v2-Duos", "3v3-Trios"];

    // Display player info
    const userInfo = document.createElement("div");
    userInfo.className = "user-info";
    userInfo.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Last Match:</strong> ${new Date(last_match_end * 1000).toLocaleString()}</p>
        <p><strong>MVPs:</strong> ${mvps}</p>
        <p><strong>Teams:</strong> ${teams.length > 0 ? teams.join(", ") : "None"}</p>
    `;
    statsContainer.appendChild(userInfo);

    // Display allowed queue stats
    const queueStatsContainer = document.createElement("div");
    queueStatsContainer.className = "queue-stats";
    allowedQueues.forEach((queue, index) => {
        if (queues[queue]) {
            const queueStats = queues[queue];
            const queueContainer = document.createElement("div");
            queueContainer.className = "queue-container";
            queueContainer.style.animationDelay = `${index * 0.1}s`; // Staggered delay

            queueContainer.innerHTML = `
                <h3>${queue}</h3>
                <p><strong>Rank:</strong> ${Math.ceil(queueStats.rank)}</p>
                <p><strong>ELO:</strong> ${Math.ceil(queueStats.mmr)}</p>
                <p><strong>Wins:</strong> ${Math.ceil(queueStats.wins)}</p>
                <p><strong>Losses:</strong> ${Math.ceil(queueStats.losses)}</p>
                <p><strong>Streak:</strong> ${Math.ceil(queueStats.streak)}</p>
                <p><strong>Total Games:</strong> ${Math.ceil(queueStats.totalgames)}</p>
                <p><strong>Peak ELO:</strong> ${Math.ceil(queueStats.peak_mmr)}</p>
                <p><strong>Peak Streak:</strong> ${Math.ceil(queueStats.peak_streak)}</p>
            `;
            queueStatsContainer.appendChild(queueContainer);
        }
    });
    statsContainer.appendChild(queueStatsContainer);

    statsPopup.style.display = "flex"; // Show the popup
}

async function handleSearch() {
    const userId = userIdInput.value.trim();
    if (!userId) return alert("Please enter a User ID");

    // Disable the button and show loading animation
    searchButton.textContent = "";
    searchButton.classList.add("loading");
    searchButton.disabled = true;

    try {
        const stats = await fetchPlayerStats(userId);
        if (stats) {
            displayStats(stats);
        } else {
            alert("No stats found for this user.");
        }
    } catch (error) {
        console.error("Error fetching stats:", error);
        alert("Failed to fetch stats. Please try again.");
    } finally {
        // Re-enable the button and revert to "Search"
        searchButton.textContent = "Search";
        searchButton.classList.remove("loading");
        searchButton.disabled = false;
    }
}

// Event listeners
searchButton.addEventListener("click", handleSearch);
userIdInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
});

closePopup.addEventListener("click", () => {
    statsPopup.style.display = "none";
});

// Tab Switching on Card Click
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function () {
        const tabName = card.getAttribute('data-tab');
        const tabLink = document.querySelector(`.nav-tab[data-tab="${tabName}"]`);
        if (tabLink) {
            tabLink.click(); // Simulate a click on the corresponding nav tab
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // FAQ Button Hover Effect
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.querySelector('.arrow').style.right = '10px';
            button.querySelector('.arrow').style.opacity = '1';
        });

        button.addEventListener('mouseleave', () => {
            button.querySelector('.arrow').style.right = '-20px';
            button.querySelector('.arrow').style.opacity = '0';
        });

        // Handle button click for redirection
        button.addEventListener('click', () => {
            const articleId = button.getAttribute('data-article-id');
            window.location.href = `support/${articleId}.html`; // Redirect to the specific article page
        });
    });
});
  document.addEventListener('DOMContentLoaded', function () {
    const mmrRanges = [
    { min: 0, max: 499, label: 'Bronze I [0-499]' },
    { min: 500, max: 599, label: 'Bronze II [500-599]' },
    { min: 600, max: 674, label: 'Bronze III [600-674]' },
    { min: 675, max: 749, label: 'Silver I [675-749]' },
    { min: 750, max: 824, label: 'Silver II [750-824]' },
    { min: 825, max: 899, label: 'Silver III [825-899]' },
    { min: 900, max: 974, label: 'Gold I [900-974]' },
    { min: 975, max: 1049, label: 'Gold II [975-1049]' },
    { min: 1050, max: 1124, label: 'Gold III [1050-1124]' },
    { min: 1125, max: 1199, label: 'Diamond I [1125-1199]' },
    { min: 1200, max: 1299, label: 'Diamond II [1200-1299]' },
    { min: 1300, max: 1399, label: 'Diamond III [1300-1399]' },
    { min: 1400, max: Infinity, label: 'Champion [1400+]' }
];


    const queueUrls = {
        '1v1': 'https://api.neatqueue.com/api/leaderboard/1220373185397264425/1344081250125742173',
        '2v2': 'https://api.neatqueue.com/api/leaderboard/1220373185397264425/1344081252025892904',
        '3v3': 'https://api.neatqueue.com/api/leaderboard/1220373185397264425/1344089470672044092'
    };

    const ctx = document.getElementById('mmrDistributionChart').getContext('2d');
    let mmrDistributionChart;

    async function fetchLeaderboardData(url) {
        try {
            const response = await fetch(url, { headers: { 'accept': 'application/json' } });
            const data = await response.json();
            return data.alltime || [];
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            return [];
        }
    }

    function countPlayersInRanges(players, ranges) {
        const counts = new Array(ranges.length).fill(0);
        players.forEach(player => {
            const mmr = player.data.mmr;
            for (let i = 0; i < ranges.length; i++) {
                if (mmr >= ranges[i].min && mmr <= ranges[i].max) {
                    counts[i]++;
                    break;
                }
            }
        });
        return counts;
    }

    async function updateChart(queue) {
        const players = await fetchLeaderboardData(queueUrls[queue]);
        const counts = countPlayersInRanges(players, mmrRanges);

        if (mmrDistributionChart) {
            mmrDistributionChart.destroy();
        }

        mmrDistributionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: mmrRanges.map(range => range.label),
                datasets: [{
                    label: `Number of Players (${queue})`,
                    data: counts,
                    backgroundColor: 'rgba(254, 88, 92, 0.6)',
                    borderColor: 'rgba(254, 88, 92, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Players'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'ELO Range'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    }

    // Add event listener to the dropdown menu
    document.getElementById('queue-select').addEventListener('change', function () {
        const selectedQueue = this.value;
        updateChart(selectedQueue);
    });

    // Initialize the chart with the default queue (1v1)
    updateChart('1v1');
});
  function startRealTimeUpdates(interval = 15000) {
    setInterval(() => {
        updateAllLeaderboards();
    }, interval);
}

// Start real-time updates every 15 seconds
startRealTimeUpdates();
// Fetch data for all leaderboards
fetchLeaderboard('https://api.neatqueue.com/api/leaderboard/1220373185397264425/1344081250125742173', 'leaderboard-list-1v1'); // 1v1
fetchLeaderboard('https://api.neatqueue.com/api/leaderboard/1220373185397264425/1344081252025892904', 'leaderboard-list-2v2'); // 2v2
fetchLeaderboard('https://api.neatqueue.com/api/leaderboard/1220373185397264425/1344089470672044092', 'leaderboard-list-3v3'); // 3v3

fetchLeaderboard();
  updateAllLeaderboards();
    updateCountdown();
    startRealTimeUpdates();
