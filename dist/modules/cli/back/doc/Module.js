"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.module = {
    name: "module",
    shortDescription: "All modules related actions",
    commands: {
        build: {
            name: "build",
            shortDescription: "Build a module",
            parameters: {
                moduleName: {
                    name: "moduleName",
                    required: true
                }
            }
        },
        get: {
            name: "get",
            shortDescription: "retreive one or more module from a repository or cache",
            description: "Retreive one or more modules from a repository.",
            usages: [
                `nc module get list=com.nucleus-websocket,com.nucleus-upload`,
                `nc module get catalog=react`
            ],
            parameters: {
                list: {
                    name: "list",
                    description: "List of all module to retreive, coma separated, without any space",
                    type: "String",
                    required: false,
                    exemples: [
                        `nc module get list=com.nucleus-websocket,com.nucleus-upload`,
                        `nc module get list=com.nucleus-websocket`
                    ]
                },
                catalog: {
                    name: "catalog",
                    description: "Get all packages previously saved in a local catalog list",
                    type: "String",
                    required: false,
                    exemples: [
                        `nc module get catalog=create-react-app`,
                    ]
                }
            }
        }
    }
};
exports._package = {
    name: "package",
    shortDescription: "All package actions available",
    description: "The package <package> handle all installed packages, new installation, update and delete",
    commands: {
        list: {
            name: "list",
            description: "List all packages installed / and locally available",
            shortDescription: "List all packages available",
            usages: [
                "nc package list"
            ],
            exemples: [
                "nc package list"
            ]
        }
    }
};
exports.AppDoc = {
    name: "Nucleus",
    appName: "nc",
    version: "1.0.0",
    shortDescription: "Plugin based architecture for frontend and backend",
};
//# sourceMappingURL=Module.js.map