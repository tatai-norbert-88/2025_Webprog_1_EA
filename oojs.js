class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    const p = document.createElement("p");
    p.textContent = `${this.name} hangot ad ki.`;
    document.getElementById("output").appendChild(p);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    const p = document.createElement("p");
    p.textContent = `${this.name}, a(z) ${this.breed} ugat: "Vau vau!"`;
    document.getElementById("output").appendChild(p);
  }
}

// Tömbben tároljuk a példányokat
const dogs = [
  new Dog("Bodri", "puli"),
  new Dog("Cézár", "német juhász"),
  new Dog("Morzsi", "vizsla")
];

// Minden kutya megszólal
dogs.forEach(dog => dog.speak());