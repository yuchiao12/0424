let circles = [];
let colors = ["#432818", "#ffcad4", "#778da9", "#d5bdaf", "#8d99ae", "#90e0ef", "#b0c4b1", "#778da9"];
let dogs = [];
let dogImage;
let foods = [];
let foodColors = ["#ff6347", "#ffa500", "#ffd700", "#90ee90", "#87cefa", "#dda0dd"]; // 食物的顏色
let flowers = [];

function preload() {
  // 載入小狗圖片
  dogImage = loadImage('dog.png'); // 確保有一個名為 dog.png 的圖片檔案
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#e5e5e5'); // 設定背景顏色

  // 產生 40 個圓的初始資料
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width), // 隨機 x 座標
      y: random(height), // 隨機 y 座標
      size: random(30, 100), // 隨機大小
      color: color(random(colors)) // 從顏色清單中隨機選擇顏色
    });
  }

  // 產生 50 隻狗狗符號的初始資料
  for (let i = 0; i < 50; i++) {
    dogs.push({
      x: random(width), // 隨機 x 座標
      y: random(height), // 隨機 y 座標
      size: random(20, 50), // 隨機大小
      speedX: random(-2, 2), // 隨機水平速度
      speedY: random(-2, 2) // 隨機垂直速度
    });
  }

  // 產生 50 個食物符號的初始資料
  for (let i = 0; i < 50; i++) {
    foods.push({
      x: random(width), // 隨機 x 座標
      y: random(height), // 隨機 y 座標
      baseSize: random(20, 50), // 隨機基礎大小
      color: random(foodColors) // 隨機顏色
    });
  }

  // 產生 50 朵花的初始資料
  for (let i = 0; i < 50; i++) {
    flowers.push({
      x: random(width), // 隨機 x 座標
      y: random(height), // 隨機 y 座標
      size: random(20, 50), // 隨機大小
      speedX: random(-2, 2), // 隨機水平速度
      speedY: random(-2, 2), // 隨機垂直速度
      petalColor: color(random(255), random(255), random(255)), // 隨機花瓣顏色
      centerColor: color(random(255), random(255), random(255)) // 隨機花心顏色
    });
  }
}

function draw() {
  background('#e5e5e5'); // 重繪背景

  // 計算圓的大小變化
  let sizeOffset = map(mouseX, 0, width, 10, 120);

  // 繪製所有圓
  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size + sizeOffset); // 圓的大小隨滑鼠移動變化
  }

  // 更新並繪製所有狗狗符號
  for (let dog of dogs) {
    // 更新位置
    dog.x += dog.speedX;
    dog.y += dog.speedY;

    // 邊界檢查，讓狗狗符號在視窗內反彈
    if (dog.x < 0 || dog.x > width) {
      dog.speedX *= -1; // 水平反彈
    }
    if (dog.y < 0 || dog.y > height) {
      dog.speedY *= -1; // 垂直反彈
    }

    // 繪製狗狗符號（用圓形模擬）
    fill('#432818'); // 狗狗符號顏色
    noStroke();
    ellipse(dog.x, dog.y, dog.size, dog.size); // 繪製圓形
  }

  // 計算食物符號的大小變化
  let foodSizeOffset = map(mouseX, 0, width, -10, 30);

  // 繪製所有食物符號
  for (let food of foods) {
    let newSize = food.baseSize + foodSizeOffset; // 根據滑鼠位置調整大小
    fill(food.color);
    noStroke();
    ellipse(food.x, food.y, newSize, newSize); // 繪製圓形作為食物符號
  }

  // 更新並繪製所有花
  for (let flower of flowers) {
    // 更新位置
    flower.x += flower.speedX;
    flower.y += flower.speedY;

    // 邊界檢查，讓花在視窗內反彈
    if (flower.x < 0 || flower.x > width) {
      flower.speedX *= -1; // 水平反彈
    }
    if (flower.y < 0 || flower.y > height) {
      flower.speedY *= -1; // 垂直反彈
    }

    // 繪製花
    drawFlower(flower.x, flower.y, flower.size, flower.petalColor, flower.centerColor);
  }
}

function drawFlower(x, y, size, petalColor, centerColor) {
  push();
  translate(x, y);
  fill(petalColor);
  noStroke();

  // 繪製花瓣（5 片）
  for (let i = 0; i < 5; i++) {
    ellipse(0, size / 2, size / 2, size); // 花瓣
    rotate(PI / 2.5); // 旋轉角度
  }

  // 繪製花心
  fill(centerColor);
  ellipse(0, 0, size / 2);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
}