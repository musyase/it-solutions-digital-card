import assert from 'node:assert/strict';

const endpoint = process.env.GRAPHQL_URL ?? 'http://localhost:3000/graphql';
const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    query: `query ProfileSmoke {
      profile {
        name
        githubUrl
        skills { name category }
        experience { company position period achievements }
        projects { name url description }
      }
    }`,
  }),
});

assert.equal(response.status, 200, `GraphQL returned HTTP ${response.status}`);
const body = await response.json();
assert.deepEqual(body.errors, undefined, JSON.stringify(body.errors));
assert.equal(body.data.profile.name, 'Кирилл Колнооченко');
assert.ok(body.data.profile.skills.some((skill) => skill.name === 'TypeScript'));
assert.ok(body.data.profile.experience.length >= 2);
assert.equal(body.data.profile.projects.length, 2);
assert.ok(body.data.profile.projects.some((project) => project.name === 'Zapix'));
assert.ok(body.data.profile.projects.some((project) => project.name === 'Zapix' && project.url === 'https://zapixapp.ru'));
assert.ok(body.data.profile.projects.some((project) => project.url === 'https://github.com/musyase/stav-electroset-app'));
console.log('GraphQL smoke check passed: profile and nested data are available.');
