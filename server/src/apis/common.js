export const sort = sortBy => {
	switch (sortBy) {
		case 'Latest':
			return { createdAt: -1 }
		case 'Most Popular':
			return { favoritesCount: -1, downloadCount: -1, createdAt: -1 }
		case 'Least Tags':
			return { tagsCount: 1, createdAt: -1 }
		default:
			return { createdAt: -1 }
	}
}

export const CONVERT_TO_SCREENSHOTS = [
	{
		$project: {
			screenshot: { $arrayElemAt: ['$screenshots', 0] }
		}
	},
	{
		$project: {
			_id: '$screenshot._id',
			createdAt: '$screenshot.createdAt',
			favorites: '$screenshot.favorites',
			tags: '$screenshot.tags',
			user: '$screenshot.user',
			nsfw: '$screenshot.nsfw',
			file: '$screenshot.file',
			downloadCount: '$screenshot.downloadCount',
			favoritesCount: { $size: '$screenshot.favorites' },
			tagsCount: { $size: '$screenshot.tags' }
		}
	}
]
