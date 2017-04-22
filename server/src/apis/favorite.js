import Screenshot from '../models/Screenshot'
import Favorite from '../models/Favorite'
import User from '../models/User'

async function getFavorites(ctx) {
	const { query } = ctx.request

	const favorites = await Favorite.find(query)
		.populate('user screenshot')
		.exec()

	ctx.response.body = favorites
	ctx.status = 200
}

async function addFavorite(ctx) {
	const { screenshotId } = ctx.request.body
	const screenshot = await Screenshot.findById(screenshotId).exec()
	if (!screenshot) {
		ctx.throw(400)
	}

	const user = await User.findById(ctx.state.uid).exec()
	let favorite = await Favorite.findOne({
		user: ctx.state.uid,
		screenshot: screenshotId
	}).exec()

	if (favorite) {
		ctx.throw(400)
	}

	favorite = new Favorite({
		user: ctx.state.uid,
		screenshot: screenshotId
	})

	user.favorites.push(favorite)
	screenshot.favorites.push(favorite)

	await favorite.save()
	await user.save()
	await screenshot.save()

	ctx.response.body = favorite
	ctx.status = 201
}

async function removeFavorite(ctx) {
	const { screenshotId } = ctx.request.query
	const screenshot = await Screenshot.findById(screenshotId).exec()
	if (!screenshot) {
		ctx.throw(400)
	}

	const favorite = await Favorite.findOne({
		user: ctx.state.uid,
		screenshot: screenshotId
	}).exec()

	if (!favorite) {
		ctx.throw(400)
	}

	await favorite.remove()

	await User.update(
		{ _id: ctx.state.uid },
		{
			$pull: { favorites: favorite._id }
		}
	).exec()

	await Screenshot.update(
		{ _id: screenshotId },
		{
			$pull: { favorites: favorite._id }
		}
	).exec()

	ctx.response.body = favorite
	ctx.status = 202
}

export default {
	getFavorites,
	addFavorite,
	removeFavorite
}
