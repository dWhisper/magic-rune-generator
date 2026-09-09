import {
	createContext,
	useContext,
	useReducer,
	type Dispatch,
	type ReactNode,
} from "react";
import update, { type Spec } from "immutability-helper";

import { generateRandomRune, generateRandom } from "../utils/utils";
import type { Rune } from "../utils/types";

interface State {
	rune: Rune;
	selected: string;
}

export const ACTIONS = {
	setSelected: "SETSELECTED",
	setSettings: "SETSETTINGS",
	addChild: "ADDCHILD",
	removeChild: "REMOVECHILD",
	roll: "ROLL",
} as const;

type Action =
	| { type: typeof ACTIONS.setSelected; selected: string }
	| { type: typeof ACTIONS.setSettings; name: string; updateSpec: Spec<Rune> }
	| { type: typeof ACTIONS.addChild; name: string }
	| { type: typeof ACTIONS.removeChild; name: string }
	| { type: typeof ACTIONS.roll };

const initialState: State = {
	rune: generateRandom(),
	selected: "root",
};

const removeChildByName = (items: Rune[], name: string): Rune[] => {
	return items.reduce<Rune[]>((acc, item) => {
		if (item.name === name) {
			return acc; // Skip the item to remove it
		}
		if (item.children) {
			const updatedChildren = removeChildByName(item.children, name);
			if (updatedChildren.length !== item.children.length) {
				return [...acc, { ...item, children: updatedChildren }]; // Only update if children changed
			}
		}
		return [...acc, item]; // Include item if it wasn't removed
	}, []);
};

const findAndUpdate = (
	items: Rune[],
	name: string,
	updateSpec: Spec<Rune>
): Rune[] => {
	return items.map((item) => {
		if (item.name === name) {
			return update(item, updateSpec);
		} else if (item.children && item.children.length > 0) {
			return {
				...item,
				children: findAndUpdate(item.children, name, updateSpec),
			};
		}
		return item;
	});
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ACTIONS.setSelected:
			return { ...state, selected: action.selected };

		case ACTIONS.setSettings: {
			const { name, updateSpec } = action;
			return update(state, {
				rune: {
					$apply: (rune) => ({
						...rune,
						...(rune.name === name
							? update(rune, updateSpec)
							: { children: findAndUpdate(rune.children, name, updateSpec) }),
					}),
				},
			});
		}

		case ACTIONS.addChild: {
			const { name } = action;
			const newChild = generateRandomRune();
			return update(state, {
				rune: {
					$apply: (rune) => ({
						...rune,
						...(rune.name === name
							? { children: [...rune.children, newChild] }
							: {
									children: findAndUpdate(rune.children, name, {
										children: { $push: [newChild] },
									}),
							  }),
					}),
				},
			});
		}

		case ACTIONS.removeChild: {
			const { name } = action;
			const updatedChildren = removeChildByName(state.rune.children, name);
			return {
				...state,
				rune: {
					...state.rune,
					children: updatedChildren,
				},
				selected: "root",
			};
		}

		case ACTIONS.roll: {
			const initialRune = generateRandom();
			initialRune.name = "root";

			return { ...state, rune: initialRune, selected: "root" };
		}

		default:
			return state;
	}
};

interface StoreContextValue {
	state: State;
	dispatch: Dispatch<Action>;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
	undefined
);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

export function useStore(): StoreContextValue {
	const context = useContext(StoreContext);
	if (!context) {
		throw new Error("useStore must be used within a StoreProvider");
	}
	return context;
}
