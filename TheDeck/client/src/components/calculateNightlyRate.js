// calculateNightlyRate.js

const roomData = [
  {
    id: 1,
    nightlyRate: 1500,
  },
  {
    id: 2,
    nightlyRate: 2500,
  },
  {
    id: 3,
    nightlyRate: 3000,
  },
  {
    id: 4,
    nightlyRate: 3500,
  },
];

function calculateNightlyRate(roomId) {
  // Find the room object with the given ID
  const room = roomData.find((room) => room.id === roomId);

  // If a matching room is found, return its nightly rate
  if (room) {
    return room.nightlyRate;
  } else {
    // Handle the case where no matching room is found
    return 0; // or some other default value
  }
}

export default calculateNightlyRate;