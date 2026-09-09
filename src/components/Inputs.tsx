import type { ChangeEvent } from "react";
import type { Spec } from "immutability-helper";

import { ACTIONS, useStore } from "../stores/store";

import schema, { type RuneSchema } from "../utils/schema";
import type { Rune } from "../utils/types";

type SchemaNode = RuneSchema | RuneSchema["glyphs"];
type PrimitiveFieldType = typeof String | typeof Number | typeof Boolean;

const typeToInput = new Map<PrimitiveFieldType, "text" | "number" | "checkbox">([
	[Number, "number"],
	[Boolean, "checkbox"],
	[String, "text"],
]);

const inputToType: Record<string, (value: string) => string | number> = {
	number: Number,
	text: String,
};

function findRuneByName(rune: Rune, name: string): Rune | null {
	if (rune.name === name) {
		return rune;
	}

	if (rune.children && rune.children.length > 0) {
		for (const child of rune.children) {
			const found = findRuneByName(child, name);
			if (found) {
				return found;
			}
		}
	}

	return null;
}

export default function Inputs() {
	const { state, dispatch } = useStore();

	function handleInputChange(
		e: ChangeEvent<HTMLInputElement>,
		path: string[] = []
	) {
		const { type, id, value, checked } = e.target;

		const convertedValue: string | number | boolean =
			type === "checkbox" ? checked : inputToType[type](value);

		const fullPath = [...path, id];

		const updateSpec = fullPath.reduceRight<Record<string, unknown>>(
			(acc, key) => ({ [key]: acc }),
			{ $set: convertedValue }
		);

		dispatch({
			type: ACTIONS.setSettings,
			name: state.selected,
			updateSpec: updateSpec as Spec<Rune>,
		});
	}

	function renderInputs(
		schemaNode: SchemaNode,
		runeSettings: Record<string, unknown>,
		path: string[] = []
	) {
		return Object.entries(schemaNode).map(([key, type]) => {
			if (key === "children") return null;

			const value = runeSettings[key];

			if (typeof type === "object" && !Array.isArray(type)) {
				return (
					<div key={key} className="border p-2">
						<label className="font-semibold capitalize">{key}</label>
						<div className="ml-2">
							{renderInputs(
								type as SchemaNode,
								value as Record<string, unknown>,
								[...path, key]
							)}
						</div>
					</div>
				);
			}

			const inputType = typeToInput.get(type as PrimitiveFieldType);

			return (
				<div key={key} className="flex flex-col">
					{key !== "name" && (
						<label className="capitalize" htmlFor={key}>
							{key}
						</label>
					)}
					{inputType === "checkbox" && (
						<input
							checked={value as boolean}
							onChange={(e) => handleInputChange(e, path)}
							type={inputType}
							className="border border-gray-300 self-start"
							id={key}
						/>
					)}
					{inputType === "number" && (
						<input
							value={value as number}
							onChange={(e) => handleInputChange(e, path)}
							type={inputType}
							className="border border-gray-500 p-2"
							id={key}
						/>
					)}
					{inputType === "text" && key !== "name" && (
						<input
							value={value as string}
							onChange={(e) => handleInputChange(e, path)}
							type={inputType}
							className="border border-gray-500 p-2"
							id={key}
						/>
					)}
				</div>
			);
		});
	}

	const runeSettings = findRuneByName(state.rune, state.selected);

	return (
		<div className="font-sans bg-white border-gray-300 p-2 border flex flex-col gap-2">
			<span className="font-semibold text-center">{state.selected}</span>
			{runeSettings &&
				renderInputs(schema, runeSettings as unknown as Record<string, unknown>)}
		</div>
	);
}
