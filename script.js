const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//object that store values of min and max angle for a value
const rotationValues = [
    { minDegree: 0,     maxDegree: 15,  value: 'đi studydate'},
    { minDegree: 16,    maxDegree: 45,  value: 'đi ngủ'},
    { minDegree: 46,    maxDegree: 75,  value: 'đi chơi bowling'},
    { minDegree: 76,    maxDegree: 105, value: 'đi thủy cung'},
    { minDegree: 106,   maxDegree: 135, value: 'đi amusement park'},
    { minDegree: 136,   maxDegree: 165, value: 'ăn Hey Pelo Taco'},
    { minDegree: 166,   maxDegree: 195, value: 'đi date ở AEON Mall'},
    { minDegree: 196,   maxDegree: 225, value: 'đi ăn Bingsu'},
    { minDegree: 226,   maxDegree: 255, value: 'xem phim'},
    { minDegree: 256,   maxDegree: 285, value: 'đi hồ Gươm ăn kem Tràng Tiền'},
    { minDegree: 286,   maxDegree: 315, value: 'chơi đất nặn'},
    { minDegree: 316,   maxDegree: 345, value: 'đi lượn hồ Tây'},
    { minDegree: 346,   maxDegree: 460,  value: 'đi studydate'},
];
//size of each piece
const data = [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16];

//background color for each piece
var pieColors = [
    "#8b35bc", 
    "#b163da",
    "#8b35bc", 
    "#b163da",
    "#8b35bc", 
    "#b163da",
    "#8b35bc", 
    "#b163da",
    "#8b35bc",
    "#b163da",
    "#8b35bc",  
    "#b163da"];

//Create chart
let myChart = new Chart(wheel, {
    //Plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    //Chart Type Pie
    type: "pie",
    data: {
      //Labels(values which are to be displayed on chart)
      labels: [ '🍿','🎳','🛌', '📚', '🚤','🏺', '🍦','🍧', '🍣', '🌮', '🎯', '🦦'],

      //Settings for dataset/pie
      datasets: [
        {
          backgroundColor: pieColors,
          data: data,
        },
      ],
    },
    options: {
      //Responsive chart
      responsive: true,
      animation: { duration: 0 },
      plugins: {
        //hide tooltip and legend
        tooltip: false,
        legend: {
          display: false,
        },
        //display labels inside pie chart
        datalabels: {
          color: "#ffffff",
          formatter: (_, context) => context.chart.data.labels[context.dataIndex],
          font: { size: 24 },
        },
      },
    },
  });


//display value based on the randomAngle
const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
      //if the angleValue is between min and max then display it
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        finalValue.innerHTML = `<p>Em chọn ${i.value} cùng Andrew</p>`;
        spinBtn.disabled = false;
        break;
      }
    }
  };



//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>hehehehehehe</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => { //Set rotation for piechart
    
    /* Initially to make the piechart rotate faster we set resultValue to 101 so it rotates
    101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation
    we rotate by 1 degree at a time.*/

    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});