const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const angleValueDisplay = document.getElementById("angle-value");
const angleValueDisplay2 = document.getElementById("angle-value2");


//Store min max angle of a value
const rotationValues = [
    { minDegree: 0,     maxDegree: 30,  value: 'đi studydate'},
    { minDegree: 31,    maxDegree: 60,  value: 'đi ngủ'},
    { minDegree: 61,    maxDegree: 90,  value: 'đi chơi bowling'},
    { minDegree: 91,    maxDegree: 120, value: 'đi thủy cung'},
    { minDegree: 121,   maxDegree: 150, value: 'đi amusement park'},
    { minDegree: 151,   maxDegree: 180, value: 'đi date ở AEON Mall'},
    { minDegree: 181,   maxDegree: 210, value: 'ăn Hey Pelo Taco'},
    { minDegree: 211,   maxDegree: 240, value: 'đi ăn Bingsu'},
    { minDegree: 241,   maxDegree: 270, value: 'xem phim'},
    { minDegree: 271,   maxDegree: 300, value: 'đi hồ Gươm ăn kem Tràng Tiền'},
    { minDegree: 301,   maxDegree: 330, value: 'chơi đất nặn'},
    { minDegree: 331,   maxDegree: 360, value: 'đi lượn hồ Tây'}, 
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
let resultValue = 30;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>hehehehehehe</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1));
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => { //Set rotation for piechart
    
    /* Initially to make the piechart rotate faster we set resultValue to 101 so it rotates
    101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation
    we rotate by 1 degree at a time.*/

    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();

    //angleValueDisplay.innerHTML = `Angle: ${myChart.options.rotation}°`;
    //angleValueDisplay2.innerHTML = `Angle: ${randomDegree}°`;



    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 1;
      myChart.options.rotation = 0;
    } else if (count > 5 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 30;
    }
  }, 10);
});