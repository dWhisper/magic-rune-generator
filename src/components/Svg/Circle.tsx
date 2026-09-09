import { useId } from "react";

interface CircleProps {
	thickness: number;
	x: number;
	y: number;
	r: number;
	bg?: string;
}

export default function Circle({ thickness, x, y, r, bg }: CircleProps) {
	const id = useId();

	return (
		<circle
			key={`${id}-circle-${x}-${y}-${r}-${thickness}-${bg}`}
			cx={x}
			cy={y}
			r={r}
			strokeWidth={thickness}
			fill={bg ? bg : "transparent"}
		/>
	);
}
