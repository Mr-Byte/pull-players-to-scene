export async function pullPlayersToScene(
    sceneId: string,
    sceneName: string,
    thumb: string | null,
    users: User[],
): Promise<void> {
    const content = await renderTemplate(
        "modules/pull-players-to-scene/templates/pull-to-scene.hbs",
        {
            users: users.filter((user) => !user.isSelf && user.active),
            thumb,
            sceneName,
        },
    );

    let selectedUsers: string[];

    try {
        const result = await foundry.applications.api.DialogV2.prompt({
            window: {
                title: game?.i18n?.localize(
                    "pull-players-to-scene.pull-players-title",
                ),
            },
            content,
            ok: {
                label: game?.i18n?.localize("pull-players-to-scene.button"),
                callback: (_event, button, _dialog) => {
                    let results = button.form?.querySelectorAll(
                        'input[type="checkbox"][name="player"]:checked',
                    );

                    if (!results) {
                        return [];
                    }

                    return Array.from(results).map((element) => element.id);
                },
            },
        });

        selectedUsers = result ?? [];
    } catch {
        return;
    }

    for (const userId of selectedUsers) {
        console.debug(
            `Pull Players to Scene | Pulling ${userId} to ${sceneId}`,
        );
        game?.socket?.emit("pullToScene", sceneId, userId);
    }
}
