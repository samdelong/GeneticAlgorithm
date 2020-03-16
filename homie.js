var Homie = function() {

  this.maxvel = 3
  this.pos = createVector(width / 2 + random(-10, 10), height - 100 + random(-10, 10))
  this.vel = createVector(random(-1, 1), random(-1, 1))
  this.nucleotideCount = 400
  this.positions = [this.pos.copy()]
  this.dna = []
  this.move = 0
  this.best = false
  this.done = false
  this.grow = Math.random() < 0.5
  this.target = createVector(width/2, 100)
  this.stats = {
    nucleotideCount: this.nucleotideCount,
    done: this.done,
    grow: this.grow,
    fitness: ga.fitness(this)
  }
  this.randomNucleotide = function() {
    let v = createVector(random(-1, 1), random(-1, 1))
    v.normalize()
    return v
  }

  //Populate DNA with random values. These values count as acceleration values. (like how the animal is turning the wheel on a car)
  for (let i = 0; i < this.nucleotideCount; i++) {
    this.dna.push(this.randomNucleotide())
  }

  this.draw = function() {
    if(this.done) return
    push()
    this.positions.push(this.pos.copy())
    if (this.best) {
      fill(255, 0, 0, 10)
    }
    ellipse(this.pos.x, this.pos.y, 5, 5)
    pop()
    this.stats = {
      nucleotideCount: this.nucleotideCount,
      done: this.done,
      grow: this.grow,
      fitness: ga.fitness(this)

    }
  }

  this.updatePosition = function() {
    if (this.move == this.dna.length) {
      this.done = true
      return
    }
    this.prevpos = this.pos.copy()

    this.vel.add(this.dna[this.move])
    this.vel.normalize()
    this.pos.add(this.vel)
    this.move++
  }

}
