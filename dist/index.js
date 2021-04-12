/*!
 * Via Profit services / Vehicles
 *
 * Repository git@github.com:via-profit-services/vehicles.git
 * Contact    https://via-profit.ru
 *
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 922:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("extend type Query {\n  vehicles: VehiclesQuery!\n}\n\ntype VehicleBrand implements Node {\n  id: ID!\n  name: String!\n  models: [VehicleModel!]!\n}\n\ntype VehicleModel implements Node {\n  id: ID!\n  name: String!\n  brand: VehicleBrand!\n}\n\ntype VehiclesQuery {\n  \"\"\"\n  Returns VehicleBrands list bundle\n  \"\"\"\n  brands(\n    first: Int\n    offset: Int\n    after: String\n    orderBy: [VehicleBrandOrderBy!]\n    filter: VehicleBrandListFilter\n    search: [VehicleBrandFilterSearch!]\n  ): VehiclesBrandsListConnection!\n\n  \"\"\"\n  Returns VehicleModels list bundle\n  \"\"\"\n  models(\n    first: Int\n    offset: Int\n    after: String\n    orderBy: [VehicleModelOrderBy!]\n    filter: VehicleModelListFilter\n    search: [VehicleModelFilterSearch!]\n  ): VehiclesModelsListConnection!\n  \"\"\"\n  Returns vehicle brand if exists\n  \"\"\"\n  brand(id: ID!): VehicleBrand\n\n  \"\"\"\n  Returns vehicle model if exists\n  \"\"\"\n  model(id: ID!): VehicleModel\n}\n\ninput VehicleBrandInputCreate {\n  id: String!\n  name: String!\n}\n\ninput VehicleModelInputCreate {\n  id: String!\n  name: String!\n  brand: String!\n}\n\ninput VehicleBrandInputUpdate {\n  id: String\n  name: String\n}\n\ninput VehicleModelInputUpdate {\n  id: String\n  name: String\n  brand: String\n}\n\n\n\"\"\"\nVehicleBrand edge bundle\n\"\"\"\ntype VehicleBrandEdge implements Edge {\n  node: VehicleBrand!\n  cursor: String!\n}\n\n\"\"\"\nVehicleModels edge bundle\n\"\"\"\ntype VehicleModelEdge implements Edge {\n  node: VehicleModel!\n  cursor: String!\n}\n\n\n\"\"\"\nPossible data to filter list of vehiicle brands\n\"\"\"\ninput VehicleBrandListFilter {\n  id: [ID!]\n}\n\n\"\"\"\nPossible data to filter list of vehiicle models\n\"\"\"\ninput VehicleModelListFilter {\n  id: [ID!]\n  brand: [String!]\n}\n\n\"\"\"\nVehicle brand search filter\n\"\"\"\ninput VehicleBrandFilterSearch {\n  field: VehicleBrandFilterSearchField!\n\n  \"\"\"\n  Search query string\n  \"\"\"\n  query: String!\n}\n\n\"\"\"\nVehicle model search filter\n\"\"\"\ninput VehicleModelFilterSearch {\n  field: VehicleModelFilterSearchField!\n\n  \"\"\"\n  Search query string\n  \"\"\"\n  query: String!\n}\n\n\"\"\"\nPossible fields to search brands\n\"\"\"\nenum VehicleBrandFilterSearchField {\n  name\n}\n\n\"\"\"\nPossible fields to search models\n\"\"\"\nenum VehicleModelFilterSearchField {\n  name\n}\n\n\"\"\"\nOrdering options for brands returned from the connection\n\"\"\"\ninput VehicleBrandOrderBy {\n  field: VehicleBrandOrderField!\n  direction: OrderDirection!\n}\n\n\"\"\"\nOrdering options for models returned from the connection\n\"\"\"\ninput VehicleModelOrderBy {\n  field: VehicleModelOrderField!\n  direction: OrderDirection!\n}\n\nenum VehicleBrandOrderField {\n  name\n}\n\nenum VehicleModelOrderField {\n  brand\n  name\n}\n\n\"\"\"\nVehicle brands list bundle\n\"\"\"\ntype VehiclesBrandsListConnection implements Connection {\n  totalCount: Int!\n  pageInfo: PageInfo!\n  edges: [VehicleBrandEdge!]!\n}\n\n\"\"\"\nVehicle models list bundle\n\"\"\"\ntype VehiclesModelsListConnection implements Connection {\n  totalCount: Int!\n  pageInfo: PageInfo!\n  edges: [VehicleModelEdge!]!\n}\n");

/***/ }),

/***/ 131:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(147);
const knex_1 = __webpack_require__(160);
class VehiclesService {
    constructor(props) {
        this.props = props;
    }
    getBrands(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const { context } = this.props;
            const { knex } = context;
            const { limit, offset, orderBy, where, search } = filter;
            const response = yield knex
                .select([
                knex.raw('"vehiclesBrands".*'),
                knex.raw('count(*) over() as "totalCount"'),
                knex.raw('string_agg(distinct ??::text, ?::text) AS "models"', ['vehiclesModels.id', '|']),
            ])
                .from('vehiclesBrands')
                .leftJoin('vehiclesModels', 'vehiclesModels.brand', 'vehiclesBrands.id')
                .groupBy('vehiclesBrands.id')
                .groupBy('vehiclesModels.id')
                .limit(limit || 1)
                .offset(offset || 0)
                .where((builder) => knex_1.convertWhereToKnex(builder, where, {
                'vehiclesBrands': '*',
            }))
                .where((builder) => knex_1.convertSearchToKnex(builder, search, {
                'vehiclesBrands': '*',
            }))
                .orderBy(knex_1.convertOrderByToKnex(orderBy))
                .then((nodes) => nodes.map((node) => (Object.assign(Object.assign({}, node), { models: core_1.arrayOfIdsToArrayOfObjectIds(node.models.split('|')) }))))
                .then((nodes) => (Object.assign(Object.assign({}, knex_1.extractTotalCountPropOfNode(nodes)), { offset,
                limit,
                orderBy,
                where })));
            return response;
        });
    }
    getBrandsByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nodes } = yield this.getBrands({
                where: [['id', 'in', ids]],
                offset: 0,
                limit: ids.length,
            });
            return nodes;
        });
    }
    getBrand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const nodes = yield this.getBrandsByIds([id]);
            return nodes.length ? nodes[0] : false;
        });
    }
    getModels(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const { context } = this.props;
            const { knex } = context;
            const { limit, offset, orderBy, where, search } = filter;
            const response = yield knex
                .select([
                knex.raw('*'),
                knex.raw('count(*) over() as "totalCount"'),
            ])
                .from('vehiclesModels')
                .limit(limit || 1)
                .offset(offset || 0)
                .where((builder) => knex_1.convertWhereToKnex(builder, where, {
                'vehiclesModels': '*',
            }))
                .where((builder) => knex_1.convertSearchToKnex(builder, search, {
                'vehiclesModels': '*',
            }))
                .orderBy(knex_1.convertOrderByToKnex(orderBy))
                .then((nodes) => nodes.map((node) => (Object.assign(Object.assign({}, node), { brand: {
                    id: node.brand,
                } }))))
                .then((nodes) => (Object.assign(Object.assign({}, knex_1.extractTotalCountPropOfNode(nodes)), { offset,
                limit,
                orderBy,
                where })));
            return response;
        });
    }
    getModelsByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nodes } = yield this.getModels({
                where: [['id', 'in', ids]],
                offset: 0,
                limit: ids.length,
            });
            return nodes;
        });
    }
    getModel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const nodes = yield this.getModelsByIds([id]);
            return nodes.length ? nodes[0] : false;
        });
    }
}
exports.default = VehiclesService;


/***/ }),

/***/ 256:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeDefs = exports.resolvers = exports.factory = void 0;
const middleware_1 = __importDefault(__webpack_require__(465));
exports.factory = middleware_1.default;
const resolvers_1 = __importDefault(__webpack_require__(805));
exports.resolvers = resolvers_1.default;
const schema_graphql_1 = __importDefault(__webpack_require__(922));
exports.typeDefs = schema_graphql_1.default;


/***/ }),

/***/ 465:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(147);
const dataloader_1 = __importDefault(__webpack_require__(712));
const VehiclesService_1 = __importDefault(__webpack_require__(131));
const vehiclesFactory = () => {
    const middleware = ({ context }) => {
        // Vehicle Service
        context.services.vehicles = new VehiclesService_1.default({ context });
        context.dataloader.vehicles = {
            // Brands dataloader
            brands: new dataloader_1.default((ids) => context.services.vehicles.getBrandsByIds(ids)
                .then((nodes) => core_1.collateForDataloader(ids, nodes))),
            // Models dataloader
            models: new dataloader_1.default((ids) => context.services.vehicles.getModelsByIds(ids)
                .then((nodes) => core_1.collateForDataloader(ids, nodes))),
        };
        return {
            context,
        };
    };
    return middleware;
};
exports.default = vehiclesFactory;


/***/ }),

/***/ 227:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const query = {
    vehicles: () => ({}),
};
exports.default = query;


/***/ }),

/***/ 181:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(147);
const userResolver = new Proxy({
    id: () => ({}),
    name: () => ({}),
    models: () => ({}),
}, {
    get: (target, prop) => {
        const resolver = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = parent;
            const { dataloader } = context;
            try {
                const brand = yield dataloader.vehicles.brands.load(id);
                return brand[prop];
            }
            catch (err) {
                throw new core_1.ServerError(`Failed to load vehicle brand with id «${id}»`, { err });
            }
        });
        return resolver;
    },
});
exports.default = userResolver;


/***/ }),

/***/ 829:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(147);
const userResolver = new Proxy({
    id: () => ({}),
    name: () => ({}),
    brand: () => ({}),
}, {
    get: (target, prop) => {
        const resolver = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = parent;
            const { dataloader } = context;
            try {
                const model = yield dataloader.vehicles.models.load(id);
                return model[prop];
            }
            catch (err) {
                throw new core_1.ServerError(`Failed to load vehicle model with id «${id}»`, { err });
            }
        });
        return resolver;
    },
});
exports.default = userResolver;


/***/ }),

/***/ 654:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(147);
const vehiclesQuery = {
    brands: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { services } = context;
        const filter = core_1.buildQueryFilter(args);
        try {
            const brandsConnection = yield services.vehicles.getBrands(filter);
            const connection = core_1.buildCursorConnection(brandsConnection, 'vehicle-brands');
            return connection;
        }
        catch (err) {
            throw new core_1.ServerError('Failed to get vehicles brands list', { err });
        }
    }),
    models: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { services } = context;
        const filter = core_1.buildQueryFilter(args);
        try {
            const brandsConnection = yield services.vehicles.getModels(filter);
            const connection = core_1.buildCursorConnection(brandsConnection, 'vehicle-models');
            return connection;
        }
        catch (err) {
            throw new core_1.ServerError('Failed to get vehicles brands list', { err });
        }
    }),
    brand: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { dataloader } = context;
        const { id } = args;
        const brand = yield dataloader.vehicles.brands.load(id);
        return brand;
    }),
    model: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { dataloader } = context;
        const { id } = args;
        const model = yield dataloader.vehicles.models.load(id);
        return model;
    }),
};
exports.default = vehiclesQuery;


/***/ }),

/***/ 805:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Query_1 = __importDefault(__webpack_require__(227));
const VehiclesQuery_1 = __importDefault(__webpack_require__(654));
const VehicleBrand_1 = __importDefault(__webpack_require__(181));
const VehicleModel_1 = __importDefault(__webpack_require__(829));
const resolvers = {
    Query: Query_1.default,
    VehiclesQuery: VehiclesQuery_1.default,
    VehicleBrand: VehicleBrand_1.default,
    VehicleModel: VehicleModel_1.default,
};
exports.default = resolvers;


/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("@via-profit-services/core");;

/***/ }),

/***/ 160:
/***/ ((module) => {

module.exports = require("@via-profit-services/knex");;

/***/ }),

/***/ 712:
/***/ ((module) => {

module.exports = require("dataloader");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(256);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;