'use strict';
module.exports = (object: any, onChange: any) => {
	const handler = {
		get(target: any, property: any, receiver: any): any {
			try {
				return new Proxy(target[property], handler);
			} catch (err) {
				return Reflect.get(target, property, receiver);
			}
		},
		defineProperty(target: any, property: any, descriptor: any) {
			onChange();
			return Reflect.defineProperty(target, property, descriptor);
		},
		deleteProperty(target: any, property: any) {
			onChange();
			return Reflect.deleteProperty(target, property);
		}
	};
	return new Proxy(object, handler);
};