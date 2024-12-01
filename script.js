// Welcome to the most democratic piece of code you'll ever meet!
document.addEventListener('DOMContentLoaded', () => {
    // Gathering our democratic tools (no electoral college needed)
    const topicInput = document.getElementById('topicInput');
    const optionInput = document.getElementById('optionInput');
    const addOptionBtn = document.getElementById('addOptionBtn');
    const optionsList = document.getElementById('optionsList');
    const resetBtn = document.getElementById('resetBtn');
    const ctx = document.getElementById('voteChart').getContext('2d');

    // Where we keep track of our contestants (may the odds be ever in their favor)
    let options = [];
    let chart = null;

    // Creating our pie chart (because who doesn't love pie?)
    function initChart() {
        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    // Our fabulous color palette (because voting should be colorful)
                    backgroundColor: [
                        '#FF6384', // Hot pink for hot takes
                        '#36A2EB', // Cool blue for cool ideas
                        '#FFCE56', // Sunny yellow for bright thoughts
                        '#4BC0C0', // Turquoise for tropical vibes
                        '#9966FF', // Purple for royal opinions
                        '#FF9F40', // Orange for zesty suggestions
                        '#FF6384', // Back to pink (we ran out of colors!)
                        '#36A2EB', // Blue again (déjà vu?)
                        '#FFCE56', // Yellow returns (encore!)
                        '#4BC0C0'  // Turquoise: "Am I a joke to you?"
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    // The crown jewel of our chart
                    title: {
                        display: true,
                        text: 'Voting Results',
                        font: { size: 20 }
                    },
                    // The legend says... well, it says what everything means
                    legend: {
                        position: 'bottom'
                    },
                    // Hover effects that make data stalking fun
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.formattedValue;
                                return `${label}: ${value} votes`;
                            }
                        }
                    },
                    // Labels that make our pie chart look like it went to design school
                    datalabels: {
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 14
                        },
                        formatter: (value, ctx) => {
                            const label = ctx.chart.data.labels[ctx.dataIndex];
                            return `${label}\n${value} votes`;
                        },
                        anchor: 'center',
                        align: 'center',
                        offset: 0
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    }

    // Keeping our chart fresh and up-to-date (like your social media feed)
    function updateChart() {
        const labels = options.map(opt => opt.text);
        const data = options.map(opt => opt.votes);
        
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.options.plugins.title.text = topicInput.value || 'Voting Results';
        chart.update();
    }

    // Adding a new contestant to our democracy party
    function addOption(text) {
        if (!text) return; // No empty promises allowed!

        const option = {
            id: Date.now(),
            text: text,
            votes: 0 // Starting from zero (just like my bank account)
        };

        options.push(option);
        renderOptions();
        updateChart();
        optionInput.value = '';
    }

    // Putting on a show with our voting options
    function renderOptions() {
        optionsList.innerHTML = '';
        options.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'option-item';
            optionEl.innerHTML = `
                <span class="option-text">${option.text}</span>
                <span class="vote-count">${option.votes} votes</span>
                <div class="option-controls">
                    <button class="btn vote" onclick="vote(${option.id})">Vote </button>
                    <button class="btn delete" onclick="deleteOption(${option.id})">Delete </button>
                </div>
            `;
            optionsList.appendChild(optionEl);
        });
    }

    // The moment of truth - casting your vote!
    window.vote = function(id) {
        const option = options.find(opt => opt.id === id);
        if (option) {
            option.votes++; // Democracy in action!
            renderOptions();
            updateChart();
        }
    };

    // When an option gets voted off the island
    window.deleteOption = function(id) {
        options = options.filter(opt => opt.id !== id);
        renderOptions();
        updateChart();
    };

    // The "start fresh" button (like clearing your browser history)
    function resetVotes() {
        options.forEach(opt => opt.votes = 0);
        renderOptions();
        updateChart();
    }

    // Listening for democracy in action
    addOptionBtn.addEventListener('click', () => {
        addOption(optionInput.value.trim());
    });

    // For the keyboard warriors out there
    optionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addOption(optionInput.value.trim());
        }
    });

    // When the topic changes (plot twist!)
    topicInput.addEventListener('input', () => {
        updateChart();
    });

    // Reset button: because sometimes we all need a do-over
    resetBtn.addEventListener('click', resetVotes);

    // Let the voting begin!
    initChart();
});
