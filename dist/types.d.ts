export interface FigmaColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
export type FigmaResolvedType = "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
export interface FigmaVariableCollection {
    id: string;
    name: string;
    key: string;
    modes: {
        modeId: string;
        name: string;
    }[];
    defaultModeId: string;
    remote: boolean;
    hiddenFromPublishing: boolean;
    variablaIds: string[];
}
export type FigmaValuesByMode = boolean | number | string | FigmaColor | FigmaVariableAlias;
export interface FigmaVariable {
    id: string;
    name: string;
    key: string;
    variableCollectionId: string;
    resolvedType: FigmaResolvedType;
    valuesByMode: {
        [modeId: string]: FigmaValuesByMode;
    };
    remote: boolean;
    description: string;
    hiddenFromPublishing: boolean;
    scopes: FigmaVariableScope[];
    codeSyntax: FigmaVariableCodeSyntax;
    deletedButReferenced: boolean;
}
export interface FigmaVariableAlias {
    type: "VARIABLE_ALIAS";
    id: string;
}
export type FigmaVariableScope = "ALL_SCOPES" | "CORNER_RADIUS" | "TEXT_CONTENT" | "WIDTH_HEIGHT" | "GAP" | "STROKE_FLOAT" | "OPACITY" | "EFFECT_FLOAT" | "FONT_WEIGHT" | "FONT_SIZE" | "LINE_HEIGHT" | "LETTER_SPACING" | "PARAGRAPH_SPACING" | "PARAGRAPH_INDENT" | "FONT_FAMILY" | "FONT_STYLE" | "FONT_VARIATIONS" | "ALL_FILLS" | "FRAME_FILL" | "SHAPE_FILL" | "TEXT_FILL" | "STROKE_COLOR" | "EFFECT_COLOR";
export interface FigmaVariableCodeSyntax {
    WEB?: string;
    ANDROID?: string;
    iOS?: string;
}
