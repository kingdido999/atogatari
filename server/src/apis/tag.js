import Screenshot from '../models/Screenshot'
import Tag from '../models/Tag'

async function getTags(ctx) {
	const { query } = ctx.request

	const tags = await Tag.find(query).populate('screenshots').sort('name').exec()

	ctx.response.body = tags
	ctx.status = 200
}

async function getTag(ctx) {
	const { name } = ctx.params

	const tag = await Tag.findOne({ name }).populate('screenshots').exec()

	ctx.response.body = tag
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
	addTag,
	deleteTag,
	updateTag
}
