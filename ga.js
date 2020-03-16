var ga = {

  fitness: function(h){
    return abs(dist(h.pos.x, h.pos.y, h.target.x, h.target.y)) + (h.nucleotideCount/50)
  },
  breed: function(father, mother){
    let baby = new Homie()
    //baby.nucleotideCount = (father.nucleotideCount + mother.nucleotideCount) / 2
    if (Math.random() < 0.5) {
      baby.nucleotideCount = father.nucleotideCount
    } else {
      baby.nucleotideCount = mother.nucleotideCount
    }

    if(Math.random() < 0.5){
      baby.grow = father.grow
    }else{
      baby.grow = mother.grow
    }
    if(Math.random() < growMutationFactor) baby.grow = !baby.grow
    if (Math.random() < nucleotideCountMutationFactor) {
      baby.nucleotideCount += (baby.grow ? parseInt(random(0, 25)) : parseInt(random(-25, 0)))
      if(baby.nucleotideCount < 0){
        return new Homie()
      }
      baby.dna.length = baby.nucleotideCount

      //baby.nucleotideCount += parseInt(random(-100, 100))
    }


    for (let n = 0; n < baby.nucleotideCount; n++) {
      let f = Math.random() < 0.5
      // father.dna[n]?.normalize()
      // mother.dna[n]?.normalize()
      // baby.dna[n] = father.dna[n]?.add(mother.dna[n]).div(2) || baby.randomNucleotide()
      // baby.dna[n]
      if (f) {
        baby.dna[n] = father.dna[n] || mother.dna[n] || baby.randomNucleotide()

      } else {
        baby.dna[n] = mother.dna[n] || father.dna[n] || baby.randomNucleotide()

      }
      if (Math.random() < nucleotideMutationFactor) {
        baby.dna[n].add(createVector(random(-.01, .01), random(-.01, .01)))
      }
    }

    return baby
  }

}
