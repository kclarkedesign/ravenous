const apiKey = 'cFV4vrQEjz45J8fkgdWnngNwGFknKPP66AM1hGtgOBNbT7_GCYnISZdAYmdoh5st60bj5tLZuSYmoDlnSnC7nj0009KxSipRRXn9Ey4LrVsnxHV8PFEBVCLOBP0CW3Yx';

const Yelp = {
	search(term, location, sortBy) {
		return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
			headers: {
				Authorization: `Bearer ${apiKey}`
			}
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			if(jsonResponse.businesses) {
				return jsonResponse.businesses.map(business => ({
					id: business.id,
					imageSrc: business.image_url,
					name: business.name,
					address: business.location.address1,
					city: business.location.city,
					state: business.location.state,
					zipCode: business.location.zip_code,
					category: business.categories[0].title,
					rating: business.rating,
					reviewCount: business.review_count
				}));
			}
			throw new Error('Request failed!');
		});
	}
};

export default Yelp;