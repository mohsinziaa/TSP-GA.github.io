const cities = [];
const totalCities = 20; //totalNumber Of Cities.

const popSize = 200; //Population of Chromosome.
const fitness = [];

let population = [];
let recordDistance = Infinity;
let bestEver;
let currentBest;
let fact = factorial(totalCities);

let statusP;

setTimeout(() => {
  console.log(new Date().toLocaleTimeString());
}, 1000);

function setup() {
  createCanvas(1500, 650);
  const order = [];
  for (let i = 0; i < totalCities; i++) {
    const v = createVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }

  /*
  Generating a randomly shuffled list in the range of (1, numOfCities).
  */
  for (let i = 0; i < popSize; i++) {
    population[i] = shuffle(order);
  }
  statusP = createP("").style("font-size", "32pt");
}
// console.log(population);

let Counter = 0;

// var myfunc = setInterval(function() {
//   // code goes here
//   }, 1000)

function draw() {
  background(0);

  //GeneticAlgorithm
  calculateFitness();
  normalizeFitness();
  nextGeneration();

  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    const n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();
  // console.log(cities);

  translate(0, height / 2);
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < currentBest.length; i++) {
    const n = currentBest[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();

  Counter++;
  if (Counter == fact) {
    console.log(new Date().toLocaleTimeString());
    console.log("Done");
  }
}

function swap(a, i, j) {
  const temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

//Calculates distance between two points, and sums over loop.
function calcDistance(points, order) {
  let sum = 0;
  for (let i = 0; i < order.length - 1; i++) {
    const cityAIndex = order[i];
    const cityA = points[cityAIndex];
    const cityBIndex = order[i + 1];
    const cityB = points[cityBIndex];
    const d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

function factorial(n) {
  let answer = 1;
  if (n == 0 || n == 1) {
    return answer;
  } else if (n > 1) {
    for (var i = n; i >= 1; i--) {
      answer = answer * i;
    }
    return answer;
  } else {
    return "number has to be positive.";
  }
}
