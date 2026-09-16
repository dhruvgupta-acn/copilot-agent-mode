import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [alex, priya, jordan] = await User.create([
      {
        name: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
        points: 1280,
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
        points: 1140,
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=8',
        points: 960,
      },
    ]);

    const [trailblazers, morningCrew] = await Team.create([
      {
        name: 'Trailblazers',
        description: 'Weekend runners building consistent mileage together.',
        members: [alex._id, priya._id],
        totalPoints: 2420,
      },
      {
        name: 'Morning Crew',
        description: 'Early risers who start the day with movement.',
        members: [jordan._id],
        totalPoints: 960,
      },
    ]);

    await Activity.create([
      {
        user: alex._id,
        type: 'run',
        title: 'Riverside 5K',
        durationMinutes: 31,
        distanceKm: 5.2,
        points: 320,
        completedAt: new Date('2026-09-14T07:30:00Z'),
      },
      {
        user: priya._id,
        type: 'strength',
        title: 'Full-body circuit',
        durationMinutes: 42,
        points: 280,
        completedAt: new Date('2026-09-15T06:45:00Z'),
      },
      {
        user: jordan._id,
        type: 'ride',
        title: 'Park loop ride',
        durationMinutes: 55,
        distanceKm: 18.4,
        points: 360,
        completedAt: new Date('2026-09-15T07:00:00Z'),
      },
    ]);

    await Leaderboard.create([
      { user: alex._id, team: trailblazers._id, rank: 1, points: 1280, week: '2026-W38' },
      { user: priya._id, team: trailblazers._id, rank: 2, points: 1140, week: '2026-W38' },
      { user: jordan._id, team: morningCrew._id, rank: 3, points: 960, week: '2026-W38' },
    ]);

    await Workout.create([
      {
        title: 'Steady Start',
        description: 'A balanced session for building a reliable movement habit.',
        category: 'strength',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: [
          { name: 'Bodyweight squats', sets: 3, reps: 12 },
          { name: 'Incline push-ups', sets: 3, reps: 8 },
          { name: 'Plank', sets: 3, seconds: 30 },
        ],
      },
      {
        title: 'Runner Reset',
        description: 'Mobility work to loosen hips, calves, and hamstrings after a run.',
        category: 'mobility',
        difficulty: 'intermediate',
        durationMinutes: 18,
        exercises: [
          { name: 'Worlds greatest stretch', sets: 2, reps: 6 },
          { name: 'Standing calf stretch', sets: 2, seconds: 30 },
          { name: 'Seated hamstring fold', sets: 2, seconds: 45 },
        ],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
