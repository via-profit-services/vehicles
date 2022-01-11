/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 811:
/***/ (function(__unused_webpack_module, exports) {


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
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.raw(`

    drop table if exists "vehiclesModels" cascade;
    drop table if exists "vehiclesBrands" cascade;

    CREATE TABLE "vehiclesBrands" (
      "id" uuid NOT NULL,
      "name" varchar(255) NOT NULL,
      CONSTRAINT "vehiclesBrands_pk" PRIMARY KEY (id)
    );

    CREATE TABLE "vehiclesModels" (
      "id" uuid NOT NULL,
      "brand" uuid NOT NULL,
      "name" varchar(255) NOT NULL,
      CONSTRAINT "vehiclesModels_pk" PRIMARY KEY (id)
    );

    CREATE EXTENSION pg_trgm;

    ALTER TABLE "vehiclesModels" ADD CONSTRAINT "vehiclesModels_fk_vehiclesBrands" FOREIGN KEY ("brand") REFERENCES "vehiclesBrands"(id) ON DELETE CASCADE on update cascade;

  `);
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.raw(`
    DROP EXTENSION pg_trgm;
    drop table if exists "vehiclesModels" cascade;
    drop table if exists "vehiclesBrands" cascade;
  `);
    });
}
exports.down = down;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[811](0, __webpack_exports__);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;