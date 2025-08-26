import type { FigmaResolvedType, FigmaValuesByMode, FigmaVariableAlias } from "../types.js";
interface Variable {
    name: string;
    resolvedType: FigmaResolvedType;
    variableCollectionId: string;
    valuesByMode: Record<string, FigmaValuesByMode | FigmaVariableAlias>;
}
interface Mode {
    modeId: string;
    name: string;
}
interface VariableCollection {
    name: string;
    modes: Mode[];
}
interface LocalVariables {
    [key: string]: Variable;
}
interface LocalVariableCollections {
    [key: string]: VariableCollection;
}
declare const formatAndAddCSSVariable: (cssVariables: string[], collectionName: string, modeName: string, variableName: string, variable: Variable, modeId: string, localVariables: LocalVariables, localVariableCollections: LocalVariableCollections, singleMode: boolean, isComponent?: boolean) => string[];
export default formatAndAddCSSVariable;
