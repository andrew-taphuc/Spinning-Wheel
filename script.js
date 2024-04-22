const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const angleValueDisplay = document.getElementById("angle-value");
const angleValueDisplay2 = document.getElementById("angle-value2");


//Store min max angle of a value
const rotationValues = [
    { minDegree: 2,     maxDegree: 30 - 2,  value: 'đi studydate'},
    { minDegree: 31+2,    maxDegree: 55+3,  value: 'đi ngủ'},
    { minDegree: 61+2,    maxDegree: 85+3,  value: 'đi chơi bowling'},
    { minDegree: 91+2,    maxDegree: 115+3, value: 'đi thủy cung'},
    { minDegree: 121+2,   maxDegree: 145+3, value: 'đi amusement park'},
    { minDegree: 151+2,   maxDegree: 175+3, value: 'đi date ở AEON Mall'},
    { minDegree: 181+2,   maxDegree: 210-2, value: 'ăn Hey Pelo Taco'},
    { minDegree: 211+2,   maxDegree: 240-2, value: 'đi ăn Bingsu'},
    { minDegree: 241+2,   maxDegree: 270-2, value: 'xem phim'},
    { minDegree: 271+2,   maxDegree: 300-2, value: 'đi hồ Gươm ăn kem Tràng Tiền'},
    { minDegree: 301+2,   maxDegree: 330-2, value: 'chơi đất nặn'},
    { minDegree: 331+2,   maxDegree: 360-2, value: 'đi lượn hồ Tây'}, 
];

//size of each piece: Không hiểu là để làm gì, chắc là gán giá trị ban đầu
const data = [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16];

//Color of each piece
var pieColors = ["#8b35bc", "#b163da", "#8b35bc", "#b163da","#8b35bc", "#b163da", "#8b35bc", "#b163da","#8b35bc","#b163da","#8b35bc",  "#b163da"];

//Create chart
let myChart = new Chart(wheel, {
    //Plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    //Chart Type Pie
    type: "pie",
    data: {
      //Labels(values which are to be displayed on chart)
      labels: ['🎳', '🛌', '📚', '🚤', '🏺', '🍦', '🍿', '🍧', '🌮', '🍣', '🎯', '🦦'],

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
        legend: { display: false,},
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
}}};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 50;
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

    angleValueDisplay.innerHTML = `Angle: ${myChart.options.rotation}°`;
    angleValueDisplay2.innerHTML = `Angle: ${randomDegree}°`;



    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 1;
      myChart.options.rotation = 0;
    } else if (count > 5 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});