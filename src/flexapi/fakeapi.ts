// A completely fake implementation of the xbim Flex API client library. 
// This will be replaced by the real library we generate from the openAPI.

/** A fake implementation of the Models service */
export class ModelsService {
    static modelsGetSingleByAssetmodelidAndTenantid(arg0: { tenantId: string; region: "Sandbox" | "UK" | "WestEurope" | "Fx003" | undefined; assetModelId: number; }) : ModelInfo {
        return {}
    }
	static modelsGetByTenantid(arg0: { tenantId: string; region: "Sandbox" | "UK" | "WestEurope" | "Fx003" | undefined; count?: boolean; top?: number; skip?: number | undefined; orderby?: string; }) : {value: Model[], [x: string]: any;}{
		return { value: [] };
	}

}

export class SpacesService {
    static spacesGetByTenantid(arg0: { tenantId: string; region: "Sandbox" | "UK" | "WestEurope" | "Fx003" | undefined; filter?: string; top?: number; skip?: number; count?: boolean; }): {value: Space[], [x: string]: any;} {
        return { value: [] };
    }

}

export class LevelsService {
    static levelsGetByTenantid(arg0: { tenantId: string; region: "Sandbox" | "UK" | "WestEurope" | "Fx003" | undefined; filter?: string; expand?: string; orderby?: string; count?: boolean; }) : {value: Level[], [x: string]: any;} {
        return { value: [] };
    }

}

/** A stubbed Model, Level, Space  */
export class Model {
    /** Any parameter */
    [x: string]: any;
}

export class Space {
    [x: string]: any;
}

export class Level {
    Spaces: Space[] = [];
    [x: string]: any;
}


/** A stubbed Model Info */
export class ModelInfo {
    [x: string]: any;
}


/** Stubbed OpenAPI configuration */
export class OpenAPI {
    static [x: string]: any;
}