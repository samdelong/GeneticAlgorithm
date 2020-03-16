var population = []
var popsize = 200
var nucleotideMutationFactor = 0 //.1
var nucleotideCountMutationFactor = 0.2 //0.1
var growMutationFactor = 0.1
var disposable = 0.95
var gen = 1
var fps
var info
var prog = []
var nCount = []
var grow = []
var speed = 20
var graphDim = {
  width: 200,
  height: 200,
}

function setup() {
  createCanvas(800, 600)
  background(51)
  for (let i = 0; i < popsize; i++) {
    population.push(new Homie())
  }
  fps = document.getElementById('fps')
  info = document.getElementById('info')
}

function draw() {
  fps.innerHTML = `Framerate: ${floor(frameRate())}`
  ellipse(population[0].target.x, population[0].target.y, 20, 20)
  population.sort((a, b) => {
    return b.nucleotideCount - a.nucleotideCount
  })

  //speed up for time's sake
  for (let z = 0; z < speed; z++) {
    for (let i = 0; i < population.length; i++) {
      if (population[0].done) {
        background(51)
        population.sort((a, b) => {
          return ga.fitness(a) - ga.fitness(b)
        })
        gen++
        prog.push(ga.fitness(population[0]))
        nCount.push(population[0].nucleotideCount)
        grow.push((population[0].grow ? 1 : 0))

        push()
        translate(width - graphDim.width, 0)
        fill(255)
        rect(0, 0, graphDim.width, graphDim.height)
        pop()

        drawGraph(prog, color(255, 0, 0))
        //drawGraph(nCount, color(0, 255, 0))
        info.innerHTML = `
        Generation: ${gen}</br>
        Best Fitness: ${JSON.stringify(population[0].stats)}
        `
        population = evolve(population)
      }
      population[i].updatePosition()
    }
  }
  noStroke()
  fill(255, 255, 255, 50)
  for (let i = 0; i < population.length; i++) {

    population[i].draw()
  }
}

function drawGraph(arr, c) {
  push()
  translate(width - graphDim.width, 0)
  stroke(c)
  let pWidth = graphDim.width / arr.length
  let maxFit = 0;
  for (let p of arr) {
    if (p > maxFit) {
      maxFit = p
    }
  }
  for (let i = 0; i < arr.length - 1; i++) {
    //ellipse(i * pWidth, graphDim.height - map(arr[i], 0, maxFit, 0, graphDim.height), 5, 5)
    line(i * pWidth, graphDim.height - map(arr[i], 0, maxFit, 0, graphDim.height), (i + 1) * pWidth, graphDim.height - map(arr[i + 1], 0, maxFit, 0, graphDim.height))
  }
  pop()
}

function evolve(pop) {
  //sort from best to worst
  pop.sort((a, b) => {
    return ga.fitness(a) - ga.fitness(b)
  })
  let dispIndex = parseInt(popsize * disposable)
  let pool = []
  for (let i = 1; i < dispIndex; i++) {
    //Better homies have better chance of being chose
    var numEntries = map(ga.fitness(pop[i]), ga.fitness(pop[0]), ga.fitness(pop[pop.length - 1]), 10000, 10);
    //let numEntries = ceil(5000 / (Math.pow(Math.E, i)))
    for (let c = 0; c < numEntries; c++) {
      pool.push(pop[i])
    }
  }

  //breed!
  for (let i = 0; i < dispIndex; i++) {
    let baby = new Homie()
    let father = pool[parseInt(random(0, pool.length))]
    let mother = pool[parseInt(random(0, pool.length))]
    pop[i] = ga.breed(father, mother)
  }
  for (let i = dispIndex; i < pop.length; i++) {
    pop[i] = new Homie()
  }
  //First of new population is most likely to have best genetics
  pop[0].best = true
  return pop

}
