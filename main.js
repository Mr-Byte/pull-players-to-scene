import { PullToSceneApplication } from "./apps/pull-to-scene.js";

const getContextOption = (idField) => {
    return {
        name: "pull-players-to-scene.context-menu",
        icon: '<i class="fas fa-directions"></i>',
        condition: _ => game.user.isGM,
        callback: item => {
            const scene = game.scenes.get(item.data(idField));
            PullToSceneApplication.show(game.users, scene);
        }
    };
}

Hooks.on("getSceneNavigationContext", (_, contextOptions) => {
    contextOptions.push(getContextOption('sceneId'));
});

Hooks.on("getSceneDirectoryEntryContext", (_, contextOptions) => {
    contextOptions.push(getContextOption('documentId'));
});