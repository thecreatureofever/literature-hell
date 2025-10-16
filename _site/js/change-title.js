const weightedTitles = [
  { title: ".", weight: 90 },
  { title: "what did you expect", weight: 2 },
  { title: "it is just me", weight: 2 },
  { title: "why", weight: 2 },
  { title: "there is nothing more", weight: 2 },
  { title: "my secret is not for you", weight: 2 },
  { title: "you missed one", weight: 0.5 }
];

// Function to select a title based on weight
function chooseWeightedTitle(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const rand = Math.random() * totalWeight;
  let cumulative = 0;

  for (const item of items) {
    cumulative += item.weight;
    if (rand < cumulative) {
      return item.title;
    }
  }
}

document.title = chooseWeightedTitle(weightedTitles);
