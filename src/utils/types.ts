export interface GlyphSettings {
	symbols: string;
	radius: number;
	borderThickness: number;
	size: number;
}

export interface Rune {
	name: string;
	radius: number;
	isInCenter: boolean;
	borderThickness: number;
	thickness: number;
	theta: number;
	transparentFill: boolean;
	textSize: number;
	centerLines: number;
	sideLines: number;
	text: string;
	glyphs: GlyphSettings;
	children: Rune[];
}

export interface Point {
	x: number;
	y: number;
}
