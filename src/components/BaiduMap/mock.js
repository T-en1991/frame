var data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    lat: Math.random() * 30 + 21,
    lng: Math.random() * 40 + 85,
  });
}

export default {
  data,
};
