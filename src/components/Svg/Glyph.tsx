import { useRef, useEffect, useState } from "react";

interface GlyphProps {
	x: number;
	y: number;
	size: number;
	symbol: string;
	angle: number;
	position: number;
}

export default function Glyph({
	x,
	y,
	size,
	symbol,
	angle,
	position,
}: GlyphProps) {
	const textRef = useRef<SVGTextElement>(null);
	const [textWidth, setTextWidth] = useState(0);

	useEffect(() => {
		if (textRef.current) {
			const bbox = textRef.current.getBBox();
			setTextWidth(bbox.width);
		}
	}, [symbol]);

	return (
		<text
			ref={textRef}
			x={x + textWidth / 6}
			y={y}
			fontSize={size}
			textAnchor="middle"
			dominantBaseline="central"
			transform={`rotate(${position * angle}, ${x}, ${y})`}
		>
			{symbol}
		</text>
	);
}
