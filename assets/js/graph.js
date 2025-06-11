const ctx = document.getElementById('myDonutChart').getContext('2d');

const data = {
    labels: ['Yellow', 'Orange', 'Cyan', 'Olive'],
    datasets: [{
        data: [30, 34, 6, 30], // Percentages corresponding to each label
        backgroundColor: ['#F8C140', '#F58869', '#64C4F7', '#4F45B6'], // Colors for each segment
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'], // Optional border color
        borderWidth: 5
    }]
};

const myDonutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false // Disable default legend
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    }
                }
            }
        },
        onClick: function (evt, item) {
            if (item.length > 0) {
                const index = item[0].index;
                const activeSegment = myDonutChart.getDatasetMeta(0).data[index];

                // Toggle the segment visibility
                activeSegment.hidden = !activeSegment.hidden;
                updateLabelOpacity(index, activeSegment.hidden); // Update label opacity
                myDonutChart.update();
            }
        }
    }
});

// Function to update label opacity based on active/inactive state
function updateLabelOpacity(index, isHidden) {
    const labels = document.querySelectorAll('.donutChart-label'); // Select all chart labels
    if (labels[index]) {
        labels[index].style.opacity = isHidden ? '0.5' : '1'; // Set lower opacity when hidden
    }
}

// Function to make labels dynamic
function updateLabels() {
    const labels = document.querySelectorAll('.label-1, .label-2, .label-3, .label-4');
    labels.forEach((label, index) => {
        const percentageSpan = label.querySelector('.percentage-number');
        percentageSpan.textContent = `${data.datasets[0].data[index]}%`;

        // Add click event to toggle visibility of the chart segments
        label.addEventListener('click', () => {
            const activeSegment = myDonutChart.getDatasetMeta(0).data[index];

            // Toggle the segment visibility
            activeSegment.hidden = !activeSegment.hidden;
            updateLabelOpacity(index, activeSegment.hidden); // Update label opacity
            myDonutChart.update();
        });

        // Set initial opacity based on the segment state
        updateLabelOpacity(index, myDonutChart.getDatasetMeta(0).data[index].hidden);
    });
}

// Update the labels dynamically based on the chart data
updateLabels();



// Second Chart Script
const ctx2 = document.getElementById('myDonutChart2').getContext('2d');

const data2 = {
    labels: ['Yellow', 'Orange', 'Olive'],
    datasets: [{
        data: [30, 50, 20],
        backgroundColor: ['#F8C140', '#F58869', '#4F45B6'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 5
    }]
};

const myDonutChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: data2,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    }
                }
            }
        },
        onClick: function (evt, item) {
            if (item.length > 0) {
                const index = item[0].index;
                const activeSegment = myDonutChart2.getDatasetMeta(0).data[index];

                // Toggle the segment visibility
                activeSegment.hidden = !activeSegment.hidden;
                updateLabelOpacity2(index, activeSegment.hidden); // Update label opacity
                myDonutChart2.update();
            }
        }
    }
});

function updateLabels2() {
    const labels2 = document.querySelectorAll('.label2-1, .label2-2, .label2-3');
    labels2.forEach((label, index) => {
        const percentageSpan2 = label.querySelector('.percentage-number');
        percentageSpan2.textContent = `${data2.datasets[0].data[index]}%`;

        // Add click event to toggle visibility of the chart segments
        label.addEventListener('click', () => {
            const activeSegment = myDonutChart2.getDatasetMeta(0).data[index];

            // Toggle the segment visibility
            activeSegment.hidden = !activeSegment.hidden;
            updateLabelOpacity2(index, activeSegment.hidden); // Update label opacity
            myDonutChart2.update();
        });
    });
}

// Function to update label opacity based on segment visibility
function updateLabelOpacity2(index, hidden) {
    const labels2 = document.querySelectorAll('.label2-1, .label2-2, .label2-3');
    labels2[index].style.opacity = hidden ? '0.5' : '1'; // Set opacity to 0.5 when hidden, otherwise 1
}

// Update the labels dynamically based on the chart data
updateLabels2();


// Month Select Dropdown
const selectedOptionBottom = document.getElementById('selectedOptionBottom');
const optionsContainerBottom = document.getElementById('optionsContainerBottom');
const optionsBottom = document.querySelectorAll('.option-bottom');
const customSelectBottom = document.querySelector('.custom-select-bottom');

// Ensure the default selected option is set in the text span
const selectedTextBottom = selectedOptionBottom.querySelector('.selected-main-content');

selectedOptionBottom.addEventListener('click', () => {
    optionsContainerBottom.style.display =
        optionsContainerBottom.style.display === 'block' ? 'none' : 'block';
    customSelectBottom.classList.toggle('active');
});

optionsBottom.forEach(option => {
    option.addEventListener('click', () => {
        // Get the selected option's inner HTML and update the selected option display
        const optionContent = option.querySelector('.selected-main-content').innerHTML;
        selectedTextBottom.innerHTML = optionContent;

        // Update labels based on the selected value
        const value = option.getAttribute('data-value');
        if (value === 'year') { // Correctly check if the selected value is 'yearly'
            document.getElementById('toggleThisMonth').querySelector('span').textContent = 'This Year';
            document.getElementById('toggleLastMonth').querySelector('span').textContent = 'Last Year';
        } else { // Default to month labels
            document.getElementById('toggleThisMonth').querySelector('span').textContent = 'This Month';
            document.getElementById('toggleLastMonth').querySelector('span').textContent = 'Last Month';
        }

        // Remove 'selected' class from all options and add it to the clicked one
        optionsBottom.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        // Hide the options container and remove the 'active' class
        optionsContainerBottom.style.display = 'none';
        customSelectBottom.classList.remove('active');
    });
});

document.addEventListener('click', function (event) {
    // Close the dropdown if clicked outside
    if (!event.target.closest('.custom-select-bottom')) {
        optionsContainerBottom.style.display = 'none';
        customSelectBottom.classList.remove('active');
    }
});


const ctxMarketActivity = document.getElementById('marketActivityChart').getContext('2d');

const marketActivityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
        {
            label: 'This Month',
            data: [5500, 2800, 3800, 3900, 7800, 5800, 7600, 4000],
            borderColor: '#4F45B6',
            borderWidth: 5,
            fill: false,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 5,
            order: 1,
        },
        {
            label: 'Last Month',
            data: [3800, 2700, 2800, 1400, 6000, 5500, 5600, 3800],
            borderColor: '#F8C140',
            borderWidth: 5,
            fill: false,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 5,
            order: 2,
        }
    ]
};

const marketActivityChart = new Chart(ctxMarketActivity, {
    type: 'line',
    data: marketActivityData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                min: 1000,
                max: 10000,
                ticks: {
                    stepSize: 2000,
                    callback: function (value) {
                        return value >= 1000 ? value / 1000 + 'k' : value;
                    },
                    font: {
                        family: 'Gilroy-Medium ☞',
                        size: 18,
                        style: 'normal',
                        weight: '400'
                    },
                    color: '#101839ad',
                    lineHeight: 34,
                    textTransform: 'capitalize',
                    opacity: 0.2,
                    padding: 10
                },
                grid: {
                    display: false
                },
                border: {
                    display: false
                }
            },
            x: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false, // Disable the default tooltip
                intersect: false, // Tooltip will be shown for any part of the line
                mode: 'index',    // Tooltip will display for the index of the hovered item
                external: function (context) {
                    const { chart, tooltip } = context;
                    let tooltipEl = document.querySelector('.chartjs-tooltip');

                    // Create tooltip element if it doesn't exist
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.classList.add('chartjs-tooltip');
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.pointerEvents = 'none';
                        tooltipEl.style.color = '#fff';
                        tooltipEl.style.borderRadius = '10px';
                        tooltipEl.style.fontFamily = 'Arial, sans-serif';
                        tooltipEl.style.zIndex = 1000;
                        tooltipEl.style.transition = 'top 0.1s ease, left 0.1s ease'; // Added transition
                        document.body.appendChild(tooltipEl);
                    }

                    // Hide tooltip if not visible
                    if (tooltip.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    // Responsive styles for tooltip
                    const screenWidth = window.innerWidth;
                    if (screenWidth > 1024) {
                        tooltipEl.style.fontSize = '20px';
                        tooltipEl.style.padding = '10px 28px';
                    } else if (screenWidth > 768) {
                        tooltipEl.style.fontSize = '16px';
                        tooltipEl.style.padding = '8px 20px';
                    } else {
                        tooltipEl.style.fontSize = '14px';
                        tooltipEl.style.padding = '6px 15px';
                    }

                    // Determine the dataset index for the tooltip
                    const datasetIndex = tooltip.dataPoints[0].datasetIndex;
                    tooltipEl.style.backgroundColor = marketActivityData.datasets[datasetIndex].borderColor;

                    // Tooltip content
                    const tooltipData = tooltip.dataPoints.map(dp => {
                        if (dp.datasetIndex === datasetIndex) {
                            return `<div>${dp.formattedValue}</div>`;
                        }
                        return '';
                    }).join('');
                    tooltipEl.innerHTML = tooltipData;

                    // Tooltip position - Adjusted to align with data point
                    const position = chart.canvas.getBoundingClientRect();
                    let tooltipX = position.left + window.pageXOffset + tooltip.caretX - (tooltipEl.offsetWidth / 2);
                    const tooltipY = position.top + window.pageYOffset + tooltip.caretY - tooltipEl.offsetHeight;

                    // Ensure tooltip stays within the screen bounds
                    const padding = 10;
                    if (tooltipX < padding) {
                        tooltipX = padding;
                    } else if (tooltipX + tooltipEl.offsetWidth > window.innerWidth - padding) {
                        tooltipX = window.innerWidth - tooltipEl.offsetWidth - padding;
                    }

                    tooltipEl.style.left = `${tooltipX}px`;
                    tooltipEl.style.top = `${tooltipY}px`;
                    tooltipEl.style.opacity = 1;
                }
            }
        },
        elements: {
            point: {
                radius: function (context) {
                    return context.active ? 5 : 0;
                }
            }
        }
    },
    plugins: [{
        beforeDatasetsDraw(chart) {
            const chartArea = chart.chartArea;
            const yScale = chart.scales.y;
            const ctx = chart.ctx;

            const yLabels = yScale.ticks.map(tick => tick.value);

            ctx.save();
            ctx.strokeStyle = '#A098AE';
            ctx.lineWidth = 1;
            ctx.setLineDash([6, 6]);

            yLabels.forEach(label => {
                const yPos = yScale.getPixelForValue(label);
                ctx.beginPath();
                ctx.moveTo(chartArea.left, yPos);
                ctx.lineTo(chartArea.right, yPos);
                ctx.stroke();
            });

            ctx.restore();
        }
    },
    {
        id: 'verticalLinePlugin',
        beforeDraw: function (chart) {
            const ctx = chart.ctx;
            const tooltip = chart.tooltip;
            const chartArea = chart.chartArea;

            if (tooltip.opacity === 0) {
                return;
            }

            // Get the position of the tooltip and ensure the line stays within bounds
            const tooltipX = Math.min(Math.max(tooltip.caretX + chartArea.left - chartArea.left, chartArea.left), chartArea.right);
            const tooltipY = tooltip.caretY;

            ctx.save();
            ctx.strokeStyle = marketActivityData.datasets[tooltip.dataPoints[0].datasetIndex].borderColor;
            ctx.lineWidth = 2;
            ctx.setLineDash([0, 0]);
            ctx.beginPath();

            // Adjust the line to only extend from the tooltip's Y position to the bottom of the chart area
            ctx.moveTo(tooltipX, tooltipY); // Start from the tooltip's Y position
            ctx.lineTo(tooltipX, chartArea.bottom); // End at the bottom of the chart area

            ctx.stroke();
            ctx.restore();
        }
    }
    ]
});

// Toggle functionality to show/hide datasets
document.getElementById('toggleThisMonth').addEventListener('click', function () {
    marketActivityChart.data.datasets[0].hidden = !marketActivityChart.data.datasets[0].hidden;
    marketActivityChart.update();
    this.classList.toggle('active');
});

document.getElementById('toggleLastMonth').addEventListener('click', function () {
    marketActivityChart.data.datasets[1].hidden = !marketActivityChart.data.datasets[1].hidden;
    marketActivityChart.update();
    this.classList.toggle('active');
});




// Line Graph 2 JS
// Month Select Dropdown for the second instance
const selectedOptionBottom2 = document.getElementById('selectedOptionBottom-2');
const optionsContainerBottom2 = document.getElementById('optionsContainerBottom-2');
const optionsBottom2 = document.querySelectorAll('.option-bottom-2');
const customSelectBottom2 = document.querySelector('.custom-select-bottom-2');

// Ensure the default selected option is set in the text span
const selectedTextBottom2 = selectedOptionBottom2.querySelector('.selected-main-content-2');

selectedOptionBottom2.addEventListener('click', () => {
    optionsContainerBottom2.style.display =
        optionsContainerBottom2.style.display === 'block' ? 'none' : 'block';
    customSelectBottom2.classList.toggle('active-2');
});

optionsBottom2.forEach(option => {
    option.addEventListener('click', () => {
        // Get the selected option's inner HTML and update the selected option display
        const optionContent2 = option.querySelector('.selected-main-content-2').innerHTML;
        selectedTextBottom2.innerHTML = optionContent2;

        // Update labels based on the selected value
        const value = option.getAttribute('data-value');
        if (value === 'year-2') { // Assuming 'jan-2' is the value for 'Yearly'
            document.getElementById('toggleThisMonth-2').querySelector('span').textContent = 'This Year';
            document.getElementById('toggleLastMonth-2').querySelector('span').textContent = 'Last Year';
        } else { // Default to month labels
            document.getElementById('toggleThisMonth-2').querySelector('span').textContent = 'This Month';
            document.getElementById('toggleLastMonth-2').querySelector('span').textContent = 'Last Month';
        }

        // Remove 'selected-2' class from all options and add it to the clicked one
        optionsBottom2.forEach(opt => opt.classList.remove('selected-2'));
        option.classList.add('selected-2');

        // Hide the options container and remove the 'active-2' class
        optionsContainerBottom2.style.display = 'none';
        customSelectBottom2.classList.remove('active-2');
    });
});

document.addEventListener('click', function (event) {
    // Close the dropdown if clicked outside
    if (!event.target.closest('.custom-select-bottom-2')) {
        optionsContainerBottom2.style.display = 'none';
        customSelectBottom2.classList.remove('active-2');
    }
});

// Line Graph for the second instance
const ctxMarketActivity2 = document.getElementById('marketActivityChart-2').getContext('2d');

// Example data simulating a heartbeat pattern with sharp peaks and valleys
const marketActivityData2 = {
    labels: Array.from({ length: 82 }, (_, i) => i + 1), // Creating 82 data points
    datasets: [
        {
            label: 'This Month',
            data: [5000, 2000, 2500, 6500, 3000, 5700, 2000, null, 7500, 4500, 5200, 5100, 9000, 6000, 8500, 2000, null, 5000, 2000, 2500, 6500, 3000, 5700, 2000,
                null, 7500, 4500, 5200, 5100, 9000, 6000, 8500, 2000, null, 5000, 2000, 2500, 6500, 3000, 5700, 2000, 7500, 4500, 5200, 5100, 9000, 6000, 8500, 2000, null,
                5000, 2000, 2500, 6500, 3000, 5700, 2000, null, 5000, 2000, 2500, 6500, 3000, 5700, 2000, null, 5000, 2000, 2500, 6500, 3000, 5700, 2000, null,
                5000, 2000, 2500, 6500, 3000, 5700, 2000, null
            ], // Repeating pattern to create a sharp effect
            borderColor: '#4F45B6',
            borderWidth: 3,
            fill: false,
            tension: 0, // Set to 0 for sharp lines
            pointRadius: 0,
            pointHoverRadius: 5,
            order: 1,
        },
        {
            label: 'Last Month',
            data: [1800, 1600, 1700, 500, 3500, 1700, 1000, null, 2800, 2600, 2700, 1500, 6500, 1700, 1000, null, 1800, 1600, 1700, 500, 3500, 1700, 1000,
                null, 2800, 2600, 2700, 1500, 6500, 1700, 1000, null, 1800, 1600, 1700, 500, 3500, 1700, 1000, 2800, 2600, 2700, 1500, 6500, 1700, 1000, null,
                1800, 1600, 1700, 500, 3500, 1700, 1000, null, 2800, 2600, 2700, 1500, 6500, 1700, 1000, null, 1800, 1600, 1700, 500, 3500, 1700, 1000,
            ], // Repeating pattern to create a sharp effect
            borderColor: '#F8C140',
            borderWidth: 3,
            fill: false,
            tension: 0, // Set to 0 for sharp lines
            pointRadius: 0,
            pointHoverRadius: 5,
            order: 2,
        }
    ]
};

const marketActivityChart2 = new Chart(ctxMarketActivity2, {
    type: 'line',
    data: marketActivityData2,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                min: 0,
                max: 10000,
                ticks: {
                    stepSize: 2000,
                    callback: function (value) {
                        return value >= 1000 ? value / 1000 + 'k' : value;
                    },
                    font: {
                        family: 'Gilroy-Medium ☞',
                        size: 18,
                        style: 'normal',
                        weight: '400'
                    },
                    color: '#101839ad',
                    lineHeight: 34,
                    textTransform: 'capitalize',
                    opacity: 0.2,
                    padding: 10
                },
                grid: {
                    display: false
                },
                border: {
                    display: false
                }
            },
            x: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false // Disable the tooltip
            }
        },
        elements: {
            point: {
                radius: function (context) {
                    return context.active ? 5 : 0;
                }
            }
        }
    },
    plugins: [{
        beforeDatasetsDraw(chart) {
            const chartArea2 = chart.chartArea;
            const yScale2 = chart.scales.y;
            const ctx2 = chart.ctx;

            const yLabels2 = yScale2.ticks.map(tick => tick.value);

            ctx2.save();
            ctx2.strokeStyle = '#A098AE';
            ctx2.lineWidth = 1;
            ctx2.setLineDash([6, 6]);

            yLabels2.forEach(label => {
                const yPos2 = yScale2.getPixelForValue(label);
                ctx2.beginPath();
                ctx2.moveTo(chartArea2.left, yPos2);
                ctx2.lineTo(chartArea2.right, yPos2);
                ctx2.stroke();
            });

            ctx2.restore();
        }
    }]
});

// Toggle functionality to show/hide datasets
document.getElementById('toggleThisMonth-2').addEventListener('click', function () {
    marketActivityChart2.data.datasets[0].hidden = !marketActivityChart2.data.datasets[0].hidden;
    marketActivityChart2.update();
    this.classList.toggle('active-2');
});

document.getElementById('toggleLastMonth-2').addEventListener('click', function () {
    marketActivityChart2.data.datasets[1].hidden = !marketActivityChart2.data.datasets[1].hidden;
    marketActivityChart2.update();
    this.classList.toggle('active-2');
});

