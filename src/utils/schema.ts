export type FieldType =
	| typeof String
	| typeof Number
	| typeof Boolean
	| typeof Array;

export interface RuneSchema {
	name: typeof String;
	radius: typeof Number;
	isInCenter: typeof Boolean;
	borderThickness: typeof Number;
	thickness: typeof Number;
	theta: typeof Number;
	transparentFill: typeof Boolean;
	textSize: typeof Number;
	centerLines: typeof Number;
	sideLines: typeof Number;
	text: typeof String;
	glyphs: {
		symbols: typeof String;
		radius: typeof Number;
		borderThickness: typeof Number;
		size: typeof Number;
	};
	children: typeof Array;
}

const schema: RuneSchema = {
	name: String,
	radius: Number,
	isInCenter: Boolean,
	borderThickness: Number,
	thickness: Number,
	theta: Number,
	transparentFill: Boolean,
	textSize: Number,
	centerLines: Number,
	sideLines: Number,
	text: String,
	glyphs: {
		symbols: String,
		radius: Number,
		borderThickness: Number,
		size: Number,
	},
	children: Array,
};

export default schema;
