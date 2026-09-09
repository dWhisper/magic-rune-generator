import { useId } from "react";

import { generateSvgPath } from "../../utils/utils";

interface TextOnPathProps {
	x: number;
	y: number;
	text: string;
	radius: number;
	fontSize: number;
}

export default function TextOnPath({
	x,
	y,
	text,
	radius,
	fontSize,
}: TextOnPathProps) {
	const id = useId();

	return (
		<>
			<defs>
				<path id={"circlePath" + id} d={generateSvgPath(x, y, radius)} />
			</defs>
			<text fontSize={fontSize}>
				<textPath href={"#circlePath" + id} textLength={2 * radius * 3.14}>
					{text}
				</textPath>
			</text>
		</>
	);
}
