const IMAGE_API = 'https://picsum.photos/'
const size = 300

export const getImageURLs = (num = 50) => {
	const images: string[] = []
	for (let i = 0; i < num; i++) {
		images.push(`${IMAGE_API}${size + i}`)
	}
	return images
}