"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const config_1 = __importDefault(require("./src/config/config"));
const PORT = config_1.default.server.port;
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API is available at http://localhost:${PORT}/api`);
});
//# sourceMappingURL=server.js.map