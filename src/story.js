import { Node, NODE_TYPES } from "./engine";

export const data = {
  keys: {
    bronce: false,
    silver: false,
    gold: false
  }
};

export const nodes = {
  start: new Node({
    type: NODE_TYPES.TEXT,
    body: `You are in a closed room and you need to escape... because you need to pee!`,
    next: "choice",
    buttonText: "Start"
  }),
  choice: new Node({
    type: NODE_TYPES.CHOICE,
    body: `In the cold floor, you see tree keys. Which one will you take?`,
    choices: [
      { id: "bronce", title: "Bronce", next: "bronce" },
      { id: "silver", title: "Silver", next: "silver" },
      { id: "gold", title: "Gold", next: "gold" }
    ]
  }),
  bronce: new Node({
    type: NODE_TYPES.TEXT,
    body: `As you take the bronce key, a cockroach go into your sight and you faint... to never wake up again. GAME OVER.`,
    next: "start",
    buttonText: "Restart"
  }),
  silver: new Node({
    type: NODE_TYPES.CHOICE,
    body: `You take the key and look at your surroundings. You see a door, a window and a fireplace.`,
    choices: [
      { id: "door", title: "Open the door", next: "door" },
      { id: "window", title: "Go to the window", next: "window" },
      { id: "fireplace", title: "Look at the fireplace", next: "fireplace" }
    ]
  }),
  gold: new Node({
    type: NODE_TYPES.TEXT,
    body: `Just before you take the key a mouse came out from nowhere and bite your hand. You died in horrible pain. GAME OVER.`,
    next: "start",
    buttonText: "Restart"
  }),
  fireplace: new Node({
    type: NODE_TYPES.TEXT,
    body: `As you put your head in the fireplace to see up the chimney, a burst of flames emerge from the apparently cold logs. GAME OVER.`,
    next: "start",
    buttonText: "Restart"
  }),
  window: new Node({
    type: NODE_TYPES.TEXT,
    body: `You take a look outside and a baseball ball came flying and hit you in the head. You stumble and fall through the window... You're out! But the scare made you pee on your pants, SHAME ON YOU. GAME OVER.`,
    next: "start",
    buttonText: "Restart"
  }),
  door: new Node({
    type: NODE_TYPES.TEXT,
    body: `You open the door with the key and go out. Now free you peed in a bush as a neighbour see you with lusty eyes... FIN.`,
    next: "start",
    buttonText: "Restart"
  })
};
