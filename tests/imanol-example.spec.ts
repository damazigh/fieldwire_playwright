import {test, expect} from '../fixtures/test'

test('', async ({ request, jwt }) => {
  const response = await request.get('/api/v3/workato/integration_apps', {
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Fieldwire-Version': '2023-04-01'
    }
  })
  
  expect(response.status()).toBe(200)
  const apps = await response.json()

  const GDApp = apps.filter(app => app.name.toLowerCase() === 'microsoft teams')[0]
  expect(GDApp).toBeDefined()
  expect(GDApp.is_available).toBeTruthy()
})