import Screenshot from '../models/Screenshot'
import Tag from '../models/Tag'
import { sort, CONVERT_TO_SCREENSHOTS } from './common'

async function getTags(ctx) {
	const { query } = ctx.request

	const tags = await Tag.find(query).sort('name').exec()

	ctx.response.body = tags
	ctx.status = 200
}

async function getTag(ctx) {
	const { name } = ctx.params

	const tag = await Tag.findOne({ name }).exec()

	ctx.response.body = tag
	ctx.status = 200
}

async function getTagScreenshots(ctx) {
	const { name } = ctx.params
	const { query } = ctx.request
	let { sortBy, nsfw, page, limit } = query
	page = page ? Number(page) : 1
	limit = limit ? Number(limit) : 9

	let aggregation = [
		{
			$match: { name }
		},
		{
			$unwind: '$screenshots'
		},
		{
			$lookup: {
				from: 'screenshots',
				localField: 'screenshots',
				foreignField: '_id',
				as: 'screenshots'
			}
		}
	]

	aggregation = [...aggregation, ...CONVERT_TO_SCREENSHOTS]

	if (!(nsfw === 'true')) {
		aggregation.push({
			$match: { nsfw: false }
		})
	}

	const docs = await Tag.aggregate(aggregation).exec()
	const total = docs.length

	const paginatedDocs = await Tag.aggregate([
		...aggregation,
		{ $sort: sort(sortBy) },
		{ $skip: (page - 1) * limit },
		{ $limit: limit }
	]).exec()

	const populatedDocs = await Screenshot.populate(paginatedDocs, {
		path: 'user favorites tagDocs'
	})

	const results = {
		docs: populatedDocs,
		total,
		limit,
		page,
		pages: Math.ceil(total / limit) || 1
	}

	ctx.response.body = results
	ctx.status = 200
}

async function addTag(ctx) {
	let { name, screenshotId } = ctx.request.body
	name = name.trim().toLowerCase()

	let tag = await Tag.findOne({ name }).exec()

	if (!tag) {
		tag = new Tag({
			name
		})
	}

	const screenshot = await Screenshot.findById(screenshotId).exec()

	if (!screenshot) {
		ctx.throw(400, `Screenshot ${screenshotId} does not exist.`)
	}

	if (screenshot.tags.includes(name)) {
		ctx.throw(400, `Tag "${name}" already exists for this screenshot.`)
	}

	tag.screenshots.push(screenshotId)

	await tag.save()

	screenshot.tags.push(name)
	await screenshot.save()

	ctx.response.body = {
		name,
		screenshotId
	}

	ctx.status = 200
}

async function deleteTag(ctx) {
	let { name } = ctx.params
	const { screenshotId } = ctx.request.query

	const tag = await Tag.findOne({ name }).exec()

	if (!tag) {
		ctx.throw(400)
	}

	const screenshot = await Screenshot.findById(screenshotId).exec()

	if (!screenshot) {
		ctx.throw(400)
	}

	tag.screenshots = tag.screenshots.filter(id => id.toString() !== screenshotId)
	screenshot.tags = screenshot.tags.filter(tag => tag !== name)

	if (tag.screenshots.length > 0) {
		await tag.save()
	} else {
		await tag.remove()
	}

	await screenshot.save()

	ctx.response.body = {
		name,
		screenshotId
	}

	ctx.status = 200
}

async function updateTag(ctx) {
	const { name } = ctx.params
	const { type } = ctx.request.body

	if (!['General', 'Anime', 'Character'].includes(type)) {
		ctx.throw(400, 'Invalid type.')
	}

	const tag = await Tag.findOne({ name }).exec()
	tag.type = type
	await tag.save()

	ctx.response.body = tag
	ctx.status = 200
}

export default {
	getTags,
	getTag,
	getTagScreenshots,
	addTag,
	deleteTag,
	updateTag
}
