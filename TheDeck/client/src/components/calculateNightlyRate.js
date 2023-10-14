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
  const room = roomData.find((room) => room.id === roomId);

  if (room) {
    return room.nightlyRate;
  } else {
    return 0; // or some other default value
  }
}

export default calculateNightlyRate;