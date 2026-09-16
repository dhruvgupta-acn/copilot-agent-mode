import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		avatarUrl: { type: String },
		points: { type: Number, required: true, default: 0, min: 0 },
	},
	{ timestamps: true },
)

const teamSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		totalPoints: { type: Number, required: true, default: 0, min: 0 },
	},
	{ timestamps: true },
)

const activitySchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		type: { type: String, required: true, enum: ['run', 'ride', 'strength', 'yoga', 'walk'] },
		title: { type: String, required: true, trim: true },
		durationMinutes: { type: Number, required: true, min: 1 },
		distanceKm: { type: Number, min: 0 },
		points: { type: Number, required: true, min: 0 },
		completedAt: { type: Date, required: true },
	},
	{ timestamps: true },
)

const leaderboardSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
		rank: { type: Number, required: true, min: 1 },
		points: { type: Number, required: true, min: 0 },
		week: { type: String, required: true },
	},
	{ timestamps: true },
)

const workoutSchema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		category: { type: String, required: true, enum: ['strength', 'cardio', 'mobility', 'recovery'] },
		difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
		durationMinutes: { type: Number, required: true, min: 1 },
		exercises: [
			{
				name: { type: String, required: true },
				sets: { type: Number, min: 1 },
				reps: { type: Number, min: 1 },
				seconds: { type: Number, min: 1 },
			},
		],
	},
	{ timestamps: true },
)

export const User = mongoose.models.User || mongoose.model('User', userSchema)
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema)
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema)
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema)