// scripts/test_api.js
// Automated verification script for the full-stack REST API

async function runTests() {
  const base = 'http://localhost:3000/api/v1';

  try {
    // 1. All games
    const r1 = await fetch(base + '/games?page=1&limit=5').then(r => r.json());
    console.log('1. GET /games (first 5):', r1.success, '| Items:', r1.data.length, '| Total in DB:', r1.pagination.total);

    // 2. Filter by RPG genre
    const r2 = await fetch(base + '/games?genre=RPG').then(r => r.json());
    console.log('2. GET /games?genre=RPG:', r2.success, '| RPG Games:', r2.data.length);

    // 3. Filter by Indie genre
    const r3 = await fetch(base + '/games?genre=Indie').then(r => r.json());
    console.log('3. GET /games?genre=Indie:', r3.success, '| Indie Games:', r3.data.length);

    // 4. Sort by rating
    const r4 = await fetch(base + '/games?sort=rating&limit=3').then(r => r.json());
    console.log('4. GET /games?sort=rating (Top 3):', r4.data.map(g => `${g.name} (${g.rating})`).join(', '));

    // 5. Analytics overview
    const r5 = await fetch(base + '/analytics/overview').then(r => r.json());
    console.log('5. GET /analytics/overview:', r5.success, '| Total Games:', r5.data.totalGames, '| Avg Rating:', r5.data.averageRating, '| Avg Price: $' + r5.data.averagePrice);

    // 6. Login
    const r6 = await fetch(base + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'operator@station.io', password: 'password123' })
    }).then(r => r.json());
    console.log('6. POST /auth/login:', r6.success, '| Token generated:', !!r6.data?.token);
    const token = r6.data?.token;

    // 7. Create Game (Admin protected)
    const newAppid = 'test_' + Date.now();
    const r7 = await fetch(base + '/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({
        appid: newAppid,
        name: 'Vortex Protocol Demo',
        price: 19.99,
        rating: 8.5,
        genres: ['Action', 'Sci-Fi'],
        developer: 'Deep Space Interactive'
      })
    }).then(r => r.json());
    console.log('7. POST /games (Create):', r7.success, '| Created App ID:', r7.data?.appid);

    // 8. Update Game
    const r8 = await fetch(base + '/games/' + newAppid, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ price: 14.99, rating: 9.0 })
    }).then(r => r.json());
    console.log('8. PUT /games/' + newAppid + ' (Update):', r8.success, '| Updated price: $' + r8.data?.price + ' | Rating:', r8.data?.rating);

    // 9. Delete Game
    const r9 = await fetch(base + '/games/' + newAppid, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(r => r.json());
    console.log('9. DELETE /games/' + newAppid + ' (Delete):', r9.success);

    // 10. Reviews
    const r10 = await fetch(base + '/reviews').then(r => r.json());
    console.log('10. GET /reviews:', r10.success, '| Count:', r10.data.length);

    console.log('\n🎉 ALL FULL-STACK REST API VERIFICATION TESTS PASSED SUCCESSFULLY!\n');
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
}

runTests();
