import { Router, type Request, type Response } from 'express'
import type { Model } from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'

const router = Router()

function registerResourceRoute(path: string, model: Model<unknown>) {
  router.get(path, async (_request: Request, response: Response) => {
    try {
      const records = await model.find().lean()
      response.json(records)
    } catch (error) {
      console.error(`Unable to load ${path}:`, error)
      response.status(503).json({ error: 'Database unavailable' })
    }
  })

  router.post(path, async (request: Request, response: Response) => {
    try {
      const record = await model.create(request.body)
      response.status(201).json(record)
    } catch (error) {
      console.error(`Unable to create ${path}:`, error)
      response.status(400).json({ error: 'Invalid request body' })
    }
  })
}

registerResourceRoute('/users', User)
registerResourceRoute('/teams', Team)
registerResourceRoute('/activities', Activity)
registerResourceRoute('/leaderboard', Leaderboard)
registerResourceRoute('/workouts', Workout)

export default router