import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import Pet from 'App/Models/Pet'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Welcome', () => {
  test('ensure home page works', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/').expect(200)
    const { document } = new JSDOM(text).window
    const title = document.querySelector('.title')

    assert.exists(title)
    assert.equal(title!.textContent!.trim(), 'It Works!')
  })

  test.only('ensure user password gets hashed during save', async (assert) => {
    const pet = new Pet()
    pet.name = 'virk'
    pet.color = 'opaque'
    await pet.save()

    assert.equal(pet.color, 'opaque')
  })
})
