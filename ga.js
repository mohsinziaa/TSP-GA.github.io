/*
Fitness score which is equal to the path length of all the cities mentioned, is used to 
target a population. Fitness Score is defined as the length of the path described by the 
gene. Lesser the path length fitter is the gene. The fittest of all the genes in the gene 
pool survive the population test and move to the next iteration.
*/

function calculateFitness() {
  let currentRecord = Infinity;
  for (let i = 0; i < population.length; i++) {
    const d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i];
    }

    fitness[i] = 1 / (pow(d, 8) + 1);
  }
}

//Normalizing the Fitness function values between 0 and 1.
function normalizeFitness() {
  let sum = 0;
  for (let i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }

  for (let i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
    // console.log(fitness[i]);
  }
}

/*
Generating next generation by applying cross over function on Any 2 element from the existing chromosome
based on their fitness. Then applying crossOver on them and generating the 
new chromosome from them (deriving from them)
*/
function nextGeneration() {
  const newPopulation = [];
  for (var i = 0; i < population.length; i++) {
    const orderA = pickOne(population, fitness);
    const orderB = pickOne(population, fitness);
    const order = crossOver(orderA, orderB);
    mutate(order, 0.1);
    newPopulation[i] = order;
  }
  population = newPopulation;
}

function pickOne(list, prob) {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}
/*
Randomly selecting two indexes from First Parent (orderA) and then
and placing it into newOrder, then filling the remaining elements
from Second Parent (orderB) such that the element is not already
present in the newOrder. 
*/
function crossOver(orderA, orderB) {
  const start = floor(random(orderA.length));
  const end = floor(random(start + 1, orderA.length));
  const neworder = orderA.slice(start, end);
  for (let i = 0; i < orderB.length; i++) {
    const city = orderB[i];
    if (!neworder.includes(city)) {
      neworder.push(city);
    }
  }
  return neworder;
}
/*
Mutate function is used for permutation representations, this function 
swaps the position of two randomly selected genes in the chromosome.
*/
function mutate(order, mutationRate) {
  for (let i = 0; i < totalCities; i++) {
    if (random(1) < mutationRate) {
      const indexA = floor(random(order.length));
      const indexB = (indexA + 1) % totalCities;
      swap(order, indexA, indexB);
    }
  }
}
