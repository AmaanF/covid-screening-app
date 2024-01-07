function splitObject(obj, keys) {
	const obj1 = {};

	keys.forEach((key) => {
		obj1[key] = obj[key];
		delete obj[key];
	});

	return [obj1, obj];
}

module.exports = splitObject;
