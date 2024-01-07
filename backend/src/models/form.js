const { Model } = require('objection');

class Form extends Model {
	static get tableName() {
		return 'form';
	}
}

module.exports = Form;
