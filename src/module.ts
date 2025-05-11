import { pullPlayersToScene } from "./applications/pull-to-scene";

type ContextMenuEntries =
    foundry.applications.ux.ContextMenu.Entry<HTMLElement>[];

function getContextOption(): foundry.applications.ux.ContextMenu.Entry<HTMLElement> {
    return {
        name: "pull-players-to-scene.context-menu",
        icon: '<i class="fas fa-directions"></i>',
        condition: (_) => game?.user?.isGM ?? false,
        callback: (item) => {
            const id = item.dataset["entryId"] ?? item.dataset["sceneId"];

            if (!id) {
                return;
            }

            const scene = game?.scenes?.get(id);
            const users = game?.users;

            if (!scene || scene.invalid) {
                return;
            }

            if (!users) {
                return;
            }

            pullPlayersToScene(
                scene.id,
                scene.name,
                scene.thumb?.toString() ?? null,
                users.players,
            );
        },
    };
}

Hooks.on(
    "getSceneContextOptions",
    (_: unknown, contextOptions: ContextMenuEntries) => {
        contextOptions.push(getContextOption());
    },
);
